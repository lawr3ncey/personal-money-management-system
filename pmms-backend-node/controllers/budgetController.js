const Budget = require('../models/Budget');
const Transaction = require('../models/Transaction');
const IncomeHistory = require('../models/IncomeHistory');
const MonthlyReport = require('../models/MonthlyReport');
const { getMonthDateRange } = require('../utils/helpers');
const { recalculateBudget, getActiveAlerts } = require('../services/budget.service');

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
        savingsGoal: 0,
        alerts: [
          { threshold: 70, triggered: false },
          { threshold: 100, triggered: false }
        ]
      });
    }

    // Recalculate actual values using budget service
    const result = await recalculateBudget(req.user.id);
    budget = result.budget;

    // Get active alerts
    const activeAlerts = await getActiveAlerts(req.user.id);

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
          { threshold: 70, triggered: false },
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

    // Calculate actual income for this month
    const { startDate, endDate } = getMonthDateRange(budget.month, budget.year);
    const incomeRecords = await IncomeHistory.find({
      userId: req.user.id,
      distributedAt: { $gte: startDate, $lte: endDate }
    });

    let actualIncome = 0;
    incomeRecords.forEach(record => {
      actualIncome += record.amount;
    });

    res.status(200).json({
      status: 'success',
      data: {
        actualIncome,
        actualSpending: budget.actualSpent,
        actualSavings: budget.actualSaved,
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

// @desc    Get budget alerts
// @route   GET /api/v1/budgets/alerts
// @access  Private
exports.getBudgetAlerts = async (req, res, next) => {
  try {
    const alerts = await getActiveAlerts(req.user.id);
    
    res.status(200).json({
      status: 'success',
      data: { alerts }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get monthly reports (history)
// @route   GET /api/v1/budgets/reports
// @access  Private
exports.getMonthlyReports = async (req, res, next) => {
  try {
    const { limit = 12 } = req.query;
    
    const reports = await MonthlyReport.find({ userId: req.user.id })
      .sort({ year: -1, month: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      status: 'success',
      results: reports.length,
      data: { reports }
    });
  } catch (error) {
    next(error);
  }
};
