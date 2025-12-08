/**
 * Extended Admin Dummy Data
 * Complete dataset for all admin modules
 * 🔴 TODO: Replace with Supabase queries
 */

// ============================================
// ADMIN ACCOUNTS & ROLES
// ============================================
export const adminAccounts = [
  {
    id: 'admin_001',
    name: 'Super Admin',
    username: 'superadmin',
    email: 'superadmin@pmms.com',
    role: 'super_admin',
    permissions: ['all'],
    status: 'active',
    lastLogin: '2024-12-07T14:00:00Z',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'admin_002',
    name: 'Finance Admin',
    username: 'financeadmin',
    email: 'finance@pmms.com',
    role: 'finance_admin',
    permissions: ['view_users', 'view_transactions', 'export_data', 'view_reports'],
    status: 'active',
    lastLogin: '2024-12-07T10:00:00Z',
    createdAt: '2024-03-15T00:00:00Z',
  },
  {
    id: 'admin_003',
    name: 'Support Admin',
    username: 'supportadmin',
    email: 'support@pmms.com',
    role: 'support_admin',
    permissions: ['view_users', 'reset_password', 'view_logs'],
    status: 'active',
    lastLogin: '2024-12-06T16:00:00Z',
    createdAt: '2024-05-20T00:00:00Z',
  },
  {
    id: 'admin_004',
    name: 'Viewer Account',
    username: 'viewer',
    email: 'viewer@pmms.com',
    role: 'viewer',
    permissions: ['view_dashboard'],
    status: 'inactive',
    lastLogin: '2024-11-30T09:00:00Z',
    createdAt: '2024-08-10T00:00:00Z',
  },
];

export const rolePermissions = {
  super_admin: {
    label: 'Super Admin',
    color: '#d32f2f',
    permissions: ['All permissions - Full system access'],
  },
  finance_admin: {
    label: 'Finance Admin',
    color: '#1976d2',
    permissions: ['View users', 'View transactions', 'Export data', 'View reports'],
  },
  support_admin: {
    label: 'Support Admin',
    color: '#2e7d32',
    permissions: ['View users', 'Reset passwords', 'View logs'],
  },
  viewer: {
    label: 'Viewer',
    color: '#757575',
    permissions: ['View dashboard only'],
  },
};

// ============================================
// CUSTOM CATEGORIES
// ============================================
export const customCategories = [
  { id: 'cat_001', userId: 'user_001', name: 'Pet Expenses', icon: '🐕', status: 'approved', usageCount: 24, createdAt: '2024-06-15T10:00:00Z' },
  { id: 'cat_002', userId: 'user_001', name: 'Side Business', icon: '💼', status: 'approved', usageCount: 18, createdAt: '2024-07-20T14:00:00Z' },
  { id: 'cat_003', userId: 'user_002', name: 'Gym & Fitness', icon: '💪', status: 'approved', usageCount: 32, createdAt: '2024-05-10T09:00:00Z' },
  { id: 'cat_004', userId: 'user_002', name: 'Online Shopping', icon: '🛒', status: 'approved', usageCount: 45, createdAt: '2024-04-25T11:00:00Z' },
  { id: 'cat_005', userId: 'user_003', name: 'Gaming', icon: '🎮', status: 'pending', usageCount: 0, createdAt: '2024-12-05T16:00:00Z' },
  { id: 'cat_006', userId: 'user_006', name: 'Crypto Investment', icon: '₿', status: 'pending', usageCount: 0, createdAt: '2024-12-06T08:00:00Z' },
  { id: 'cat_007', userId: 'user_007', name: 'Home Improvement', icon: '🏠', status: 'approved', usageCount: 12, createdAt: '2024-08-12T13:00:00Z' },
  { id: 'cat_008', userId: 'user_001', name: 'Gift Purchases', icon: '🎁', status: 'denied', usageCount: 0, createdAt: '2024-12-01T10:00:00Z', denyReason: 'Similar to existing category' },
];

