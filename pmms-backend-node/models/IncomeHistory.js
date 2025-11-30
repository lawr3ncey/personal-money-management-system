const mongoose = require('mongoose');

const incomeHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    get: (v) => parseFloat(v.toString())
  },
  source: {
    type: String,
    trim: true,
    default: 'Income'
  },
  distributedAt: {
    type: Date,
    default: Date.now
  },
  distribution: [{
    jarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Jar'
    },
    jarName: String,
    allocated: {
      type: mongoose.Schema.Types.Decimal128,
      get: (v) => parseFloat(v.toString())
    }
  }]
}, {
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true }
});

incomeHistorySchema.index({ userId: 1, distributedAt: -1 });

module.exports = mongoose.model('IncomeHistory', incomeHistorySchema);
