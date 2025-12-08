/**
 * Admin Data Service
 * 
 * Provides dummy data for admin dashboard.
 * Data structure matches backend models.
 * 
 * 🔴 TODO: Replace with Supabase queries
 */

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Dummy data matching your backend models
const DUMMY_DATA = {
  users: [
    {
      id: 'user_001',
      name: 'Juan Dela Cruz',
      email: 'juan@example.com',
      avatar: '',
      settings: { currency: 'PHP', theme: 'light', notifications: true },
      createdAt: '2024-01-15T10:30:00Z',
      totalBalance: 45000,
      jarCount: 6,
      transactionCount: 142,
      status: 'active'
    },
    {
      id: 'user_002',
      name: 'Maria Santos',
      email: 'maria@example.com',
      avatar: '',
      settings: { currency: 'PHP', theme: 'dark', notifications: true },
      createdAt: '2024-02-20T14:20:00Z',
      totalBalance: 28000,
      jarCount: 6,
      transactionCount: 89,
      status: 'active'
    },
    {
      id: 'user_003',
      name: 'Pedro Reyes',
      email: 'pedro@example.com',
      avatar: '',
      settings: { currency: 'PHP', theme: 'light', notifications: false },
      createdAt: '2024-03-10T09:15:00Z',
      totalBalance: 12000,
      jarCount: 6,
      transactionCount: 34,
      status: 'active'
    },
    {
      id: 'user_004',
      name: 'Ana Garcia',
      email: 'ana@example.com',
      avatar: '',
      settings: { currency: 'PHP', theme: 'light', notifications: true },
      createdAt: '2024-11-05T16:45:00Z',
      totalBalance: 5000,
      jarCount: 6,
      transactionCount: 12,
      status: 'inactive'
    }
  ],

  transactions: [
    { id: 'txn_001', userId: 'user_001', jarId: 'jar_001', type: 'add', amount: 5000, reason: 'Monthly salary', category: 'Income', date: '2024-12-01T10:00:00Z' },
    { id: 'txn_002', userId: 'user_001', jarId: 'jar_002', type: 'subtract', amount: 500, reason: 'Groceries', category: 'Food', date: '2024-12-02T15:30:00Z' },
    { id: 'txn_003', userId: 'user_002', jarId: 'jar_001', type: 'add', amount: 3000, reason: 'Freelance work', category: 'Income', date: '2024-12-01T11:20:00Z' },
    { id: 'txn_004', userId: 'user_002', jarId: 'jar_003', type: 'subtract', amount: 800, reason: 'Movie tickets', category: 'Entertainment', date: '2024-12-03T19:00:00Z' },
    { id: 'txn_005', userId: 'user_003', jarId: 'jar_002', type: 'add', amount: 1000, reason: 'Part-time job', category: 'Income', date: '2024-12-02T08:00:00Z' }
  ],

  jars: [
    { id: 'jar_001', name: 'Necessities (55%)', percentage: 55, totalAmount: 41250, userCount: 4 },
    { id: 'jar_002', name: 'Education (10%)', percentage: 10, totalAmount: 7500, userCount: 4 },
    { id: 'jar_003', name: 'Play (10%)', percentage: 10, totalAmount: 7500, userCount: 4 },
    { id: 'jar_004', name: 'Long-term Savings (10%)', percentage: 10, totalAmount: 7500, userCount: 4 },
    { id: 'jar_005', name: 'Financial Freedom (10%)', percentage: 10, totalAmount: 7500, userCount: 4 },
    { id: 'jar_006', name: 'Give (5%)', percentage: 5, totalAmount: 3750, userCount: 4 }
  ],

  goals: [
    { id: 'goal_001', userId: 'user_001', name: 'Emergency Fund', targetAmount: 50000, currentAmount: 35000, status: 'in_progress', deadline: '2025-06-30' },
    { id: 'goal_002', userId: 'user_002', name: 'Laptop Purchase', targetAmount: 45000, currentAmount: 28000, status: 'in_progress', deadline: '2025-03-31' },
    { id: 'goal_003', userId: 'user_001', name: 'Vacation Fund', targetAmount: 30000, currentAmount: 30000, status: 'completed', deadline: '2024-12-01' }
  ],

  budgets: [
    { id: 'budget_001', userId: 'user_001', category: 'Food', amount: 8000, spent: 5200, month: '2024-12' },
    { id: 'budget_002', userId: 'user_001', category: 'Transportation', amount: 3000, spent: 2100, month: '2024-12' },
    { id: 'budget_003', userId: 'user_002', category: 'Food', amount: 6000, spent: 4800, month: '2024-12' }
  ],

  recurringItems: [
    { id: 'rec_001', userId: 'user_001', name: 'Netflix Subscription', amount: 549, frequency: 'monthly', jarId: 'jar_003', nextDate: '2024-12-15' },
    { id: 'rec_002', userId: 'user_001', name: 'Rent', amount: 10000, frequency: 'monthly', jarId: 'jar_001', nextDate: '2024-12-01' },
    { id: 'rec_003', userId: 'user_002', name: 'Gym Membership', amount: 1500, frequency: 'monthly', jarId: 'jar_002', nextDate: '2024-12-10' }
  ]
};

