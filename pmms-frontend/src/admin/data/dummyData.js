/**
 * Admin Dummy Data Service
 * 
 * Comprehensive dummy data for Admin Panel
 * Structure matches backend models
 * 
 * 🔴 TODO: Replace with Supabase queries
 */

// Helper function for random dates
const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Dummy Users
export const dummyUsers = [
  {
    id: 'user_001',
    name: 'Juan Dela Cruz',
    username: 'juandc',
    email: 'juan@example.com',
    phone: '+639171234567',
    age: 28,
    gender: 'male',
    address: 'Quezon City, Metro Manila',
    role: 'user',
    status: 'active',
    createdAt: '2024-01-15T10:30:00Z',
    lastLogin: '2024-12-07T08:15:00Z',
    totalBalance: 45000,
    totalIncome: 150000,
    jarCount: 6,
    transactionCount: 142,
  },
  {
    id: 'user_002',
    name: 'Maria Santos',
    username: 'mariasantos',
    email: 'maria@example.com',
    phone: '+639181234567',
    age: 32,
    gender: 'female',
    address: 'Makati City, Metro Manila',
    role: 'user',
    status: 'active',
    createdAt: '2024-02-20T14:20:00Z',
    lastLogin: '2024-12-07T07:30:00Z',
    totalBalance: 28000,
    totalIncome: 95000,
    jarCount: 6,
    transactionCount: 89,
  },
  {
    id: 'user_003',
    name: 'Pedro Reyes',
    username: 'preyes',
    email: 'pedro@example.com',
    phone: '+639191234567',
    age: 35,
    gender: 'male',
    address: 'Pasig City, Metro Manila',
    role: 'user',
    status: 'active',
    createdAt: '2024-03-10T09:15:00Z',
    lastLogin: '2024-12-06T18:45:00Z',
    totalBalance: 12000,
    totalIncome: 42000,
    jarCount: 6,
    transactionCount: 34,
  },
  {
    id: 'user_004',
    name: 'Ana Garcia',
    username: 'anagarcia',
    email: 'ana@example.com',
    phone: '+639201234567',
    age: 26,
    gender: 'female',
    address: 'Taguig City, Metro Manila',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-11-05T16:45:00Z',
    lastLogin: '2024-11-20T12:00:00Z',
    totalBalance: 5000,
    totalIncome: 15000,
    jarCount: 6,
    transactionCount: 12,
  },
  {
    id: 'user_005',
    name: 'Carlos Mendoza',
    username: 'carlosm',
    email: 'carlos@example.com',
    phone: '+639211234567',
    age: 40,
    gender: 'male',
    address: 'Manila City, Metro Manila',
    role: 'user',
    status: 'suspended',
    createdAt: '2024-06-15T11:00:00Z',
    lastLogin: '2024-10-15T10:30:00Z',
    totalBalance: 8500,
    totalIncome: 65000,
    jarCount: 6,
    transactionCount: 56,
  },
  {
    id: 'user_006',
    name: 'Sofia Rodriguez',
    username: 'sofia_r',
    email: 'sofia@example.com',
    phone: '+639221234567',
    age: 29,
    gender: 'female',
    address: 'Caloocan City, Metro Manila',
    role: 'user',
    status: 'active',
    createdAt: '2024-12-01T08:00:00Z',
    lastLogin: '2024-12-07T09:00:00Z',
    totalBalance: 15000,
    totalIncome: 18000,
    jarCount: 6,
    transactionCount: 8,
  },
  {
    id: 'user_007',
    name: 'Roberto Diaz',
    username: 'rdiaz',
    email: 'roberto@example.com',
    phone: '+639231234567',
    age: 45,
    gender: 'male',
    address: 'Parañaque City, Metro Manila',
    role: 'user',
    status: 'active',
    createdAt: '2024-04-22T13:30:00Z',
    lastLogin: '2024-12-07T06:45:00Z',
    totalBalance: 62000,
    totalIncome: 185000,
    jarCount: 6,
    transactionCount: 198,
  },
  {
    id: 'user_008',
    name: 'Isabel Cruz',
    username: 'isabelc',
    email: 'isabel@example.com',
    phone: '+639241234567',
    age: 31,
    gender: 'female',
    address: 'Las Piñas City, Metro Manila',
    role: 'user',
    status: 'active',
    createdAt: '2024-08-10T15:20:00Z',
    lastLogin: '2024-12-06T20:15:00Z',
    totalBalance: 22000,
    totalIncome: 58000,
    jarCount: 6,
    transactionCount: 67,
  },
];

