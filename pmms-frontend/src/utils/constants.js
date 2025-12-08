export const TRANSACTION_TYPES = {
  ADD: 'add',
  SUBTRACT: 'subtract',
  EDIT: 'edit',
  DISTRIBUTE: 'distribute'
};

export const GOAL_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

export const RECURRING_FREQUENCIES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly'
};

export const DEFAULT_JARS = [
  { name: 'Necessities', percentage: 55, color: '#34c759' },
  { name: 'Financial Freedom', percentage: 10, color: '#007aff' },
  { name: 'Education', percentage: 10, color: '#ff9500' },
  { name: 'Long-Term Savings', percentage: 10, color: '#5856d6' },
  { name: 'Play', percentage: 10, color: '#ff2d55' },
  { name: 'Give', percentage: 5, color: '#af52de' }
];

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/v1';

export const PAGINATION_LIMIT = 20;