export const adminDataService = {
  /**
   * Get dashboard statistics
   */
  getDashboardStats: async () => {
    await delay();
    
    const totalUsers = DUMMY_DATA.users.length;
    const activeUsers = DUMMY_DATA.users.filter(u => u.status === 'active').length;
    const totalBalance = DUMMY_DATA.users.reduce((sum, u) => sum + u.totalBalance, 0);
    const totalTransactions = DUMMY_DATA.transactions.length;
    const totalGoals = DUMMY_DATA.goals.length;
    const completedGoals = DUMMY_DATA.goals.filter(g => g.status === 'completed').length;

    return {
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      totalBalance,
      totalTransactions,
      totalGoals,
      completedGoals,
      activeGoals: totalGoals - completedGoals,
      newUsersThisMonth: DUMMY_DATA.users.filter(u => {
        const createdDate = new Date(u.createdAt);
        const now = new Date();
        return createdDate.getMonth() === now.getMonth() && 
               createdDate.getFullYear() === now.getFullYear();
      }).length
    };
  },

  /**
   * Get all users with optional filters
   */
  getUsers: async (filters = {}) => {
    await delay();
    
    let users = [...DUMMY_DATA.users];
    
    if (filters.status) {
      users = users.filter(u => u.status === filters.status);
    }
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      users = users.filter(u => 
        u.name.toLowerCase().includes(search) || 
        u.email.toLowerCase().includes(search)
      );
    }
    
    return users;
  },

  /**
   * Get user by ID with details
   */
  getUserById: async (userId) => {
    await delay();
    
    const user = DUMMY_DATA.users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    
    const userTransactions = DUMMY_DATA.transactions.filter(t => t.userId === userId);
    const userGoals = DUMMY_DATA.goals.filter(g => g.userId === userId);
    const userBudgets = DUMMY_DATA.budgets.filter(b => b.userId === userId);
    
    return {
      ...user,
      transactions: userTransactions,
      goals: userGoals,
      budgets: userBudgets
    };
  },

  /**
   * Get recent transactions (all users)
   */
  getRecentTransactions: async (limit = 10) => {
    await delay();
    
    return DUMMY_DATA.transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit)
      .map(t => {
        const user = DUMMY_DATA.users.find(u => u.id === t.userId);
        return { ...t, userName: user?.name };
      });
  },

  /**
   * Get jar statistics
   */
  getJarStats: async () => {
    await delay();
    return DUMMY_DATA.jars;
  },

  /**
   * Get goals overview
   */
  getGoalsOverview: async () => {
    await delay();
    return DUMMY_DATA.goals.map(g => {
      const user = DUMMY_DATA.users.find(u => u.id === g.userId);
      return { ...g, userName: user?.name };
    });
  },

  /**
   * Get budgets overview
   */
  getBudgetsOverview: async () => {
    await delay();
    return DUMMY_DATA.budgets.map(b => {
      const user = DUMMY_DATA.users.find(u => u.id === b.userId);
      return { ...b, userName: user?.name };
    });
  },

  /**
   * Get recurring items overview
   */
  getRecurringItems: async () => {
    await delay();
    return DUMMY_DATA.recurringItems.map(r => {
      const user = DUMMY_DATA.users.find(u => u.id === r.userId);
      return { ...r, userName: user?.name };
    });
  },

  /**
   * Block/Unblock user
   */
  updateUserStatus: async (userId, status) => {
    await delay();
    
    const user = DUMMY_DATA.users.find(u => u.id === userId);
    if (!user) throw new Error('User not found');
    
    user.status = status;
    return { success: true, message: `User ${status === 'active' ? 'activated' : 'deactivated'}` };
  },

  /**
   * Delete user (soft delete in real implementation)
   */
  deleteUser: async (userId) => {
    await delay();
    
    const index = DUMMY_DATA.users.findIndex(u => u.id === userId);
    if (index === -1) throw new Error('User not found');
    
    DUMMY_DATA.users.splice(index, 1);
    return { success: true, message: 'User deleted successfully' };
  }
};

export default adminDataService;