// Dummy Jars (per user)
export const dummyJars = [
  { id: 'jar_001', userId: 'user_001', name: 'Necessities', percentage: 55, amount: 24750, color: '#ef4444', icon: '🏠' },
  { id: 'jar_002', userId: 'user_001', name: 'Education', percentage: 10, amount: 4500, color: '#3b82f6', icon: '📚' },
  { id: 'jar_003', userId: 'user_001', name: 'Play', percentage: 10, amount: 4500, color: '#10b981', icon: '🎮' },
  { id: 'jar_004', userId: 'user_001', name: 'Long-term Savings', percentage: 10, amount: 4500, color: '#f59e0b', icon: '💰' },
  { id: 'jar_005', userId: 'user_001', name: 'Financial Freedom', percentage: 10, amount: 4500, color: '#8b5cf6', icon: '🚀' },
  { id: 'jar_006', userId: 'user_001', name: 'Give', percentage: 5, amount: 2250, color: '#ec4899', icon: '❤️' },
  
  { id: 'jar_007', userId: 'user_002', name: 'Necessities', percentage: 55, amount: 15400, color: '#ef4444', icon: '🏠' },
  { id: 'jar_008', userId: 'user_002', name: 'Education', percentage: 10, amount: 2800, color: '#3b82f6', icon: '📚' },
  { id: 'jar_009', userId: 'user_002', name: 'Play', percentage: 10, amount: 2800, color: '#10b981', icon: '🎮' },
  { id: 'jar_010', userId: 'user_002', name: 'Long-term Savings', percentage: 10, amount: 2800, color: '#f59e0b', icon: '💰' },
  { id: 'jar_011', userId: 'user_002', name: 'Financial Freedom', percentage: 10, amount: 2800, color: '#8b5cf6', icon: '🚀' },
  { id: 'jar_012', userId: 'user_002', name: 'Give', percentage: 5, amount: 1400, color: '#ec4899', icon: '❤️' },
];

