const Jar = require('../models/Jar');
const Transaction = require('../models/Transaction');
const IncomeHistory = require('../models/IncomeHistory');
const Budget = require('../models/Budget');
const MonthlyReport = require('../models/MonthlyReport');
const SavingsGoal = require('../models/SavingsGoal');
const RecurringItem = require('../models/RecurringItem');
const { Parser } = require('json2csv');
const { DEFAULT_JARS } = require('../utils/constants');

// @desc    Export all data as CSV (comprehensive)
// @route   GET /api/v1/export/csv
// @access  Private
exports.exportCSV = async (req, res, next) => {
  try {
    const { type = 'all' } = req.query;

    if (type === 'all') {
      // Export all data in multiple CSV sections
      const jars = await Jar.find({ userId: req.user.id }).lean();
      const transactions = await Transaction.find({ userId: req.user.id })
        .populate('jarId', 'name')
        .lean();
      const income = await IncomeHistory.find({ userId: req.user.id }).lean();
      const budgets = await Budget.find({ userId: req.user.id }).lean();
      const goals = await SavingsGoal.find({ userId: req.user.id }).lean();
      const recurring = await RecurringItem.find({ userId: req.user.id }).lean();

      // Create comprehensive CSV with sections
      let csv = '# PMMS Data Export\n';
      csv += `# Export Date: ${new Date().toISOString()}\n`;
      csv += `# User ID: ${req.user.id}\n\n`;

      // Jars section
      csv += '### JARS ###\n';
      const jarsParser = new Parser({
        fields: ['name', 'amount', 'percentage', 'color', 'icon', 'isDefault', 'isCustom', 'order']
      });
      csv += jarsParser.parse(jars) + '\n\n';

      // Transactions section
      csv += '### TRANSACTIONS ###\n';
      const transParser = new Parser({
        fields: ['date', 'type', 'amount', 'jarId.name', 'reason', 'category', 'previousAmount', 'newAmount']
      });
      csv += transParser.parse(transactions) + '\n\n';

      // Income section
      csv += '### INCOME HISTORY ###\n';
      const incomeParser = new Parser({
        fields: ['amount', 'source', 'distributedAt']
      });
      csv += incomeParser.parse(income) + '\n\n';

      // Budgets section
      csv += '### BUDGETS ###\n';
      const budgetParser = new Parser({
        fields: ['month', 'year', 'monthlyIncome', 'spendingLimit', 'savingsGoal', 'actualSpent', 'actualSaved']
      });
      csv += budgetParser.parse(budgets) + '\n\n';

      // Goals section
      csv += '### SAVINGS GOALS ###\n';
      const goalsParser = new Parser({
        fields: ['name', 'targetAmount', 'currentAmount', 'targetDate', 'completed']
      });
      csv += goalsParser.parse(goals) + '\n\n';

      // Recurring section
      csv += '### RECURRING ITEMS ###\n';
      const recurringParser = new Parser({
        fields: ['name', 'amount', 'type', 'frequency', 'startDate', 'nextExecutionDate', 'isActive']
      });
      csv += recurringParser.parse(recurring) + '\n';

      res.header('Content-Type', 'text/csv');
      res.attachment(`pmms-full-backup-${Date.now()}.csv`);
      res.send(csv);
    } else {
      // Export specific type
      let data, fields, filename;

      switch (type) {
        case 'transactions':
          data = await Transaction.find({ userId: req.user.id })
            .populate('jarId', 'name')
            .lean();
          fields = ['date', 'type', 'amount', 'jarId.name', 'reason', 'category'];
          filename = 'transactions';
          break;
        
        case 'jars':
          data = await Jar.find({ userId: req.user.id }).lean();
          fields = ['name', 'amount', 'percentage', 'color', 'isDefault', 'isCustom'];
          filename = 'jars';
          break;
        
        case 'income':
          data = await IncomeHistory.find({ userId: req.user.id }).lean();
          fields = ['amount', 'source', 'distributedAt'];
          filename = 'income';
          break;
        
        default:
          return res.status(400).json({
            status: 'error',
            message: 'Invalid export type'
          });
      }

      const parser = new Parser({ fields });
      const csv = parser.parse(data);

      res.header('Content-Type', 'text/csv');
      res.attachment(`pmms-${filename}-${Date.now()}.csv`);
      res.send(csv);
    }
  } catch (error) {
    console.error('CSV Export Error:', error);
    next(error);
  }
};