// ============================================
// SAVINGS GOALS
// ============================================
export const savingsGoals = [
  { id: 'goal_001', userId: 'user_001', userName: 'Juan Dela Cruz', name: 'Emergency Fund', targetAmount: 100000, currentAmount: 45000, deadline: '2025-06-30', status: 'active', priority: 'high', createdAt: '2024-01-20T10:00:00Z' },
  { id: 'goal_002', userId: 'user_001', userName: 'Juan Dela Cruz', name: 'New Laptop', targetAmount: 80000, currentAmount: 35000, deadline: '2025-03-31', status: 'active', priority: 'medium', createdAt: '2024-03-15T14:00:00Z' },
  { id: 'goal_003', userId: 'user_002', userName: 'Maria Santos', name: 'Travel to Japan', targetAmount: 150000, currentAmount: 120000, deadline: '2025-04-15', status: 'active', priority: 'high', createdAt: '2024-02-10T09:00:00Z' },
  { id: 'goal_004', userId: 'user_002', userName: 'Maria Santos', name: 'Investment Fund', targetAmount: 500000, currentAmount: 180000, deadline: '2026-12-31', status: 'active', priority: 'low', createdAt: '2024-01-05T11:00:00Z' },
  { id: 'goal_005', userId: 'user_003', userName: 'Pedro Reyes', name: 'Wedding Fund', targetAmount: 300000, currentAmount: 75000, deadline: '2025-10-20', status: 'active', priority: 'high', createdAt: '2024-04-01T10:00:00Z' },
  { id: 'goal_006', userId: 'user_006', userName: 'Sofia Rodriguez', name: 'First Car', targetAmount: 400000, currentAmount: 25000, deadline: '2026-06-30', status: 'active', priority: 'medium', createdAt: '2024-12-01T14:00:00Z' },
  { id: 'goal_007', userId: 'user_007', userName: 'Roberto Diaz', name: 'House Renovation', targetAmount: 200000, currentAmount: 200000, deadline: '2024-12-31', status: 'completed', priority: 'high', createdAt: '2024-06-15T08:00:00Z' },
  { id: 'goal_008', userId: 'user_008', userName: 'Isabel Cruz', name: 'Study Abroad Fund', targetAmount: 250000, currentAmount: 85000, deadline: '2025-08-01', status: 'active', priority: 'high', createdAt: '2024-05-20T16:00:00Z' },
];