// Dummy Transactions (Enhanced for PMMS)
export const dummyTransactions = [
  // Income distributions
  { id: 'txn_001', userId: 'user_001', userName: 'Juan Dela Cruz', jarId: 'jar_001', jarName: 'Necessities', type: 'income', amount: 27500, reason: 'Monthly salary distribution', category: 'Income', date: '2024-12-01T10:00:00Z', method: 'auto', status: 'Completed' },
  { id: 'txn_002', userId: 'user_001', userName: 'Juan Dela Cruz', jarId: 'jar_002', jarName: 'Financial Freedom', type: 'income', amount: 5000, reason: 'Monthly salary distribution', category: 'Income', date: '2024-12-01T10:00:05Z', method: 'auto', status: 'Completed' },
  { id: 'txn_003', userId: 'user_001', userName: 'Juan Dela Cruz', jarId: 'jar_003', jarName: 'Play', type: 'income', amount: 5000, reason: 'Monthly salary distribution', category: 'Income', date: '2024-12-01T10:00:10Z', method: 'auto', status: 'Completed' },
  { id: 'txn_004', userId: 'user_001', userName: 'Juan Dela Cruz', jarId: 'jar_004', jarName: 'Long-term Savings', type: 'income', amount: 5000, reason: 'Monthly salary distribution', category: 'Income', date: '2024-12-01T10:00:15Z', method: 'auto', status: 'Completed' },
  { id: 'txn_005', userId: 'user_001', userName: 'Juan Dela Cruz', jarId: 'jar_005', jarName: 'Education', type: 'income', amount: 5000, reason: 'Monthly salary distribution', category: 'Income', date: '2024-12-01T10:00:20Z', method: 'auto', status: 'Completed' },
  { id: 'txn_006', userId: 'user_001', userName: 'Juan Dela Cruz', jarId: 'jar_006', jarName: 'Give', type: 'income', amount: 2500, reason: 'Monthly salary distribution', category: 'Income', date: '2024-12-01T10:00:25Z', method: 'auto', status: 'Completed' },
  
  // Deductions
  { id: 'txn_007', userId: 'user_001', userName: 'Juan Dela Cruz', jarId: 'jar_001', jarName: 'Necessities', type: 'deduction', amount: 2500, reason: 'Grocery shopping at SM', category: 'Food & Groceries', date: '2024-12-02T15:30:00Z', method: 'manual', status: 'Completed' },
  { id: 'txn_008', userId: 'user_001', userName: 'Juan Dela Cruz', jarId: 'jar_001', jarName: 'Necessities', type: 'deduction', amount: 800, reason: 'Electric bill payment', category: 'Utilities', date: '2024-12-03T09:15:00Z', method: 'manual', status: 'Completed' },
  { id: 'txn_009', userId: 'user_001', userName: 'Juan Dela Cruz', jarId: 'jar_003', jarName: 'Play', type: 'deduction', amount: 1200, reason: 'Restaurant dinner with family', category: 'Entertainment', date: '2024-12-04T20:00:00Z', method: 'manual', status: 'Completed' },
  { id: 'txn_010', userId: 'user_001', userName: 'Juan Dela Cruz', jarId: 'jar_005', jarName: 'Education', type: 'deduction', amount: 2500, reason: 'Online course enrollment', category: 'Learning', date: '2024-12-05T14:00:00Z', method: 'manual', status: 'Completed' },
  
  // Transfers
  { id: 'txn_011', userId: 'user_001', userName: 'Juan Dela Cruz', jarId: 'jar_003', jarName: 'Play', type: 'transfer_out', amount: 1000, reason: 'Transfer to Savings', category: 'Transfer', date: '2024-12-06T11:00:00Z', method: 'manual', status: 'Completed', relatedJar: 'Long-term Savings' },
  { id: 'txn_012', userId: 'user_001', userName: 'Juan Dela Cruz', jarId: 'jar_004', jarName: 'Long-term Savings', type: 'transfer_in', amount: 1000, reason: 'Transfer from Play', category: 'Transfer', date: '2024-12-06T11:00:05Z', method: 'manual', status: 'Completed', relatedJar: 'Play' },
  
  // User 2
  { id: 'txn_013', userId: 'user_002', userName: 'Maria Santos', jarId: 'jar_007', jarName: 'Necessities', type: 'income', amount: 16500, reason: 'Freelance project payment', category: 'Income', date: '2024-12-01T11:20:00Z', method: 'manual', status: 'Completed' },
  { id: 'txn_014', userId: 'user_002', userName: 'Maria Santos', jarId: 'jar_009', jarName: 'Play', type: 'deduction', amount: 800, reason: 'Movie tickets', category: 'Entertainment', date: '2024-12-03T19:00:00Z', method: 'manual', status: 'Completed' },
  { id: 'txn_015', userId: 'user_002', userName: 'Maria Santos', jarId: 'jar_007', jarName: 'Necessities', type: 'deduction', amount: 1500, reason: 'Mobile phone bill', category: 'Utilities', date: '2024-12-04T10:30:00Z', method: 'manual', status: 'Completed' },
  
  // User 3
  { id: 'txn_016', userId: 'user_003', userName: 'Pedro Reyes', jarId: 'jar_001', jarName: 'Education', type: 'income', amount: 5500, reason: 'Part-time job salary', category: 'Income', date: '2024-12-02T08:00:00Z', method: 'manual', status: 'Completed' },
  { id: 'txn_017', userId: 'user_003', userName: 'Pedro Reyes', jarId: 'jar_001', jarName: 'Education', type: 'deduction', amount: 3000, reason: 'Textbooks purchase', category: 'Learning', date: '2024-12-05T13:00:00Z', method: 'manual', status: 'Completed' },
  
  // User 7
  { id: 'txn_018', userId: 'user_007', userName: 'Roberto Diaz', jarId: 'jar_001', jarName: 'Necessities', type: 'income', amount: 44000, reason: 'Monthly salary distribution', category: 'Income', date: '2024-12-05T09:00:00Z', method: 'auto', status: 'Completed' },
  { id: 'txn_019', userId: 'user_007', userName: 'Roberto Diaz', jarId: 'jar_001', jarName: 'Necessities', type: 'deduction', amount: 5000, reason: 'House rent payment', category: 'Housing', date: '2024-12-06T08:00:00Z', method: 'manual', status: 'Completed' },
  
  // User 8
  { id: 'txn_020', userId: 'user_008', userName: 'Isabel Cruz', jarId: 'jar_002', jarName: 'Education', type: 'income', amount: 3000, reason: 'Scholarship disbursement', category: 'Income', date: '2024-12-03T10:00:00Z', method: 'manual', status: 'Completed' },
  { id: 'txn_021', userId: 'user_008', userName: 'Isabel Cruz', jarId: 'jar_002', jarName: 'Education', type: 'deduction', amount: 2500, reason: 'Online course payment', category: 'Learning', date: '2024-12-05T14:00:00Z', method: 'manual', status: 'Completed' },
  
  // User 6 - Recent
  { id: 'txn_022', userId: 'user_006', userName: 'Sofia Rodriguez', jarId: 'jar_001', jarName: 'Necessities', type: 'income', amount: 22000, reason: 'New job first salary', category: 'Income', date: '2024-12-06T10:00:00Z', method: 'manual', status: 'Completed' },
  { id: 'txn_023', userId: 'user_006', userName: 'Sofia Rodriguez', jarId: 'jar_001', jarName: 'Necessities', type: 'deduction', amount: 3500, reason: 'Grocery shopping', category: 'Food & Groceries', date: '2024-12-07T16:00:00Z', method: 'manual', status: 'Completed' },
  
  // Pending/Failed transactions
  { id: 'txn_024', userId: 'user_001', userName: 'Juan Dela Cruz', jarId: 'jar_006', jarName: 'Give', type: 'deduction', amount: 500, reason: 'Charity donation', category: 'Charity', date: '2024-12-07T18:00:00Z', method: 'manual', status: 'Pending' },
  { id: 'txn_025', userId: 'user_002', userName: 'Maria Santos', jarId: 'jar_008', jarName: 'Financial Freedom', type: 'transfer_out', amount: 2000, reason: 'Investment attempt', category: 'Transfer', date: '2024-12-07T20:00:00Z', method: 'manual', status: 'Failed' },
];

