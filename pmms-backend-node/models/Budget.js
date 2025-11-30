const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
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
  monthlyIncome: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0,
    get: (v) => parseFloat(v.toString())
  },
  spendingLimit: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0,
    get: (v) => parseFloat(v.toString())
  },
  savingsGoal: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0,
    get: (v) => parseFloat(v.toString())
  },
  actualSpent: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0,
    get: (v) => parseFloat(v.toString())
  },
  actualSaved: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0,
    get: (v) => parseFloat(v.toString())
  },
  alerts: [{
    threshold: Number,
    triggered: Boolean,
    triggeredAt: Date
  }]
}, {
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true }
});

budgetSchema.index({ userId: 1, year: -1, month: -1 });

module.exports = mongoose.model('Budget', budgetSchema);
