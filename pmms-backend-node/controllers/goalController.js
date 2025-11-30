const SavingsGoal = require('../models/SavingsGoal');
const Jar = require('../models/Jar');
const Transaction = require('../models/Transaction');

// @desc    Get all savings goals
// @route   GET /api/v1/goals
// @access  Private
exports.getGoals = async (req, res, next) => {
  try {
    const { completed } = req.query;
    const query = { userId: req.user.id };
    
    if (completed !== undefined) {
      query.isCompleted = completed === 'true';
    }

    const goals = await SavingsGoal.find(query)
      .populate('linkedJars', 'name color')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: goals.length,
      data: { goals }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single goal
// @route   GET /api/v1/goals/:id
// @access  Private
exports.getGoal = async (req, res, next) => {
  try {
    const goal = await SavingsGoal.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).populate('linkedJars', 'name color icon');

    if (!goal) {
      return res.status(404).json({
        status: 'error',
        message: 'Goal not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { goal }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create savings goal
// @route   POST /api/v1/goals
// @access  Private
exports.createGoal = async (req, res, next) => {
  try {
    const { name, targetAmount, deadline, priority, linkedJars } = req.body;

    // Verify linked jars exist
    if (linkedJars && linkedJars.length > 0) {
      const jars = await Jar.find({
        _id: { $in: linkedJars },
        userId: req.user.id
      });

      if (jars.length !== linkedJars.length) {
        return res.status(400).json({
          status: 'error',
          message: 'Some linked jars not found'
        });
      }
    }

    const goal = await SavingsGoal.create({
      userId: req.user.id,
      name,
      targetAmount,
      deadline,
      priority,
      linkedJars
    });

    res.status(201).json({
      status: 'success',
      data: { goal }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update savings goal
// @route   PUT /api/v1/goals/:id
// @access  Private
exports.updateGoal = async (req, res, next) => {
  try {
    const { name, targetAmount, deadline, priority, linkedJars } = req.body;

    let goal = await SavingsGoal.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!goal) {
      return res.status(404).json({
        status: 'error',
        message: 'Goal not found'
      });
    }

    goal = await SavingsGoal.findByIdAndUpdate(
      req.params.id,
      { name, targetAmount, deadline, priority, linkedJars },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: { goal }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete savings goal
// @route   DELETE /api/v1/goals/:id
// @access  Private
exports.deleteGoal = async (req, res, next) => {
  try {
    const goal = await SavingsGoal.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!goal) {
      return res.status(404).json({
        status: 'error',
        message: 'Goal not found'
      });
    }

    await goal.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Goal deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Contribute to savings goal
// @route   POST /api/v1/goals/:id/contribute
// @access  Private
exports.contributeToGoal = async (req, res, next) => {
  try {
    const { jarId, amount } = req.body;

    const goal = await SavingsGoal.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!goal) {
      return res.status(404).json({
        status: 'error',
        message: 'Goal not found'
      });
    }

    // Verify jar
    const jar = await Jar.findOne({
      _id: jarId,
      userId: req.user.id
    });

    if (!jar) {
      return res.status(404).json({
        status: 'error',
        message: 'Jar not found'
      });
    }

    // Check jar has sufficient funds
    if (jar.amount < amount) {
      return res.status(400).json({
        status: 'error',
        message: 'Insufficient funds in jar'
      });
    }

    // Deduct from jar
    const previousAmount = jar.amount;
    jar.amount -= amount;
    await jar.save();

    // Add to goal
    goal.currentAmount += amount;
    goal.contributions.push({
      amount,
      jarId,
      date: new Date()
    });

    // Check if goal is completed
    if (goal.currentAmount >= goal.targetAmount && !goal.isCompleted) {
      goal.isCompleted = true;
      goal.completedAt = new Date();
    }

    await goal.save();

    // Create transaction
    await Transaction.create({
      userId: req.user.id,
      jarId,
      type: 'subtract',
      amount,
      previousAmount,
      newAmount: jar.amount,
      reason: `Contribution to savings goal: ${goal.name}`
    });

    res.status(200).json({
      status: 'success',
      data: {
        goal,
        jar,
        notification: {
          message: goal.isCompleted 
            ? `🎉 Congratulations! Goal "${goal.name}" completed!`
            : `₱${amount.toFixed(2)} contributed to ${goal.name}`,
          type: 'success'
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get goal progress
// @route   GET /api/v1/goals/:id/progress
// @access  Private
exports.getGoalProgress = async (req, res, next) => {
  try {
    const goal = await SavingsGoal.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!goal) {
      return res.status(404).json({
        status: 'error',
        message: 'Goal not found'
      });
    }

    const progress = {
      percentage: Math.round((goal.currentAmount / goal.targetAmount) * 100),
      remaining: goal.targetAmount - goal.currentAmount,
      isCompleted: goal.isCompleted
    };

    // Calculate days remaining
    if (goal.deadline && !goal.isCompleted) {
      const now = new Date();
      const deadline = new Date(goal.deadline);
      const daysRemaining = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
      progress.daysRemaining = daysRemaining;
    }

    res.status(200).json({
      status: 'success',
      data: { goal, progress }
    });
  } catch (error) {
    next(error);
  }
};