// ============================================
// RECURRING ITEMS
// ============================================
export const recurringItems = [
  // Income recurring
  { id: 'rec_001', userId: 'user_001', userName: 'Juan Dela Cruz', type: 'income', name: 'Monthly Salary', amount: 50000, frequency: 'monthly', nextDate: '2025-01-01', status: 'active', jarName: 'Auto-distribute', createdAt: '2024-01-15T10:00:00Z' },
  { id: 'rec_002', userId: 'user_001', userName: 'Juan Dela Cruz', type: 'income', name: 'Freelance Project', amount: 15000, frequency: 'monthly', nextDate: '2025-01-15', status: 'active', jarName: 'Financial Freedom', createdAt: '2024-06-01T10:00:00Z' },
  { id: 'rec_003', userId: 'user_002', userName: 'Maria Santos', type: 'income', name: 'Monthly Salary', amount: 45000, frequency: 'monthly', nextDate: '2025-01-05', status: 'active', jarName: 'Auto-distribute', createdAt: '2024-02-20T10:00:00Z' },
  { id: 'rec_004', userId: 'user_007', userName: 'Roberto Diaz', type: 'income', name: 'Monthly Salary', amount: 80000, frequency: 'monthly', nextDate: '2025-01-01', status: 'active', jarName: 'Auto-distribute', createdAt: '2024-04-01T10:00:00Z' },
  
  // Bills recurring
  { id: 'rec_005', userId: 'user_001', userName: 'Juan Dela Cruz', type: 'bill', name: 'House Rent', amount: 12000, frequency: 'monthly', nextDate: '2025-01-05', status: 'active', jarName: 'Necessities', createdAt: '2024-01-15T10:00:00Z' },
  { id: 'rec_006', userId: 'user_001', userName: 'Juan Dela Cruz', type: 'bill', name: 'Electric Bill', amount: 2500, frequency: 'monthly', nextDate: '2025-01-10', status: 'active', jarName: 'Necessities', createdAt: '2024-01-15T10:00:00Z' },
  { id: 'rec_007', userId: 'user_001', userName: 'Juan Dela Cruz', type: 'bill', name: 'Internet', amount: 1800, frequency: 'monthly', nextDate: '2025-01-15', status: 'active', jarName: 'Necessities', createdAt: '2024-01-15T10:00:00Z' },
  { id: 'rec_008', userId: 'user_001', userName: 'Juan Dela Cruz', type: 'bill', name: 'Netflix', amount: 549, frequency: 'monthly', nextDate: '2025-01-20', status: 'active', jarName: 'Play', createdAt: '2024-03-01T10:00:00Z' },
  { id: 'rec_009', userId: 'user_002', userName: 'Maria Santos', type: 'bill', name: 'Condo Rent', amount: 18000, frequency: 'monthly', nextDate: '2025-01-01', status: 'active', jarName: 'Necessities', createdAt: '2024-02-20T10:00:00Z' },
  { id: 'rec_010', userId: 'user_002', userName: 'Maria Santos', type: 'bill', name: 'Gym Membership', amount: 2500, frequency: 'monthly', nextDate: '2025-01-01', status: 'paused', jarName: 'Play', createdAt: '2024-05-10T10:00:00Z' },
  { id: 'rec_011', userId: 'user_003', userName: 'Pedro Reyes', type: 'bill', name: 'Car Loan', amount: 15000, frequency: 'monthly', nextDate: '2025-01-05', status: 'active', jarName: 'Necessities', createdAt: '2024-03-10T10:00:00Z' },
  { id: 'rec_012', userId: 'user_007', userName: 'Roberto Diaz', type: 'bill', name: 'House Mortgage', amount: 25000, frequency: 'monthly', nextDate: '2025-01-01', status: 'active', jarName: 'Necessities', createdAt: '2024-04-01T10:00:00Z' },
];

// ============================================
// MONTHLY BUDGETS
// ============================================
export const monthlyBudgets = [
  { id: 'budget_001', userId: 'user_001', userName: 'Juan Dela Cruz', month: '2024-12', totalIncome: 65000, totalExpense: 42000, savings: 23000, limitHits: 1, overspending: false },
  { id: 'budget_002', userId: 'user_001', userName: 'Juan Dela Cruz', month: '2024-11', totalIncome: 65000, totalExpense: 55000, savings: 10000, limitHits: 3, overspending: true },
  { id: 'budget_003', userId: 'user_002', userName: 'Maria Santos', month: '2024-12', totalIncome: 45000, totalExpense: 32000, savings: 13000, limitHits: 0, overspending: false },
  { id: 'budget_004', userId: 'user_002', userName: 'Maria Santos', month: '2024-11', totalIncome: 45000, totalExpense: 38000, savings: 7000, limitHits: 2, overspending: false },
  { id: 'budget_005', userId: 'user_003', userName: 'Pedro Reyes', month: '2024-12', totalIncome: 35000, totalExpense: 28000, savings: 7000, limitHits: 1, overspending: false },
  { id: 'budget_006', userId: 'user_007', userName: 'Roberto Diaz', month: '2024-12', totalIncome: 80000, totalExpense: 52000, savings: 28000, limitHits: 0, overspending: false },
];

