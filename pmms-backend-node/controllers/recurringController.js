const RecurringItem = require('../models/RecurringItem');
const Jar = require('../models/Jar');
const Transaction = require('../models/Transaction');
const { addDays, addWeeks, addMonths, addYears } = require('date-fns');

// Helper to calculate next execution date
const calculateNextDate = (frequency, dayOfExecution) => {
  const now = new Date();
  
  switch (frequency) {
    case 'daily':
      return addDays(now, 1);
    case 'weekly':
      return addWeeks(now, 1);
    case 'monthly':
      const nextMonth = addMonths(now, 1);
      return new Date(nextMonth.getFullYear(), nextMonth.getMonth(), dayOfExecution || 1);
    case 'yearly':
      return addYears(now, 1);
    default:
      return addMonths(now, 1);
  }
};

// @desc    Get all recurring items
// @route   GET /api/v1/recurring
// @access  Private
exports.getRecurringItems = async (req, res, next) => {
  try {
    const items = await RecurringItem.find({ userId: req.user.id })
      .populate('jarId', 'name color')
      .sort({ nextExecutionDate: 1 });

    res.status(200).json({
      status: 'success',
      results: items.length,
      data: { items }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create recurring item
// @route   POST /api/v1/recurring
// @access  Private
exports.createRecurringItem = async (req, res, next) => {
  try {
    const { jarId, type, name, amount, frequency, dayOfExecution } = req.body;

    // Verify jar exists
    const jar = await Jar.findOne({ _id: jarId, userId: req.user.id });
    if (!jar) {
      return res.status(404).json({
        status: 'error',
        message: 'Jar not found'
      });
    }

    const nextExecutionDate = calculateNextDate(frequency, dayOfExecution);

    const item = await RecurringItem.create({
      userId: req.user.id,
      jarId,
      type,
      name,
      amount,
      frequency,
      dayOfExecution,
      nextExecutionDate
    });

    res.status(201).json({
      status: 'success',
      data: { item }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update recurring item
// @route   PUT /api/v1/recurring/:id
// @access  Private
exports.updateRecurringItem = async (req, res, next) => {
  try {
    let item = await RecurringItem.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!item) {
      return res.status(404).json({
        status: 'error',
        message: 'Recurring item not found'
      });
    }

    const { name, amount, frequency, dayOfExecution, isActive } = req.body;

    // Recalculate next execution date if frequency changed
    if (frequency && frequency !== item.frequency) {
      item.nextExecutionDate = calculateNextDate(frequency, dayOfExecution);
    }

    item = await RecurringItem.findByIdAndUpdate(
      req.params.id,
      { name, amount, frequency, dayOfExecution, isActive },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: { item }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete recurring item
// @route   DELETE /api/v1/recurring/:id
// @access  Private
exports.deleteRecurringItem = async (req, res, next) => {
  try {
    const item = await RecurringItem.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!item) {
      return res.status(404).json({
        status: 'error',
        message: 'Recurring item not found'
      });
    }

    await item.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Recurring item deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle recurring item
// @route   POST /api/v1/recurring/:id/toggle
// @access  Private
exports.toggleRecurringItem = async (req, res, next) => {
  try {
    const item = await RecurringItem.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!item) {
      return res.status(404).json({
        status: 'error',
        message: 'Recurring item not found'
      });
    }

    item.isActive = !item.isActive;
    await item.save();

    res.status(200).json({
      status: 'success',
      data: { item }
    });
  } catch (error) {
    next(error);
  }
};
