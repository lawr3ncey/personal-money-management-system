import api from './api';

export const jarService = {
  getJars: async () => {
    const response = await api.get('/jars');
    return response.data.data?.jars || response.data.jars || [];
  },

  getJar: async (id) => {
    const response = await api.get(`/jars/${id}`);
    return response.data.data.jar;
  },

  createJar: async (jarData) => {
    const response = await api.post('/jars', jarData);
    return response.data.data.jar;
  },

  updateJar: async (id, jarData) => {
    const response = await api.put(`/jars/${id}`, jarData);
    return response.data.data.jar;
  },

  deleteJar: async (id) => {
    const response = await api.delete(`/jars/${id}`);
    return response.data;
  },

  adjustJar: async (id, adjustData) => {
    const response = await api.post(`/jars/${id}/adjust`, adjustData);
    return response.data;
  }
};

export const transactionService = {
  getTransactions: async (params = {}) => {
    const response = await api.get('/transactions', { params });
    return response.data.data?.transactions || response.data.transactions || [];
  },

  getJarTransactions: async (jarId, params = {}) => {
    const response = await api.get(`/transactions/jar/${jarId}`, { params });
    return response.data.data?.transactions || response.data.transactions || [];
  },

  deleteTransaction: async (id) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  }
};

export const incomeService = {
  distributeIncome: async (incomeData) => {
    const response = await api.post('/income/distribute', incomeData);
    return response.data;
  },

  getIncomeHistory: async (params = {}) => {
    const response = await api.get('/income', { params });
    return response.data;
  },

  getIncomeStats: async () => {
    const response = await api.get('/income/stats');
    return response.data.data.stats;
  }
};

export const budgetService = {
  getBudgets: async () => {
    const response = await api.get('/budgets');
    return response.data.data.budgets;
  },

  getCurrentBudget: async () => {
    const response = await api.get('/budgets/current');
    return response.data.data.budget;
  },

  createBudget: async (budgetData) => {
    const response = await api.post('/budgets', budgetData);
    return response.data.data.budget;
  },

  getBudgetProgress: async (id) => {
    const response = await api.get(`/budgets/${id}/progress`);
    return response.data.data;
  }
};

export const goalService = {
  getGoals: async (completed) => {
    const response = await api.get('/goals', { params: { completed } });
    return response.data.data.goals;
  },

  getGoal: async (id) => {
    const response = await api.get(`/goals/${id}`);
    return response.data.data.goal;
  },

  createGoal: async (goalData) => {
    const response = await api.post('/goals', goalData);
    return response.data.data.goal;
  },

  updateGoal: async (id, goalData) => {
    const response = await api.put(`/goals/${id}`, goalData);
    return response.data.data.goal;
  },

  deleteGoal: async (id) => {
    const response = await api.delete(`/goals/${id}`);
    return response.data;
  },

  contributeToGoal: async (id, contributionData) => {
    const response = await api.post(`/goals/${id}/contribute`, contributionData);
    return response.data;
  },

  getGoalProgress: async (id) => {
    const response = await api.get(`/goals/${id}/progress`);
    return response.data.data;
  }
};

export const analyticsService = {
  getOverview: async () => {
    const response = await api.get('/analytics/overview');
    return response.data.data;
  },

  getJarTrend: async (params = {}) => {
    const response = await api.get('/analytics/jars/trend', { params });
    return response.data.data.trend;
  },

  getSpendingBreakdown: async (params = {}) => {
    const response = await api.get('/analytics/spending', { params });
    return response.data.data.breakdown;
  },

  getCategoryTotals: async (params = {}) => {
    const response = await api.get('/analytics/categories', { params });
    return response.data.data.categories;
  },

  getComparison: async () => {
    const response = await api.get('/analytics/comparison');
    return response.data.data;
  }
};

export const exportService = {
  exportCSV: async (type = 'transactions') => {
    const response = await api.get('/export/csv', {
      params: { type },
      responseType: 'blob'
    });
    return response.data;
  },

  exportJSON: async () => {
    const response = await api.get('/export/json', {
      responseType: 'blob'
    });
    return response.data;
  },

  importData: async (data) => {
    const response = await api.post('/export/import', { data });
    return response.data;
  },

  resetData: async (confirm) => {
    const response = await api.post('/export/reset', { confirm });
    return response.data;
  }
};
