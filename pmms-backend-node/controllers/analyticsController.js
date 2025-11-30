const Jar = require('../models/Jar');
const Transaction = require('../models/Transaction');
const IncomeHistory = require('../models/IncomeHistory');
const Budget = require('../models/Budget');
const { startOfMonth, endOfMonth, subMonths, format } = require('date-fns');

// @desc    Get dashboard overview
// @route   GET /api/v1/analytics/overview
// @access  Private
exports.getOverview = async (req, res, next) => {
  try {
    // Get total balance from all jars
    const jars = await Jar.find({ userId: req.user.id });
    const totalBalance = jars.reduce((sum, jar) => sum + jar.amount, 0);

    // Get this month's income
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const monthlyIncome = await IncomeHistory.aggregate([
      {
        $match: {
          userId: req.user._id,
          distributedAt: { $gte: monthStart, $lte: monthEnd }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    // Get this month's expenses
    const monthlyExpenses = await Transaction.aggregate([
      {
        $match: {
          userId: req.user._id,
          type: 'subtract',
          date: { $gte: monthStart, $lte: monthEnd }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    // Get current budget
    const currentBudget = await Budget.findOne({
      userId: req.user.id,
      month: now.getMonth() + 1,
      year: now.getFullYear()
    });

    res.status(200).json({
      status: 'success',
      data: {
        totalBalance,
        monthlyIncome: monthlyIncome[0]?.total || 0,
        monthlyExpenses: monthlyExpenses[0]?.total || 0,
        jarCount: jars.length,
        currentBudget: currentBudget || null
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get jar balance trend
// @route   GET /api/v1/analytics/jars/trend
// @access  Private
exports.getJarTrend = async (req, res, next) => {
  try {
    const { jarId, months = 6 } = req.query;

    const startDate = subMonths(new Date(), parseInt(months));

    const query = {
      userId: req.user.id,
      date: { $gte: startDate }
    };

    if (jarId) {
      query.jarId = jarId;
    }

    const transactions = await Transaction.find(query)
      .sort({ date: 1 })
      .populate('jarId', 'name');

    // Group by month
    const trendData = {};

    transactions.forEach(t => {
      const monthKey = format(t.date, 'MMM yyyy');
      
      if (!trendData[monthKey]) {
        trendData[monthKey] = {
          month: monthKey,
          balance: 0,
          transactions: 0
        };
      }

      trendData[monthKey].balance = t.newAmount || 0;
      trendData[monthKey].transactions++;
    });

    const trend = Object.values(trendData);

    res.status(200).json({
      status: 'success',
      data: { trend }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get spending breakdown
// @route   GET /api/v1/analytics/spending
// @access  Private
exports.getSpendingBreakdown = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    const now = new Date();
    const targetMonth = month ? parseInt(month) : now.getMonth() + 1;
    const targetYear = year ? parseInt(year) : now.getFullYear();

    const monthStart = new Date(targetYear, targetMonth - 1, 1);
    const monthEnd = new Date(targetYear, targetMonth, 0, 23, 59, 59);

    const breakdown = await Transaction.aggregate([
      {
        $match: {
          userId: req.user._id,
          type: 'subtract',
          date: { $gte: monthStart, $lte: monthEnd }
        }
      },
      {
        $lookup: {
          from: 'jars',
          localField: 'jarId',
          foreignField: '_id',
          as: 'jar'
        }
      },
      {
        $unwind: '$jar'
      },
      {
        $group: {
          _id: '$jar.name',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
          color: { $first: '$jar.color' }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: { breakdown }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get category totals
// @route   GET /api/v1/analytics/categories
// @access  Private
exports.getCategoryTotals = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const query = {
      userId: req.user.id,
      category: { $exists: true, $ne: null, $ne: '' }
    };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const categories = await Transaction.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);

    res.status(200).json({
      status: 'success',
      results: categories.length,
      data: { categories }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get month-over-month comparison
// @route   GET /api/v1/analytics/comparison
// @access  Private
exports.getComparison = async (req, res, next) => {
  try {
    const now = new Date();
    const thisMonthStart = startOfMonth(now);
    const thisMonthEnd = endOfMonth(now);
    const lastMonthStart = startOfMonth(subMonths(now, 1));
    const lastMonthEnd = endOfMonth(subMonths(now, 1));

    // This month
    const thisMonthExpenses = await Transaction.aggregate([
      {
        $match: {
          userId: req.user._id,
          type: 'subtract',
          date: { $gte: thisMonthStart, $lte: thisMonthEnd }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    // Last month
    const lastMonthExpenses = await Transaction.aggregate([
      {
        $match: {
          userId: req.user._id,
          type: 'subtract',
          date: { $gte: lastMonthStart, $lte: lastMonthEnd }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]);

    const thisMonth = thisMonthExpenses[0]?.total || 0;
    const lastMonth = lastMonthExpenses[0]?.total || 0;
    const change = lastMonth > 0 ? ((thisMonth - lastMonth) / lastMonth) * 100 : 0;

    res.status(200).json({
      status: 'success',
      data: {
        thisMonth,
        lastMonth,
        change: Math.round(change * 100) / 100,
        trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
      }
    });
  } catch (error) {
    next(error);
  }
};
