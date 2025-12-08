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

// Dummy Transactions
export const dummyTransactions = [
  { id: 'txn_001', userId: 'user_001', userName: 'Juan Dela Cruz', jarId: 'jar_001', jarName: 'Necessities', type: 'add', amount: 5000, reason: 'Monthly salary', category: 'Income', date: '2024-12-01T10:00:00Z' },
  { id: 'txn_002', userId: 'user_001', userName: 'Juan Dela Cruz', jarId: 'jar_002', jarName: 'Necessities', type: 'subtract', amount: 500, reason: 'Groceries', category: 'Food', date: '2024-12-02T15:30:00Z' },
  { id: 'txn_003', userId: 'user_002', userName: 'Maria Santos', jarId: 'jar_007', jarName: 'Necessities', type: 'add', amount: 3000, reason: 'Freelance work', category: 'Income', date: '2024-12-01T11:20:00Z' },
  { id: 'txn_004', userId: 'user_002', userName: 'Maria Santos', jarId: 'jar_009', jarName: 'Play', type: 'subtract', amount: 800, reason: 'Movie tickets', category: 'Entertainment', date: '2024-12-03T19:00:00Z' },
  { id: 'txn_005', userId: 'user_003', userName: 'Pedro Reyes', jarId: 'jar_007', jarName: 'Education', type: 'add', amount: 1000, reason: 'Part-time job', category: 'Income', date: '2024-12-02T08:00:00Z' },
  { id: 'txn_006', userId: 'user_001', userName: 'Juan Dela Cruz', jarId: 'jar_003', jarName: 'Play', type: 'subtract', amount: 1200, reason: 'Restaurant', category: 'Food', date: '2024-12-04T20:00:00Z' },
  { id: 'txn_007', userId: 'user_007', userName: 'Roberto Diaz', jarId: 'jar_001', jarName: 'Necessities', type: 'add', amount: 8000, reason: 'Salary', category: 'Income', date: '2024-12-05T09:00:00Z' },
  { id: 'txn_008', userId: 'user_008', userName: 'Isabel Cruz', jarId: 'jar_002', jarName: 'Education', type: 'subtract', amount: 2500, reason: 'Online course', category: 'Education', date: '2024-12-05T14:00:00Z' },
  { id: 'txn_009', userId: 'user_006', userName: 'Sofia Rodriguez', jarId: 'jar_001', jarName: 'Necessities', type: 'add', amount: 4000, reason: 'New job salary', category: 'Income', date: '2024-12-06T10:00:00Z' },
  { id: 'txn_010', userId: 'user_001', userName: 'Juan Dela Cruz', jarId: 'jar_004', jarName: 'Long-term Savings', type: 'add', amount: 2000, reason: 'Investment returns', category: 'Income', date: '2024-12-07T08:00:00Z' },
];

// Dummy Notifications
export const dummyNotifications = [
  { id: 'notif_001', userId: 'user_001', title: 'Welcome to 6 Jars!', message: 'Start managing your money wisely', type: 'info', read: true, sentAt: '2024-01-15T10:35:00Z' },
  { id: 'notif_002', userId: 'user_001', title: 'Budget Alert', message: 'You have exceeded your Play jar budget', type: 'warning', read: true, sentAt: '2024-12-01T12:00:00Z' },
  { id: 'notif_003', userId: 'user_002', title: 'Goal Achieved!', message: 'Congratulations on reaching your savings goal!', type: 'success', read: false, sentAt: '2024-12-03T15:00:00Z' },
  { id: 'notif_004', userId: 'user_003', title: 'Payment Reminder', message: 'Rent payment is due tomorrow', type: 'warning', read: false, sentAt: '2024-12-06T09:00:00Z' },
  { id: 'notif_005', userId: 'all', title: 'System Maintenance', message: 'Scheduled maintenance on Dec 10', type: 'info', read: false, sentAt: '2024-12-07T07:00:00Z' },
];

// Dummy Activity Logs
export const dummyActivityLogs = [
  { id: 'log_001', userId: 'user_001', userName: 'Juan Dela Cruz', action: 'login', description: 'User logged in', timestamp: '2024-12-07T08:15:00Z', ipAddress: '192.168.1.1' },
  { id: 'log_002', userId: 'user_002', userName: 'Maria Santos', action: 'transaction', description: 'Added ₱3000 to Necessities jar', timestamp: '2024-12-07T07:30:00Z', ipAddress: '192.168.1.2' },
  { id: 'log_003', userId: 'user_007', userName: 'Roberto Diaz', action: 'update_profile', description: 'Updated phone number', timestamp: '2024-12-07T06:45:00Z', ipAddress: '192.168.1.3' },
  { id: 'log_004', userId: 'user_008', userName: 'Isabel Cruz', action: 'transaction', description: 'Subtracted ₱2500 from Education jar', timestamp: '2024-12-06T20:15:00Z', ipAddress: '192.168.1.4' },
  { id: 'log_005', userId: 'user_006', userName: 'Sofia Rodriguez', action: 'login', description: 'User logged in', timestamp: '2024-12-07T09:00:00Z', ipAddress: '192.168.1.5' },
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

  // User growth chart data (last 6 months)
  const userGrowthData = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date(thisYear, thisMonth - i, 1);
    const month = date.toLocaleString('default', { month: 'short' });
    const count = dummyUsers.filter(u => {
      const created = new Date(u.createdAt);
      return created <= date;
    }).length;
    userGrowthData.push({ month, users: count });
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
    totalUsers: dummyUsers.length,
    newUsersToday,
    newUsersThisWeek,
    newUsersThisMonth,
    activeUsers,
    inactiveUsers,
    suspendedUsers,
    totalJars,
    totalTransactions,
    totalBalance,
    totalIncome,
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
