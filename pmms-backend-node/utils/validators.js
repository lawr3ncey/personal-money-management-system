const { body, param, query } = require('express-validator');

exports.registerValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

exports.loginValidator = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

exports.createJarValidator = [
  body('name').trim().notEmpty().withMessage('Jar name is required'),
  body('percentage').isFloat({ min: 0, max: 100 }).withMessage('Percentage must be between 0 and 100')
];

exports.adjustJarValidator = [
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
  body('type').isIn(['add', 'subtract', 'edit']).withMessage('Invalid transaction type')
];

exports.distributeIncomeValidator = [
  body('income').isFloat({ gt: 0 }).withMessage('Income must be greater than 0')
];

exports.createRecurringValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
  body('frequency').isIn(['daily', 'weekly', 'biweekly', 'monthly', 'yearly']).withMessage('Invalid frequency')
];

exports.createGoalValidator = [
  body('name').trim().notEmpty().withMessage('Goal name is required'),
  body('targetAmount').isFloat({ gt: 0 }).withMessage('Target amount must be greater than 0')
];

module.exports = exports;