// Dummy Notifications (Enhanced for PMMS)
export const dummyNotifications = [
  // System notifications
  { id: 'notif_001', userId: 'all', userName: 'System', title: 'System Maintenance Scheduled', message: 'Scheduled maintenance on Dec 10, 2024 from 2:00 AM - 4:00 AM. Services may be temporarily unavailable.', type: 'system', isRead: false, timestamp: '2024-12-07T07:00:00Z' },
  { id: 'notif_002', userId: 'all', userName: 'System', title: 'New Feature Released', message: 'Check out our new budget tracking feature with enhanced analytics!', type: 'info', isRead: false, timestamp: '2024-12-06T10:00:00Z' },
  
  // User-specific notifications
  { id: 'notif_003', userId: 'user_001', userName: 'Juan Dela Cruz', title: 'Income Distribution Completed', message: 'Your monthly salary of ₱50,000 has been automatically distributed across your 6 jars.', type: 'info', isRead: true, timestamp: '2024-12-01T10:00:30Z' },
  { id: 'notif_004', userId: 'user_001', userName: 'Juan Dela Cruz', title: 'Low Balance Alert', message: 'Your Play jar balance is running low (₱800 remaining). Consider adjusting your budget.', type: 'warning', isRead: true, timestamp: '2024-12-05T09:00:00Z' },
  { id: 'notif_005', userId: 'user_001', userName: 'Juan Dela Cruz', title: 'Savings Milestone Reached', message: 'Congratulations! You\'ve saved ₱10,000 in your Long-term Savings jar this month.', type: 'success', isRead: false, timestamp: '2024-12-07T15:00:00Z' },
  
  { id: 'notif_006', userId: 'user_002', userName: 'Maria Santos', title: 'Goal Achievement', message: 'You\'ve reached your savings goal of ₱20,000! Time to set a new target.', type: 'success', isRead: false, timestamp: '2024-12-03T15:00:00Z' },
  { id: 'notif_007', userId: 'user_002', userName: 'Maria Santos', title: 'Payment Reminder', message: 'Your mobile phone bill of ₱1,500 is due tomorrow. Ensure sufficient balance in Necessities jar.', type: 'warning', isRead: false, timestamp: '2024-12-03T08:00:00Z' },
  { id: 'notif_008', userId: 'user_002', userName: 'Maria Santos', title: 'Transaction Completed', message: 'Successfully deducted ₱800 from Play jar for movie tickets.', type: 'info', isRead: true, timestamp: '2024-12-03T19:05:00Z' },
  
  { id: 'notif_009', userId: 'user_003', userName: 'Pedro Reyes', title: 'Budget Exceeded', message: 'You\'ve exceeded your Education jar monthly budget by ₱500. Review your spending.', type: 'warning', isRead: false, timestamp: '2024-12-05T13:30:00Z' },
  { id: 'notif_010', userId: 'user_003', userName: 'Pedro Reyes', title: 'Income Received', message: 'Part-time job salary of ₱5,500 added to Education jar.', type: 'info', isRead: true, timestamp: '2024-12-02T08:05:00Z' },
  
  { id: 'notif_011', userId: 'user_006', userName: 'Sofia Rodriguez', title: 'Welcome to PMMS!', message: 'Welcome Sofia! Start your financial journey by distributing your first income across the 6 jars.', type: 'info', isRead: true, timestamp: '2024-12-01T14:00:00Z' },
  { id: 'notif_012', userId: 'user_006', userName: 'Sofia Rodriguez', title: 'First Income Added', message: 'Congratulations! You\'ve added your first salary of ₱22,000 to your account.', type: 'success', isRead: false, timestamp: '2024-12-06T10:05:00Z' },
  
  { id: 'notif_013', userId: 'user_007', userName: 'Roberto Diaz', title: 'Large Transaction Alert', message: 'You\'ve deducted ₱5,000 from Necessities jar for house rent. Current balance: ₱39,000.', type: 'info', isRead: false, timestamp: '2024-12-06T08:05:00Z' },
  { id: 'notif_014', userId: 'user_007', userName: 'Roberto Diaz', title: 'Auto-Distribution Active', message: 'Your salary auto-distribution is successfully configured for the 6 jars system.', type: 'success', isRead: true, timestamp: '2024-12-05T09:05:00Z' },
  
  { id: 'notif_015', userId: 'user_008', userName: 'Isabel Cruz', title: 'Scholarship Disbursed', message: 'Your scholarship of ₱3,000 has been added to Education jar.', type: 'info', isRead: true, timestamp: '2024-12-03T10:05:00Z' },
  { id: 'notif_016', userId: 'user_008', userName: 'Isabel Cruz', title: 'Course Payment Processed', message: 'Successfully paid ₱2,500 for online course from Education jar.', type: 'success', isRead: false, timestamp: '2024-12-05T14:05:00Z' },
  
  // Recent system-wide
  { id: 'notif_017', userId: 'all', userName: 'System', title: 'Security Update', message: 'We\'ve enhanced our security features. Please update your mobile app to the latest version.', type: 'warning', isRead: false, timestamp: '2024-12-07T18:00:00Z' },
  { id: 'notif_018', userId: 'all', userName: 'System', title: 'Holiday Budget Tips', message: 'The holiday season is here! Check out our guide for managing your budget during celebrations.', type: 'info', isRead: false, timestamp: '2024-12-07T12:00:00Z' },
];

