const mongoose = require('mongoose');

const jarSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a jar name'],
    trim: true
  },
  amount: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0,
    get: (v) => parseFloat(v.toString())
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 10
  },
  color: {
    type: String,
    default: '#34c759'
  },
  icon: {
    type: String,
    default: 'jar.png'
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  isCustom: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true }
});

// Index for faster queries
jarSchema.index({ userId: 1, order: 1 });
jarSchema.index({ userId: 1, isDefault: 1 });

module.exports = mongoose.model('Jar', jarSchema);
