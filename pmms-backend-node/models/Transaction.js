const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  jarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jar',
    required: true,
    index: true
  },
  type: {
    type: String,
    enum: ['add', 'subtract', 'edit', 'distribute'],
    required: true
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    get: (v) => parseFloat(v.toString())
  },
  previousAmount: {
    type: mongoose.Schema.Types.Decimal128,
    get: (v) => v ? parseFloat(v.toString()) : null
  },
  newAmount: {
    type: mongoose.Schema.Types.Decimal128,
    get: (v) => v ? parseFloat(v.toString()) : null
  },
  reason: {
    type: String,
    trim: true,
    maxlength: [500, 'Reason cannot be more than 500 characters']
  },
  category: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true }
});

// Compound indexes for efficient queries
transactionSchema.index({ userId: 1, date: -1 });
transactionSchema.index({ userId: 1, jarId: 1, date: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
