const Budget = require('../models/Budget');
const IncomeHistory = require('../models/IncomeHistory');
const MonthlyReport = require('../models/MonthlyReport');
const { getMonthDateRange } = require('../utils/helpers');

/**
 * Get or create current month's budget for a user
 */
const getCurrentOrCreateBudget = async (userId) => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  let budget = await Budget.findOne({ userId, month, year });

  if (!budget) {
    budget = await Budget.create({
      userId,
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

  return budget;
};

/**
 * Update budget spending in real-time when transactions occur
 */
const updateBudgetSpending = async (userId, amount) => {
  try {
    const budget = await getCurrentOrCreateBudget(userId);
    
    // Add to actual spent
    budget.actualSpent = (budget.actualSpent || 0) + amount;
    
    // Check and trigger alerts
    if (budget.spendingLimit > 0) {
      const spentPercentage = (budget.actualSpent / budget.spendingLimit) * 100;
      
      budget.alerts.forEach(alert => {
        if (spentPercentage >= alert.threshold && !alert.triggered) {
          alert.triggered = true;
          alert.triggeredAt = new Date();
          console.log(`⚠️ Budget alert triggered: ${alert.threshold}% spending threshold reached`);
        }
      });
    }
    
    await budget.save();
    return budget;
  } catch (error) {
    console.error('Error updating budget spending:', error);
    throw error;
  }
};

/**
 * Update budget savings in real-time when add transactions occur
 */
const updateBudgetSavings = async (userId, amount) => {
  try {
    const budget = await getCurrentOrCreateBudget(userId);
    
    // Add to actual saved
    budget.actualSaved = (budget.actualSaved || 0) + amount;
    
    await budget.save();
    return budget;
  } catch (error) {
    console.error('Error updating budget savings:', error);
    throw error;
  }
};

/**
 * Recalculate budget totals from transactions (for accuracy)
 */
const recalculateBudget = async (userId) => {
  try {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const { startDate, endDate } = getMonthDateRange(month, year);

    const budget = await getCurrentOrCreateBudget(userId);

    // Calculate actual income
    const incomeRecords = await IncomeHistory.find({
      userId,
      distributedAt: { $gte: startDate, $lte: endDate }
    });

    let actualIncome = 0;
    incomeRecords.forEach(record => {
      actualIncome += record.amount;
    });

    // Calculate actual spending and savings from transactions
    const Transaction = require('../models/Transaction');
    const transactions = await Transaction.find({
      userId,
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
    
    // Re-check alerts
    if (budget.spendingLimit > 0) {
      const spentPercentage = (actualSpent / budget.spendingLimit) * 100;
      
      budget.alerts.forEach(alert => {
        if (spentPercentage >= alert.threshold && !alert.triggered) {
          alert.triggered = true;
          alert.triggeredAt = new Date();
        }
      });
    }
    
    await budget.save();

    return {
      budget,
      actualIncome,
      actualSpending: actualSpent,
      actualSavings: actualSaved
    };
  } catch (error) {
    console.error('Error recalculating budget:', error);
    throw error;
  }
};

/**
 * Reset monthly budget (called on 1st of each month)
 */
const resetMonthlyBudget = async () => {
  try {
    const Budget = require('../models/Budget');
    const IncomeHistory = require('../models/IncomeHistory');
    const Transaction = require('../models/Transaction');
    
    const now = new Date();
    const lastMonth = now.getMonth() === 0 ? 12 : now.getMonth();
    const lastYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

    console.log(`[BUDGET] Resetting budgets for ${lastMonth}/${lastYear}...`);

    // Find all budgets from last month
    const lastMonthBudgets = await Budget.find({
      month: lastMonth,
      year: lastYear
    });

    for (const budget of lastMonthBudgets) {
      // Calculate final values
      const { startDate, endDate } = getMonthDateRange(lastMonth, lastYear);
      
      // Get actual income
      const incomeRecords = await IncomeHistory.find({
        userId: budget.userId,
        distributedAt: { $gte: startDate, $lte: endDate }
      });

      let actualIncome = 0;
      incomeRecords.forEach(record => {
        actualIncome += record.amount;
      });

      // Get actual spending and savings
      const transactions = await Transaction.find({
        userId: budget.userId,
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

      // Calculate progress percentages
      const incomeProgress = budget.monthlyIncome > 0 
        ? (actualIncome / budget.monthlyIncome) * 100 
        : 0;
      
      const spendingProgress = budget.spendingLimit > 0 
        ? (actualSpent / budget.spendingLimit) * 100 
        : 0;
      
      const savingsProgress = budget.savingsGoal > 0 
        ? (actualSaved / budget.savingsGoal) * 100 
        : 0;

      // Determine budget status
      let budgetStatus = 'on-track';
      if (spendingProgress > 100) {
        budgetStatus = 'over-budget';
      } else if (spendingProgress >= 90) {
        budgetStatus = 'near-limit';
      } else if (spendingProgress <= 70) {
        budgetStatus = 'under-budget';
      }

      // Create monthly report
      await MonthlyReport.create({
        userId: budget.userId,
        month: lastMonth,
        year: lastYear,
        monthlyIncomeGoal: budget.monthlyIncome,
        spendingLimitGoal: budget.spendingLimit,
        savingsGoal: budget.savingsGoal,
        actualIncome,
        actualSpending: actualSpent,
        actualSavings: actualSaved,
        incomeProgress: Math.round(incomeProgress),
        spendingProgress: Math.round(spendingProgress),
        savingsProgress: Math.round(savingsProgress),
        alertsTriggered: budget.alerts.filter(a => a.triggered),
        budgetStatus
      });

      console.log(`[BUDGET] Created monthly report for user ${budget.userId}`);
    }

    console.log(`[BUDGET] Monthly reset complete. ${lastMonthBudgets.length} reports created.`);
  } catch (error) {
    console.error('[BUDGET] Error during monthly reset:', error);
    throw error;
  }
};

/**
 * Get active alerts for current budget
 */
const getActiveAlerts = async (userId) => {
  try {
    const budget = await getCurrentOrCreateBudget(userId);
    
    const alerts = [];
    
    if (budget.spendingLimit > 0 && budget.actualSpent > 0) {
      const spentPercentage = (budget.actualSpent / budget.spendingLimit) * 100;
      const remaining = budget.spendingLimit - budget.actualSpent;
      
      if (spentPercentage >= 100) {
        alerts.push({
          type: 'danger',
          level: 'critical',
          message: `You've exceeded your spending limit by ₱${Math.abs(remaining).toFixed(2)}!`,
          percentage: Math.round(spentPercentage)
        });
      } else if (spentPercentage >= 70) {
        alerts.push({
          type: 'warning',
          level: spentPercentage >= 90 ? 'high' : 'medium',
          message: `You've spent ${Math.round(spentPercentage)}% of your monthly budget. ₱${remaining.toFixed(2)} remaining.`,
          percentage: Math.round(spentPercentage)
        });
      }
    }
    
    return alerts;
  } catch (error) {
    console.error('Error getting active alerts:', error);
    return [];
  }
};

module.exports = {
  getCurrentOrCreateBudget,
  updateBudgetSpending,
  updateBudgetSavings,
  recalculateBudget,
  resetMonthlyBudget,
  getActiveAlerts
};
