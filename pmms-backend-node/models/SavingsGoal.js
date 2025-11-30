const mongoose = require('mongoose');

const savingsGoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a goal name'],
    trim: true
  },
  targetAmount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    get: (v) => parseFloat(v.toString())
  },
  currentAmount: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0,
    get: (v) => parseFloat(v.toString())
  },
  deadline: {
    type: Date
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  linkedJars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jar'
  }],
  contributions: [{
    amount: {
      type: mongoose.Schema.Types.Decimal128,
      get: (v) => parseFloat(v.toString())
    },
    date: {
      type: Date,
      default: Date.now
    },
    jarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Jar'
    }
  }],
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true }
});

savingsGoalSchema.index({ userId: 1, isCompleted: 1 });

module.exports = mongoose.model('SavingsGoal', savingsGoalSchema);