// Dummy Activity Logs (Enhanced for PMMS)
export const dummyActivityLogs = [
  // Recent activities (sorted by most recent first)
  { id: 'log_001', actor: 'user_001', actorName: 'Juan Dela Cruz', action: 'transaction_create', description: 'Created pending charity donation transaction (₱500) in Give jar', timestamp: '2024-12-07T18:00:00Z', ipAddress: '192.168.1.101', device: 'mobile' },
  { id: 'log_002', actor: 'user_006', actorName: 'Sofia Rodriguez', action: 'transaction_create', description: 'Deducted ₱3,500 from Necessities jar for grocery shopping', timestamp: '2024-12-07T16:00:00Z', ipAddress: '192.168.1.106', device: 'mobile' },
  { id: 'log_003', actor: 'user_001', actorName: 'Juan Dela Cruz', action: 'session_login', description: 'User logged in via mobile app', timestamp: '2024-12-07T15:30:00Z', ipAddress: '192.168.1.101', device: 'mobile' },
  { id: 'log_004', actor: 'admin_001', actorName: 'Admin User', action: 'admin_login', description: 'Admin logged into admin panel', timestamp: '2024-12-07T14:00:00Z', ipAddress: '192.168.1.200', device: 'web' },
  { id: 'log_005', actor: 'user_007', actorName: 'Roberto Diaz', action: 'session_login', description: 'User logged in via web app', timestamp: '2024-12-07T13:00:00Z', ipAddress: '192.168.1.107', device: 'web' },
  
  { id: 'log_006', actor: 'user_006', actorName: 'Sofia Rodriguez', action: 'session_login', description: 'User logged in via mobile app', timestamp: '2024-12-07T09:00:00Z', ipAddress: '192.168.1.106', device: 'mobile' },
  { id: 'log_007', actor: 'user_001', actorName: 'Juan Dela Cruz', action: 'session_login', description: 'User logged in via web app', timestamp: '2024-12-07T08:15:00Z', ipAddress: '192.168.1.101', device: 'web' },
  { id: 'log_008', actor: 'user_002', actorName: 'Maria Santos', action: 'session_login', description: 'User logged in via mobile app', timestamp: '2024-12-07T07:30:00Z', ipAddress: '192.168.1.102', device: 'mobile' },
  { id: 'log_009', actor: 'user_007', actorName: 'Roberto Diaz', action: 'profile_update', description: 'Updated phone number in profile settings', timestamp: '2024-12-07T06:45:00Z', ipAddress: '192.168.1.107', device: 'web' },
  
  // December 6 activities
  { id: 'log_010', actor: 'user_007', actorName: 'Roberto Diaz', action: 'transaction_create', description: 'Deducted ₱5,000 from Necessities jar for house rent payment', timestamp: '2024-12-06T08:00:00Z', ipAddress: '192.168.1.107', device: 'web' },
  { id: 'log_011', actor: 'user_006', actorName: 'Sofia Rodriguez', action: 'income_add', description: 'Added first income of ₱22,000 to account', timestamp: '2024-12-06T10:00:00Z', ipAddress: '192.168.1.106', device: 'mobile' },
  { id: 'log_012', actor: 'user_001', actorName: 'Juan Dela Cruz', action: 'jar_transfer', description: 'Transferred ₱1,000 from Play jar to Long-term Savings jar', timestamp: '2024-12-06T11:00:00Z', ipAddress: '192.168.1.101', device: 'web' },
  { id: 'log_013', actor: 'user_008', actorName: 'Isabel Cruz', action: 'session_logout', description: 'User logged out from mobile app', timestamp: '2024-12-06T20:15:00Z', ipAddress: '192.168.1.108', device: 'mobile' },
  
  // December 5 activities
  { id: 'log_014', actor: 'user_001', actorName: 'Juan Dela Cruz', action: 'transaction_create', description: 'Deducted ₱2,500 from Education jar for online course enrollment', timestamp: '2024-12-05T14:00:00Z', ipAddress: '192.168.1.101', device: 'web' },
  { id: 'log_015', actor: 'user_008', actorName: 'Isabel Cruz', action: 'transaction_create', description: 'Paid ₱2,500 for online course from Education jar', timestamp: '2024-12-05T14:00:00Z', ipAddress: '192.168.1.108', device: 'mobile' },
  { id: 'log_016', actor: 'user_003', actorName: 'Pedro Reyes', action: 'transaction_create', description: 'Purchased textbooks for ₱3,000 from Education jar', timestamp: '2024-12-05T13:00:00Z', ipAddress: '192.168.1.103', device: 'mobile' },
  { id: 'log_017', actor: 'user_007', actorName: 'Roberto Diaz', action: 'income_distribution', description: 'Salary of ₱44,000 auto-distributed across 6 jars', timestamp: '2024-12-05T09:00:00Z', ipAddress: '192.168.1.107', device: 'web' },
  { id: 'log_018', actor: 'system', actorName: 'System', action: 'system_notification', description: 'Sent low balance warning to Juan Dela Cruz (Play jar)', timestamp: '2024-12-05T09:00:00Z', ipAddress: '127.0.0.1', device: 'system' },
  
  // December 4 activities
  { id: 'log_019', actor: 'user_001', actorName: 'Juan Dela Cruz', action: 'transaction_create', description: 'Spent ₱1,200 at restaurant from Play jar', timestamp: '2024-12-04T20:00:00Z', ipAddress: '192.168.1.101', device: 'mobile' },
  { id: 'log_020', actor: 'user_002', actorName: 'Maria Santos', action: 'transaction_create', description: 'Paid mobile phone bill ₱1,500 from Necessities jar', timestamp: '2024-12-04T10:30:00Z', ipAddress: '192.168.1.102', device: 'web' },
  
  // December 3 activities
  { id: 'log_021', actor: 'user_008', actorName: 'Isabel Cruz', action: 'income_add', description: 'Scholarship of ₱3,000 added to Education jar', timestamp: '2024-12-03T10:00:00Z', ipAddress: '192.168.1.108', device: 'web' },
  { id: 'log_022', actor: 'user_002', actorName: 'Maria Santos', action: 'transaction_create', description: 'Purchased movie tickets ₱800 from Play jar', timestamp: '2024-12-03T19:00:00Z', ipAddress: '192.168.1.102', device: 'mobile' },
  { id: 'log_023', actor: 'user_001', actorName: 'Juan Dela Cruz', action: 'transaction_create', description: 'Paid electric bill ₱800 from Necessities jar', timestamp: '2024-12-03T09:15:00Z', ipAddress: '192.168.1.101', device: 'web' },
  
  // December 2 activities
  { id: 'log_024', actor: 'user_001', actorName: 'Juan Dela Cruz', action: 'transaction_create', description: 'Grocery shopping ₱2,500 from Necessities jar', timestamp: '2024-12-02T15:30:00Z', ipAddress: '192.168.1.101', device: 'mobile' },
  { id: 'log_025', actor: 'user_003', actorName: 'Pedro Reyes', action: 'income_add', description: 'Part-time job salary ₱5,500 added to Education jar', timestamp: '2024-12-02T08:00:00Z', ipAddress: '192.168.1.103', device: 'mobile' },
  
  // December 1 activities
  { id: 'log_026', actor: 'user_001', actorName: 'Juan Dela Cruz', action: 'income_distribution', description: 'Monthly salary ₱50,000 auto-distributed across all 6 jars', timestamp: '2024-12-01T10:00:00Z', ipAddress: '192.168.1.101', device: 'web' },
  { id: 'log_027', actor: 'user_002', actorName: 'Maria Santos', action: 'income_add', description: 'Freelance project payment ₱16,500 added to account', timestamp: '2024-12-01T11:20:00Z', ipAddress: '192.168.1.102', device: 'web' },
  { id: 'log_028', actor: 'user_006', actorName: 'Sofia Rodriguez', action: 'account_created', description: 'New user account created via mobile app', timestamp: '2024-12-01T14:00:00Z', ipAddress: '192.168.1.106', device: 'mobile' },
  { id: 'log_029', actor: 'user_006', actorName: 'Sofia Rodriguez', action: 'jar_setup', description: 'Completed initial 6 jars setup with default percentages', timestamp: '2024-12-01T14:15:00Z', ipAddress: '192.168.1.106', device: 'mobile' },
  
  // Admin activities
  { id: 'log_030', actor: 'admin_001', actorName: 'Admin User', action: 'user_suspend', description: 'Suspended user account (user_005) due to policy violation', timestamp: '2024-12-01T09:00:00Z', ipAddress: '192.168.1.200', device: 'web' },
  { id: 'log_031', actor: 'admin_001', actorName: 'Admin User', action: 'system_backup', description: 'Initiated daily system backup', timestamp: '2024-12-07T02:00:00Z', ipAddress: '127.0.0.1', device: 'system' },
  { id: 'log_032', actor: 'system', actorName: 'System', action: 'auto_distribution', description: 'Executed scheduled income auto-distribution for 5 users', timestamp: '2024-12-01T00:00:00Z', ipAddress: '127.0.0.1', device: 'system' },
];

