const Transaction = require('../models/Transaction');
const Jar = require('../models/Jar');
const { paginate } = require('../utils/helpers');

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Private
exports.getTransactions = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, jarId, type, startDate, endDate } = req.query;
    const { skip, limit: limitNum } = paginate(page, limit);

    // Build query
    const query = { userId: req.user.id };
    if (jarId) query.jarId = jarId;
    if (type) query.type = type;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(query)
      .populate('jarId', 'name color icon')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Transaction.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: transactions.length,
      pagination: {
        page: parseInt(page),
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      },
      data: { transactions }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get transactions for specific jar
// @route   GET /api/v1/transactions/jar/:id
// @access  Private
exports.getJarTransactions = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const { skip, limit: limitNum } = paginate(page, limit);

    const transactions = await Transaction.find({
      userId: req.user.id,
      jarId: req.params.id
    })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Transaction.countDocuments({
      userId: req.user.id,
      jarId: req.params.id
    });

    res.status(200).json({
      status: 'success',
      results: transactions.length,
      pagination: {
        page: parseInt(page),
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      },
      data: { transactions }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single transaction
// @route   GET /api/v1/transactions/:id
// @access  Private
exports.getTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).populate('jarId', 'name color icon');

    if (!transaction) {
      return res.status(404).json({
        status: 'error',
        message: 'Transaction not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { transaction }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Private
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!transaction) {
      return res.status(404).json({
        status: 'error',
        message: 'Transaction not found'
      });
    }

    await transaction.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Transaction deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