// @desc    Export all data as JSON (complete backup)
// @route   GET /api/v1/export/json
// @access  Private
exports.exportJSON = async (req, res, next) => {
  try {
    const jars = await Jar.find({ userId: req.user.id }).lean();
    const transactions = await Transaction.find({ userId: req.user.id }).lean();
    const income = await IncomeHistory.find({ userId: req.user.id }).lean();
    const budgets = await Budget.find({ userId: req.user.id }).lean();
    const monthlyReports = await MonthlyReport.find({ userId: req.user.id }).lean();
    const goals = await SavingsGoal.find({ userId: req.user.id }).lean();
    const recurring = await RecurringItem.find({ userId: req.user.id }).lean();

    // Check if user has any data
    const totalRecords = jars.length + transactions.length + income.length + 
                         budgets.length + goals.length + recurring.length;

    if (totalRecords === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'No data available to export. Start using the app to generate data.'
      });
    }

    const exportData = {
      version: '2.0',
      exportDate: new Date().toISOString(),
      userId: req.user.id,
      userName: req.user.name || 'PMMS User',
      recordCounts: {
        jars: jars.length,
        transactions: transactions.length,
        income: income.length,
        budgets: budgets.length,
        monthlyReports: monthlyReports.length,
        goals: goals.length,
        recurring: recurring.length
      },
      data: {
        jars,
        transactions,
        income,
        budgets,
        monthlyReports,
        goals,
        recurring
      }
    };

    res.header('Content-Type', 'application/json');
    res.attachment(`pmms-backup-${Date.now()}.json`);
    res.json(exportData);
  } catch (error) {
    console.error('JSON Export Error:', error);
    next(error);
  }
};

// @desc    Import backup data (JSON only - comprehensive restore)
// @route   POST /api/v1/export/import
// @access  Private
exports.importData = async (req, res, next) => {
  try {
    const { data: importData, replaceExisting = false } = req.body;

    // Validation
    if (!importData) {
      return res.status(400).json({
        status: 'error',
        message: 'No data provided for import'
      });
    }

    if (!importData.data) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid backup file structure. Missing data object.'
      });
    }

    // Validate backup version
    if (!importData.version || !importData.exportDate) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid or corrupted backup file. Missing version information.'
      });
    }

    const { data } = importData;
    let imported = {
      jars: 0,
      transactions: 0,
      income: 0,
      budgets: 0,
      monthlyReports: 0,
      goals: 0,
      recurring: 0
    };

    // If replace existing, clear old data first
    if (replaceExisting) {
      await Promise.all([
        Jar.deleteMany({ userId: req.user.id }),
        Transaction.deleteMany({ userId: req.user.id }),
        IncomeHistory.deleteMany({ userId: req.user.id }),
        Budget.deleteMany({ userId: req.user.id }),
        MonthlyReport.deleteMany({ userId: req.user.id }),
        SavingsGoal.deleteMany({ userId: req.user.id }),
        RecurringItem.deleteMany({ userId: req.user.id })
      ]);
    }

    // Import jars
    if (data.jars && Array.isArray(data.jars) && data.jars.length > 0) {
      const jarsToImport = data.jars.map(jar => {
        const { _id, __v, createdAt, updatedAt, ...jarData } = jar;
        return {
          ...jarData,
          userId: req.user.id
        };
      });
      await Jar.insertMany(jarsToImport);
      imported.jars = jarsToImport.length;
    }

    // Import transactions
    if (data.transactions && Array.isArray(data.transactions) && data.transactions.length > 0) {
      const transToImport = data.transactions.map(trans => {
        const { _id, __v, ...transData } = trans;
        return {
          ...transData,
          userId: req.user.id,
          date: new Date(transData.date)
        };
      });
      await Transaction.insertMany(transToImport);
      imported.transactions = transToImport.length;
    }

    // Import income history
    if (data.income && Array.isArray(data.income) && data.income.length > 0) {
      const incomeToImport = data.income.map(inc => {
        const { _id, __v, ...incData } = inc;
        return {
          ...incData,
          userId: req.user.id,
          distributedAt: new Date(incData.distributedAt)
        };
      });
      await IncomeHistory.insertMany(incomeToImport);
      imported.income = incomeToImport.length;
    }

    // Import budgets
    if (data.budgets && Array.isArray(data.budgets) && data.budgets.length > 0) {
      const budgetsToImport = data.budgets.map(budget => {
        const { _id, __v, createdAt, updatedAt, ...budgetData } = budget;
        return {
          ...budgetData,
          userId: req.user.id
        };
      });
      await Budget.insertMany(budgetsToImport);
      imported.budgets = budgetsToImport.length;
    }

    // Import monthly reports
    if (data.monthlyReports && Array.isArray(data.monthlyReports) && data.monthlyReports.length > 0) {
      const reportsToImport = data.monthlyReports.map(report => {
        const { _id, __v, createdAt, updatedAt, ...reportData } = report;
        return {
          ...reportData,
          userId: req.user.id
        };
      });
      await MonthlyReport.insertMany(reportsToImport);
      imported.monthlyReports = reportsToImport.length;
    }

    // Import savings goals
    if (data.goals && Array.isArray(data.goals) && data.goals.length > 0) {
      const goalsToImport = data.goals.map(goal => {
        const { _id, __v, createdAt, updatedAt, ...goalData } = goal;
        return {
          ...goalData,
          userId: req.user.id,
          targetDate: goalData.targetDate ? new Date(goalData.targetDate) : undefined
        };
      });
      await SavingsGoal.insertMany(goalsToImport);
      imported.goals = goalsToImport.length;
    }

    // Import recurring items
    if (data.recurring && Array.isArray(data.recurring) && data.recurring.length > 0) {
      const recurringToImport = data.recurring.map(item => {
        const { _id, __v, createdAt, updatedAt, ...itemData } = item;
        return {
          ...itemData,
          userId: req.user.id,
          startDate: new Date(itemData.startDate),
          nextExecutionDate: new Date(itemData.nextExecutionDate)
        };
      });
      await RecurringItem.insertMany(recurringToImport);
      imported.recurring = recurringToImport.length;
    }

    res.status(200).json({
      status: 'success',
      message: replaceExisting ? 'Backup restored successfully' : 'Data imported successfully',
      data: { imported }
    });
  } catch (error) {
    console.error('Import Error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid data format in backup file',
        details: error.message
      });
    }
    
    next(error);
  }
};