// Analytics Data
export const getAnalyticsData = () => {
  const today = new Date();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();

  const newUsersToday = dummyUsers.filter(u => {
    const created = new Date(u.createdAt);
    return created.toDateString() === today.toDateString();
  }).length;

  const newUsersThisWeek = dummyUsers.filter(u => {
    const created = new Date(u.createdAt);
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    return created >= weekAgo;
  }).length;

  const newUsersThisMonth = dummyUsers.filter(u => {
    const created = new Date(u.createdAt);
    return created.getMonth() === thisMonth && created.getFullYear() === thisYear;
  }).length;

  const activeUsers = dummyUsers.filter(u => u.status === 'active').length;
  const inactiveUsers = dummyUsers.filter(u => u.status === 'inactive').length;
  const suspendedUsers = dummyUsers.filter(u => u.status === 'suspended').length;

  const totalJars = dummyJars.length;
  const totalTransactions = dummyTransactions.length;
  const totalBalance = dummyUsers.reduce((sum, u) => sum + u.totalBalance, 0);
  const totalIncome = dummyUsers.reduce((sum, u) => sum + u.totalIncome, 0);

  // User growth chart data (last 6 months) - with realistic growth visualization
  const userGrowthData = [];
  const baseUsers = 45; // Starting user count 6 months ago
  const growthPattern = [45, 142, 95, 68, 267, 198]; // Realistic growth pattern
  for (let i = 5; i >= 0; i--) {
    const date = new Date(thisYear, thisMonth - i, 1);
    const month = date.toLocaleString('default', { month: 'short' });
    userGrowthData.push({ month, users: growthPattern[5 - i] });
  }

  // Transaction volume data (last 7 days)
  const transactionVolumeData = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const count = dummyTransactions.filter(t => {
      const txnDate = new Date(t.date);
      return txnDate.toDateString() === date.toDateString();
    }).length;
    const amount = dummyTransactions
      .filter(t => new Date(t.date).toDateString() === date.toDateString())
      .reduce((sum, t) => sum + t.amount, 0);
    transactionVolumeData.push({ day, count, amount });
  }

  // Most used jars
  const jarUsage = {};
  dummyJars.forEach(jar => {
    if (!jarUsage[jar.name]) {
      jarUsage[jar.name] = 0;
    }
    jarUsage[jar.name]++;
  });
  const mostUsedJars = Object.entries(jarUsage).map(([name, count]) => ({ name, count }));

  return {
    userMetrics: {
      totalUsers: dummyUsers.length,
      newUsersToday,
      newUsersThisWeek,
      newUsersThisMonth,
      activeUsers,
      inactiveUsers,
      suspendedUsers,
    },
    financialMetrics: {
      totalJars,
      totalTransactions,
      totalBalance,
      totalIncome,
    },
    userGrowthData,
    transactionVolumeData,
    mostUsedJars,
  };
};

export default {
  dummyUsers,
  dummyJars,
  dummyTransactions,
  dummyNotifications,
  dummyActivityLogs,
  getAnalyticsData,
};
