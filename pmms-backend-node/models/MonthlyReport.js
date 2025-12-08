const mongoose = require('mongoose');

const monthlyReportSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  year: {
    type: Number,
    required: true
  },
  // Budget goals
  monthlyIncomeGoal: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0,
    get: (v) => parseFloat(v.toString())
  },
  spendingLimitGoal: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0,
    get: (v) => parseFloat(v.toString())
  },
  savingsGoal: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0,
    get: (v) => parseFloat(v.toString())
  },
  // Actual results
  actualIncome: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0,
    get: (v) => parseFloat(v.toString())
  },
  actualSpending: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0,
    get: (v) => parseFloat(v.toString())
  },
  actualSavings: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0,
    get: (v) => parseFloat(v.toString())
  },
  // Summary stats
  incomeProgress: {
    type: Number,
    default: 0 // Percentage
  },
  spendingProgress: {
    type: Number,
    default: 0 // Percentage
  },
  savingsProgress: {
    type: Number,
    default: 0 // Percentage
  },
  // Alert history
  alertsTriggered: [{
    threshold: Number,
    triggeredAt: Date,
    message: String
  }],
  // Status
  budgetStatus: {
    type: String,
    enum: ['under-budget', 'on-track', 'near-limit', 'over-budget'],
    default: 'on-track'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true }
});

monthlyReportSchema.index({ userId: 1, year: -1, month: -1 });

module.exports = mongoose.model('MonthlyReport', monthlyReportSchema);