// @desc    Reset all user data (complete wipe)
// @route   POST /api/v1/export/reset
// @access  Private
exports.resetData = async (req, res, next) => {
  try {
    const { confirm } = req.body;

    if (confirm !== 'RESET_ALL_DATA') {
      return res.status(400).json({
        status: 'error',
        message: 'Please confirm data reset by sending confirm: "RESET_ALL_DATA"'
      });
    }

    // Count existing data before reset
    const counts = {
      jars: await Jar.countDocuments({ userId: req.user.id }),
      transactions: await Transaction.countDocuments({ userId: req.user.id }),
      income: await IncomeHistory.countDocuments({ userId: req.user.id }),
      budgets: await Budget.countDocuments({ userId: req.user.id }),
      monthlyReports: await MonthlyReport.countDocuments({ userId: req.user.id }),
      goals: await SavingsGoal.countDocuments({ userId: req.user.id }),
      recurring: await RecurringItem.countDocuments({ userId: req.user.id })
    };

    // Delete all user data
    await Promise.all([
      Jar.deleteMany({ userId: req.user.id }),
      Transaction.deleteMany({ userId: req.user.id }),
      IncomeHistory.deleteMany({ userId: req.user.id }),
      Budget.deleteMany({ userId: req.user.id }),
      MonthlyReport.deleteMany({ userId: req.user.id }),
      SavingsGoal.deleteMany({ userId: req.user.id }),
      RecurringItem.deleteMany({ userId: req.user.id })
    ]);

    // Recreate default 6 jars with zero balances
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

    await Jar.insertMany(defaultJars);

    res.status(200).json({
      status: 'success',
      message: 'All data reset successfully. Default jars recreated.',
      data: {
        deletedCounts: counts,
        defaultJarsCreated: defaultJars.length
      }
    });
  } catch (error) {
    console.error('Reset Data Error:', error);
    next(error);
  }
};