// ============================================
// SYSTEM LOGS & ERRORS
// ============================================
export const systemLogs = [
  { id: 'syslog_001', level: 'info', source: 'API', message: 'Server started successfully', timestamp: '2024-12-07T00:00:00Z', details: 'Node.js server running on port 5000' },
  { id: 'syslog_002', level: 'info', source: 'Database', message: 'MongoDB connection established', timestamp: '2024-12-07T00:00:01Z', details: 'Connected to MongoDB Atlas cluster' },
  { id: 'syslog_003', level: 'warning', source: 'Auth', message: 'Multiple failed login attempts', timestamp: '2024-12-07T08:15:00Z', details: 'IP: 192.168.1.50, User: unknown, Attempts: 5' },
  { id: 'syslog_004', level: 'error', source: 'API', message: 'Rate limit exceeded', timestamp: '2024-12-07T10:30:00Z', details: 'IP: 192.168.1.100, Endpoint: /api/transactions' },
  { id: 'syslog_005', level: 'info', source: 'Cron', message: 'Recurring items processed', timestamp: '2024-12-07T00:01:00Z', details: 'Processed 12 recurring items successfully' },
  { id: 'syslog_006', level: 'error', source: 'Cron', message: 'Recurring item failed', timestamp: '2024-12-06T00:01:00Z', details: 'User user_004 has insufficient balance for Netflix subscription' },
  { id: 'syslog_007', level: 'warning', source: 'Database', message: 'Slow query detected', timestamp: '2024-12-07T14:20:00Z', details: 'Query took 2.3s: GET /api/transactions?limit=1000' },
  { id: 'syslog_008', level: 'info', source: 'Backup', message: 'Daily backup completed', timestamp: '2024-12-07T02:00:00Z', details: 'Backup size: 125MB, Duration: 45s' },
  { id: 'syslog_009', level: 'error', source: 'Import', message: 'CSV import failed', timestamp: '2024-12-06T15:30:00Z', details: 'User user_003: Invalid date format in row 15' },
  { id: 'syslog_010', level: 'info', source: 'Export', message: 'Data export completed', timestamp: '2024-12-07T11:00:00Z', details: 'Admin admin_002 exported transactions report' },
  { id: 'syslog_011', level: 'warning', source: 'Security', message: 'Suspicious activity detected', timestamp: '2024-12-07T09:45:00Z', details: 'User user_005 attempted to access admin routes' },
  { id: 'syslog_012', level: 'info', source: 'System', message: 'Cache cleared', timestamp: '2024-12-07T06:00:00Z', details: 'Redis cache cleared, freed 50MB' },
];

// ============================================
// BACKUP HISTORY
// ============================================
export const backupHistory = [
  { id: 'backup_001', type: 'full', size: '125MB', status: 'completed', createdBy: 'system', timestamp: '2024-12-07T02:00:00Z', duration: '45s' },
  { id: 'backup_002', type: 'full', size: '122MB', status: 'completed', createdBy: 'system', timestamp: '2024-12-06T02:00:00Z', duration: '43s' },
  { id: 'backup_003', type: 'full', size: '120MB', status: 'completed', createdBy: 'system', timestamp: '2024-12-05T02:00:00Z', duration: '42s' },
  { id: 'backup_004', type: 'manual', size: '118MB', status: 'completed', createdBy: 'admin_001', timestamp: '2024-12-04T15:30:00Z', duration: '40s' },
  { id: 'backup_005', type: 'full', size: '115MB', status: 'failed', createdBy: 'system', timestamp: '2024-12-03T02:00:00Z', duration: '0s', error: 'Disk space insufficient' },
  { id: 'backup_006', type: 'incremental', size: '15MB', status: 'completed', createdBy: 'system', timestamp: '2024-12-07T14:00:00Z', duration: '8s' },
];

