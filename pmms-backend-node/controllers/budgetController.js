const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');
const { getMonthDateRange } = require('../utils/helpers');

// @desc    Get all budgets
// @route   GET /api/v1/budgets
// @access  Private
exports.getBudgets = async (req, res, next) => {
  try {
    const budgets = await Budget.find({ userId: req.user.id })
      .sort({ year: -1, month: -1 });

    res.status(200).json({
      status: 'success',
      results: budgets.length,
      data: { budgets }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current month budget
// @route   GET /api/v1/budgets/current
// @access  Private
exports.getCurrentBudget = async (req, res, next) => {
  try {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    let budget = await Budget.findOne({
      userId: req.user.id,
      month,
      year
    });

    if (!budget) {
      // Create default budget for current month
      budget = await Budget.create({
        userId: req.user.id,
        month,
        year,
        monthlyIncome: 0,
        spendingLimit: 0,
        savingsGoal: 0
      });
    }

    // Calculate actual spent and saved
    const { startDate, endDate } = getMonthDateRange(month, year);
    
    const transactions = await Transaction.find({
      userId: req.user.id,
      date: { $gte: startDate, $lte: endDate },
      type: { $in: ['subtract', 'add'] }
    });

    let actualSpent = 0;
    let actualSaved = 0;

    transactions.forEach(t => {
      if (t.type === 'subtract') {
        actualSpent += t.amount;
      } else if (t.type === 'add') {
        actualSaved += t.amount;
      }
    });

    budget.actualSpent = actualSpent;
    budget.actualSaved = actualSaved;
    await budget.save();

    // Check alerts
    if (budget.spendingLimit > 0) {
      const spentPercentage = (actualSpent / budget.spendingLimit) * 100;
      
      budget.alerts.forEach(alert => {
        if (spentPercentage >= alert.threshold && !alert.triggered) {
          alert.triggered = true;
          alert.triggeredAt = new Date();
        }
      });
      
      await budget.save();
    }

    res.status(200).json({
      status: 'success',
      data: { budget }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update budget
// @route   POST /api/v1/budgets
// @access  Private
exports.createBudget = async (req, res, next) => {
  try {
    const { month, year, monthlyIncome, spendingLimit, savingsGoal, alerts } = req.body;

    let budget = await Budget.findOne({
      userId: req.user.id,
      month,
      year
    });

    if (budget) {
      // Update existing
      budget.monthlyIncome = monthlyIncome;
      budget.spendingLimit = spendingLimit;
      budget.savingsGoal = savingsGoal;
      if (alerts) budget.alerts = alerts;
      await budget.save();
    } else {
      // Create new
      budget = await Budget.create({
        userId: req.user.id,
        month,
        year,
        monthlyIncome,
        spendingLimit,
        savingsGoal,
        alerts: alerts || [
          { threshold: 50, triggered: false },
          { threshold: 80, triggered: false },
          { threshold: 100, triggered: false }
        ]
      });
    }

    res.status(200).json({
      status: 'success',
      data: { budget }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get budget progress
// @route   GET /api/v1/budgets/:id/progress
// @access  Private
exports.getBudgetProgress = async (req, res, next) => {
  try {
    const budget = await Budget.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!budget) {
      return res.status(404).json({
        status: 'error',
        message: 'Budget not found'
      });
    }

    const spentPercentage = budget.spendingLimit > 0 
      ? (budget.actualSpent / budget.spendingLimit) * 100 
      : 0;

    const savedPercentage = budget.savingsGoal > 0 
      ? (budget.actualSaved / budget.savingsGoal) * 100 
      : 0;

    res.status(200).json({
      status: 'success',
      data: {
        budget,
        progress: {
          spentPercentage: Math.round(spentPercentage),
          savedPercentage: Math.round(savedPercentage),
          remainingBudget: Math.max(0, budget.spendingLimit - budget.actualSpent),
          remainingToSave: Math.max(0, budget.savingsGoal - budget.actualSaved)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
