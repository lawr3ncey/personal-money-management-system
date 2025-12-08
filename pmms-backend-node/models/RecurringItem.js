const mongoose = require('mongoose');

const recurringItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  jarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jar',
    required: false
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a name for the recurring item'],
    trim: true
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    get: (v) => parseFloat(v.toString())
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'biweekly', 'monthly', 'yearly'],
    required: true
  },
  dayOfExecution: {
    type: Number,
    min: 1,
    max: 31
  },
  nextExecutionDate: {
    type: Date,
    required: true
  },
  lastExecutionDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true }
});

recurringItemSchema.index({ userId: 1, isActive: 1, nextExecutionDate: 1 });

module.exports = mongoose.model('RecurringItem', recurringItemSchema);