// ============================================
// SESSION LOGS
// ============================================
export const sessionLogs = [
  { id: 'sess_001', userId: 'user_001', userName: 'Juan Dela Cruz', action: 'login', ip: '192.168.1.101', device: 'Chrome / Windows', location: 'Quezon City, PH', timestamp: '2024-12-07T08:15:00Z', status: 'success' },
  { id: 'sess_002', userId: 'user_002', userName: 'Maria Santos', action: 'login', ip: '192.168.1.102', device: 'Safari / iOS', location: 'Makati City, PH', timestamp: '2024-12-07T07:30:00Z', status: 'success' },
  { id: 'sess_003', userId: 'user_001', userName: 'Juan Dela Cruz', action: 'logout', ip: '192.168.1.101', device: 'Chrome / Windows', location: 'Quezon City, PH', timestamp: '2024-12-07T17:00:00Z', status: 'success' },
  { id: 'sess_004', userId: 'unknown', userName: 'Unknown', action: 'login', ip: '192.168.1.50', device: 'Firefox / Linux', location: 'Unknown', timestamp: '2024-12-07T08:10:00Z', status: 'failed', reason: 'Invalid credentials' },
  { id: 'sess_005', userId: 'unknown', userName: 'Unknown', action: 'login', ip: '192.168.1.50', device: 'Firefox / Linux', location: 'Unknown', timestamp: '2024-12-07T08:11:00Z', status: 'failed', reason: 'Invalid credentials' },
  { id: 'sess_006', userId: 'unknown', userName: 'Unknown', action: 'login', ip: '192.168.1.50', device: 'Firefox / Linux', location: 'Unknown', timestamp: '2024-12-07T08:12:00Z', status: 'failed', reason: 'Account locked' },
  { id: 'sess_007', userId: 'admin_001', userName: 'Super Admin', action: 'login', ip: '192.168.1.200', device: 'Chrome / Windows', location: 'Manila, PH', timestamp: '2024-12-07T14:00:00Z', status: 'success' },
  { id: 'sess_008', userId: 'user_007', userName: 'Roberto Diaz', action: 'login', ip: '192.168.1.107', device: 'Chrome / Android', location: 'Paranaque, PH', timestamp: '2024-12-07T09:00:00Z', status: 'success' },
];

// ============================================
// SYSTEM HEALTH
// ============================================
export const systemHealth = {
  api: { status: 'healthy', uptime: '99.9%', responseTime: '45ms', lastCheck: '2024-12-07T15:00:00Z' },
  database: { status: 'healthy', connections: 12, maxConnections: 100, lastCheck: '2024-12-07T15:00:00Z' },
  cache: { status: 'healthy', hitRate: '94.5%', memoryUsed: '50MB', lastCheck: '2024-12-07T15:00:00Z' },
  storage: { status: 'warning', used: '85GB', total: '100GB', lastCheck: '2024-12-07T15:00:00Z' },
  cron: { status: 'healthy', lastRun: '2024-12-07T14:00:00Z', nextRun: '2024-12-07T15:00:00Z', failedJobs: 1 },
};

// ============================================
// ADMIN SETTINGS
// ============================================
export const adminSettings = {
  general: {
    siteName: 'PMMS Admin',
    timezone: 'Asia/Manila',
    dateFormat: 'MMM DD, YYYY',
    currency: 'PHP',
    language: 'en',
  },
  features: {
    userRegistration: true,
    emailVerification: true,
    twoFactorAuth: false,
    autoBackup: true,
    maintenanceMode: false,
  },
  notifications: {
    emailAlerts: true,
    slackIntegration: false,
    lowBalanceAlert: 1000,
    suspiciousActivityAlert: true,
  },
  security: {
    maxLoginAttempts: 5,
    sessionTimeout: 30, // minutes
    passwordMinLength: 8,
    requireSpecialChar: true,
  },
};

// ============================================
// MONTHLY REPORTS
// ============================================
export const monthlyReports = [
  { id: 'report_001', month: 'December 2024', totalUsers: 8, newUsers: 1, totalTransactions: 25, totalIncome: 275000, totalExpense: 185000, generatedAt: '2024-12-07T00:00:00Z' },
  { id: 'report_002', month: 'November 2024', totalUsers: 7, newUsers: 2, totalTransactions: 156, totalIncome: 420000, totalExpense: 310000, generatedAt: '2024-12-01T00:00:00Z' },
  { id: 'report_003', month: 'October 2024', totalUsers: 5, newUsers: 1, totalTransactions: 142, totalIncome: 380000, totalExpense: 275000, generatedAt: '2024-11-01T00:00:00Z' },
  { id: 'report_004', month: 'September 2024', totalUsers: 4, newUsers: 0, totalTransactions: 128, totalIncome: 320000, totalExpense: 240000, generatedAt: '2024-10-01T00:00:00Z' },
];

