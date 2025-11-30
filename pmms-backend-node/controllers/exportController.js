const Jar = require('../models/Jar');
const Transaction = require('../models/Transaction');
const IncomeHistory = require('../models/IncomeHistory');
const Budget = require('../models/Budget');
const SavingsGoal = require('../models/SavingsGoal');
const RecurringItem = require('../models/RecurringItem');
const { Parser } = require('json2csv');

// @desc    Export all data as CSV
// @route   GET /api/v1/export/csv
// @access  Private
exports.exportCSV = async (req, res, next) => {
  try {
    const { type = 'transactions' } = req.query;

    let data;
    let fields;

    switch (type) {
      case 'transactions':
        data = await Transaction.find({ userId: req.user.id })
          .populate('jarId', 'name')
          .lean();
        fields = ['date', 'type', 'amount', 'jarId.name', 'reason', 'category'];
        break;
      
      case 'jars':
        data = await Jar.find({ userId: req.user.id }).lean();
        fields = ['name', 'amount', 'percentage', 'isDefault', 'isCustom'];
        break;
      
      case 'income':
        data = await IncomeHistory.find({ userId: req.user.id }).lean();
        fields = ['amount', 'source', 'distributedAt'];
        break;
      
      default:
        data = await Transaction.find({ userId: req.user.id })
          .populate('jarId', 'name')
          .lean();
        fields = ['date', 'type', 'amount', 'jarId.name', 'reason'];
    }

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment(`pmms-${type}-${Date.now()}.csv`);
    res.send(csv);
  } catch (error) {
    next(error);
  }
};

// @desc    Export all data as JSON
// @route   GET /api/v1/export/json
// @access  Private
exports.exportJSON = async (req, res, next) => {
  try {
    const jars = await Jar.find({ userId: req.user.id }).lean();
    const transactions = await Transaction.find({ userId: req.user.id }).lean();
    const income = await IncomeHistory.find({ userId: req.user.id }).lean();
    const budgets = await Budget.find({ userId: req.user.id }).lean();
    const goals = await SavingsGoal.find({ userId: req.user.id }).lean();
    const recurring = await RecurringItem.find({ userId: req.user.id }).lean();

    const exportData = {
      exportDate: new Date().toISOString(),
      userId: req.user.id,
      userName: req.user.name,
      data: {
        jars,
        transactions,
        income,
        budgets,
        goals,
        recurring
      }
    };

    res.header('Content-Type', 'application/json');
    res.attachment(`pmms-backup-${Date.now()}.json`);
    res.json(exportData);
  } catch (error) {
    next(error);
  }
};

// @desc    Import backup data
// @route   POST /api/v1/export/import
// @access  Private
exports.importData = async (req, res, next) => {
  try {
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({
        status: 'error',
        message: 'No data provided for import'
      });
    }

    let imported = {
      jars: 0,
      transactions: 0,
      income: 0,
      budgets: 0,
      goals: 0,
      recurring: 0
    };

    // Import jars
    if (data.jars && data.jars.length > 0) {
      const jarsToImport = data.jars.map(jar => ({
        ...jar,
        userId: req.user.id,
        _id: undefined
      }));
      await Jar.insertMany(jarsToImport);
      imported.jars = jarsToImport.length;
    }

    // Note: In production, you'd want more sophisticated import logic
    // including conflict resolution, validation, etc.

    res.status(200).json({
      status: 'success',
      message: 'Data imported successfully',
      data: { imported }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset all user data
// @route   POST /api/v1/export/reset
// @access  Private
exports.resetData = async (req, res, next) => {
  try {
    const { confirm } = req.body;

    if (confirm !== 'RESET_ALL_DATA') {
      return res.status(400).json({
        status: 'error',
        message: 'Please confirm data reset'
      });
    }

    // Delete all user data
    await Promise.all([
      Jar.deleteMany({ userId: req.user.id, isDefault: false }),
      Transaction.deleteMany({ userId: req.user.id }),
      IncomeHistory.deleteMany({ userId: req.user.id }),
      Budget.deleteMany({ userId: req.user.id }),
      SavingsGoal.deleteMany({ userId: req.user.id }),
      RecurringItem.deleteMany({ userId: req.user.id })
    ]);

    // Reset default jars to zero
    await Jar.updateMany(
      { userId: req.user.id, isDefault: true },
      { amount: 0 }
    );

    res.status(200).json({
      status: 'success',
      message: 'All data reset successfully'
    });
  } catch (error) {
    next(error);
  }
};
