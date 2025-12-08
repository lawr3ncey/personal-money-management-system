const Jar = require('../models/Jar');
const Transaction = require('../models/Transaction');
const IncomeHistory = require('../models/IncomeHistory');
const { calculatePercentage } = require('../utils/helpers');
const { DEFAULT_JARS } = require('../utils/constants');
const { recalculateBudget } = require('../services/budget.service');

// @desc    Distribute income across jars
// @route   POST /api/v1/income/distribute
// @access  Private
exports.distributeIncome = async (req, res, next) => {
  try {
    const { income, source = 'Income' } = req.body;

    // Get all jars for user
    let jars = await Jar.find({ userId: req.user.id }).sort('order');

    // Auto-create default jars if none exist (6 Jars Method)
    if (jars.length === 0) {
      console.log('No jars found. Creating default 6 jars for new user...');
      
      const defaultJars = DEFAULT_JARS.map(jar => ({
        userId: req.user.id,
        name: jar.name,
        percentage: jar.percentage,
        amount: 0,
        color: jar.color,
        icon: jar.icon,
        order: jar.order,
        isDefault: jar.isDefault
      }));

      jars = await Jar.insertMany(defaultJars);
      console.log(`✅ Created ${jars.length} default jars for user ${req.user.id}`);
    }

    // Calculate distribution
    const distribution = [];
    const transactions = [];

    for (const jar of jars) {
      const allocated = calculatePercentage(income, jar.percentage);
      const previousAmount = jar.amount;
      const newAmount = previousAmount + allocated;

      // Update jar
      jar.amount = newAmount;
      await jar.save();

      // Add to distribution array
      distribution.push({
        jarId: jar._id,
        jarName: jar.name,
        allocated
      });

      // Create transaction
      transactions.push({
        userId: req.user.id,
        jarId: jar._id,
        type: 'distribute',
        amount: allocated,
        previousAmount,
        newAmount,
        reason: `Income distribution: ${source}`
      });
    }

    // Bulk insert transactions
    await Transaction.insertMany(transactions);

    // Save income history
    await IncomeHistory.create({
      userId: req.user.id,
      amount: income,
      source,
      distribution
    });

    // Recalculate budget to include new income
    try {
      await recalculateBudget(req.user.id);
    } catch (budgetError) {
      console.error('Budget recalculation error:', budgetError);
      // Don't fail income distribution if budget update fails
    }

    res.status(200).json({
      status: 'success',
      data: {
        income,
        distribution,
        notification: {
          message: `₱${income.toFixed(2)} distributed successfully!`,
          type: 'success'
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get income history
// @route   GET /api/v1/income
// @access  Private
exports.getIncomeHistory = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const incomeHistory = await IncomeHistory.find({ userId: req.user.id })
      .sort({ distributedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await IncomeHistory.countDocuments({ userId: req.user.id });

    res.status(200).json({
      status: 'success',
      results: incomeHistory.length,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      data: { incomeHistory }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get income stats
// @route   GET /api/v1/income/stats
// @access  Private
exports.getIncomeStats = async (req, res, next) => {
  try {
    const stats = await IncomeHistory.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: '$amount' },
          count: { $sum: 1 },
          avgIncome: { $avg: '$amount' }
        }
      }
    ]);

    const result = stats.length > 0 ? stats[0] : {
      totalIncome: 0,
      count: 0,
      avgIncome: 0
    };

    res.status(200).json({
      status: 'success',
      data: { stats: result }
    });
  } catch (error) {
    next(error);
  }
};