// ============================================
// SPENDING CATEGORIES STATS
// ============================================
export const categoryStats = [
  { category: 'Food & Groceries', totalSpent: 45000, transactionCount: 85, avgAmount: 529, trend: 'up' },
  { category: 'Housing', totalSpent: 72000, transactionCount: 12, avgAmount: 6000, trend: 'stable' },
  { category: 'Utilities', totalSpent: 18500, transactionCount: 24, avgAmount: 771, trend: 'down' },
  { category: 'Entertainment', totalSpent: 25000, transactionCount: 45, avgAmount: 556, trend: 'up' },
  { category: 'Transportation', totalSpent: 12000, transactionCount: 30, avgAmount: 400, trend: 'stable' },
  { category: 'Education', totalSpent: 35000, transactionCount: 18, avgAmount: 1944, trend: 'up' },
  { category: 'Healthcare', totalSpent: 8500, transactionCount: 8, avgAmount: 1063, trend: 'down' },
  { category: 'Shopping', totalSpent: 22000, transactionCount: 28, avgAmount: 786, trend: 'up' },
];

// ============================================
// JAR HEATMAP DATA
// ============================================
export const jarHeatmapData = [
  { jarName: 'Necessities', monday: 12, tuesday: 8, wednesday: 15, thursday: 10, friday: 18, saturday: 22, sunday: 5 },
  { jarName: 'Financial Freedom', monday: 2, tuesday: 1, wednesday: 3, thursday: 2, friday: 4, saturday: 1, sunday: 0 },
  { jarName: 'Play', monday: 5, tuesday: 8, wednesday: 4, thursday: 6, friday: 15, saturday: 25, sunday: 18 },
  { jarName: 'Education', monday: 3, tuesday: 2, wednesday: 5, thursday: 4, friday: 2, saturday: 1, sunday: 0 },
  { jarName: 'Long-term Savings', monday: 1, tuesday: 0, wednesday: 2, thursday: 1, friday: 3, saturday: 0, sunday: 0 },
  { jarName: 'Give', monday: 1, tuesday: 0, wednesday: 1, thursday: 0, friday: 2, saturday: 3, sunday: 5 },
];

// ============================================
// EXPORT FUNCTIONS
// ============================================
export const getDashboardStats = () => {
  return {
    totalUsers: 8,
    totalTransactions: 356,
    totalRecurringItems: 12,
    activeCategories: 7,
    monthlyReports: 4,
    systemStatus: 'healthy',
  };
};

export const getSystemActivityData = () => {
  return {
    daily: [
      { hour: '00:00', requests: 45 },
      { hour: '04:00', requests: 12 },
      { hour: '08:00', requests: 156 },
      { hour: '12:00', requests: 234 },
      { hour: '16:00', requests: 189 },
      { hour: '20:00', requests: 145 },
    ],
    weekly: [
      { day: 'Mon', requests: 1245 },
      { day: 'Tue', requests: 1456 },
      { day: 'Wed', requests: 1367 },
      { day: 'Thu', requests: 1589 },
      { day: 'Fri', requests: 1823 },
      { day: 'Sat', requests: 2145 },
      { day: 'Sun', requests: 1234 },
    ],
    monthly: [
      { week: 'Week 1', requests: 8456 },
      { week: 'Week 2', requests: 9234 },
      { week: 'Week 3', requests: 8789 },
      { week: 'Week 4', requests: 10234 },
    ],
  };
};

export default {
  adminAccounts,
  rolePermissions,
  customCategories,
  savingsGoals,
  recurringItems,
  monthlyBudgets,
  systemLogs,
  backupHistory,
  sessionLogs,
  systemHealth,
  adminSettings,
  monthlyReports,
  categoryStats,
  jarHeatmapData,
  getDashboardStats,
  getSystemActivityData,
};
