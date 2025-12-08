const Jar = require('../models/Jar');
const Transaction = require('../models/Transaction');
const { updateBudgetSpending, updateBudgetSavings } = require('../services/budget.service');

// @desc    Get all jars for user
// @route   GET /api/v1/jars
// @access  Private
exports.getJars = async (req, res, next) => {
  try {
    const jars = await Jar.find({ userId: req.user.id }).sort('order');

    res.status(200).json({
      status: 'success',
      results: jars.length,
      data: { jars }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single jar
// @route   GET /api/v1/jars/:id
// @access  Private
exports.getJar = async (req, res, next) => {
  try {
    const jar = await Jar.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!jar) {
      return res.status(404).json({
        status: 'error',
        message: 'Jar not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { jar }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create custom jar
// @route   POST /api/v1/jars
// @access  Private
exports.createJar = async (req, res, next) => {
  try {
    const { name, percentage, color, icon } = req.body;

    // Check total percentage doesn't exceed 100
    const existingJars = await Jar.find({ userId: req.user.id });
    const totalPercentage = existingJars.reduce((sum, jar) => sum + jar.percentage, 0);
    
    if (totalPercentage + percentage > 100) {
      return res.status(400).json({
        status: 'error',
        message: 'Total jar percentages cannot exceed 100%'
      });
    }

    const jar = await Jar.create({
      userId: req.user.id,
      name,
      percentage,
      color,
      icon,
      isCustom: true,
      order: existingJars.length + 1
    });

    res.status(201).json({
      status: 'success',
      data: { jar }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update jar
// @route   PUT /api/v1/jars/:id
// @access  Private
exports.updateJar = async (req, res, next) => {
  try {
    const { name, percentage, color, icon } = req.body;

    let jar = await Jar.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!jar) {
      return res.status(404).json({
        status: 'error',
        message: 'Jar not found'
      });
    }

    // If updating percentage, check total doesn't exceed 100
    if (percentage && percentage !== jar.percentage) {
      const otherJars = await Jar.find({
        userId: req.user.id,
        _id: { $ne: jar._id }
      });
      const totalPercentage = otherJars.reduce((sum, j) => sum + j.percentage, 0);
      
      if (totalPercentage + percentage > 100) {
        return res.status(400).json({
          status: 'error',
          message: 'Total jar percentages cannot exceed 100%'
        });
      }
    }

    jar = await Jar.findByIdAndUpdate(
      req.params.id,
      { name, percentage, color, icon },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: { jar }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete jar
// @route   DELETE /api/v1/jars/:id
// @access  Private
exports.deleteJar = async (req, res, next) => {
  try {
    const jar = await Jar.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!jar) {
      return res.status(404).json({
        status: 'error',
        message: 'Jar not found'
      });
    }

    // Don't allow deletion of default jars
    if (jar.isDefault) {
      return res.status(400).json({
        status: 'error',
        message: 'Cannot delete default jars'
      });
    }

    await jar.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Jar deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Adjust jar amount (add/subtract/edit)
// @route   POST /api/v1/jars/:id/adjust
// @access  Private
exports.adjustJar = async (req, res, next) => {
  try {
    const { amount, type, reason, category } = req.body;

    const jar = await Jar.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!jar) {
      return res.status(404).json({
        status: 'error',
        message: 'Jar not found'
      });
    }

    const previousAmount = jar.amount;
    let newAmount;

    switch (type) {
      case 'add':
        newAmount = previousAmount + amount;
        break;
      case 'subtract':
        if (previousAmount < amount) {
          return res.status(400).json({
            status: 'error',
            message: 'Insufficient funds in jar'
          });
        }
        newAmount = previousAmount - amount;
        break;
      case 'edit':
        // Allow editing to any non-negative amount including 0
        if (amount < 0) {
          return res.status(400).json({
            status: 'error',
            message: 'Amount cannot be negative'
          });
        }
        newAmount = amount;
        break;
      default:
        return res.status(400).json({
          status: 'error',
          message: 'Invalid transaction type'
        });
    }

    // Update jar amount
    jar.amount = newAmount;
    await jar.save();

    // Create transaction record
    await Transaction.create({
      userId: req.user.id,
      jarId: jar._id,
      type,
      amount,
      previousAmount,
      newAmount,
      reason,
      category
    });

    // Update budget tracking in real-time
    try {
      if (type === 'subtract') {
        // Count as spending
        await updateBudgetSpending(req.user.id, amount);
      } else if (type === 'add') {
        // Count as savings
        await updateBudgetSavings(req.user.id, amount);
      }
    } catch (budgetError) {
      console.error('Budget update error:', budgetError);
      // Don't fail the transaction if budget update fails
    }

    res.status(200).json({
      status: 'success',
      data: {
        jar,
        notification: {
          message: `₱${amount.toFixed(2)} ${type === 'add' ? 'added to' : type === 'subtract' ? 'removed from' : 'edited in'} ${jar.name} Jar`,
          type: 'success'
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
