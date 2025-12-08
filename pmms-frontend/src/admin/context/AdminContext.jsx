import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  dummyUsers,
  dummyJars,
  dummyTransactions,
  dummyNotifications,
  dummyActivityLogs,
  getAnalyticsData,
} from '../data/dummyData';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [users, setUsers] = useState([...dummyUsers]);
  const [jars, setJars] = useState([...dummyJars]);
  const [transactions, setTransactions] = useState([...dummyTransactions]);
  const [notifications, setNotifications] = useState([...dummyNotifications]);
  const [activityLogs, setActivityLogs] = useState([...dummyActivityLogs]);
  const [analytics, setAnalytics] = useState(() => getAnalyticsData()); // Initialize immediately
  const [loading, setLoading] = useState(false);

  // Update analytics when users or transactions change
  useEffect(() => {
    setAnalytics(getAnalyticsData());
  }, [users, transactions]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('adminDarkMode', !darkMode);
  };

  // Load dark mode preference
  useEffect(() => {
    const savedMode = localStorage.getItem('adminDarkMode');
    if (savedMode === 'true') {
      setDarkMode(true);
    }
  }, []);

  // User Management
  const addUser = (userData) => {
    const newUser = {
      id: `user_${Date.now()}`,
      ...userData,
      createdAt: new Date().toISOString(),
      lastLogin: null,
      totalBalance: 0,
      totalIncome: 0,
      jarCount: 6,
      transactionCount: 0,
    };
    setUsers([...users, newUser]);
    return newUser;
  };

  const updateUser = (userId, updates) => {
    setUsers(users.map(u => u.id === userId ? { ...u, ...updates } : u));
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(u => u.id !== userId));
    setJars(jars.filter(j => j.userId !== userId));
    setTransactions(transactions.filter(t => t.userId !== userId));
  };

  const updateUserStatus = (userId, status) => {
    updateUser(userId, { status });
  };

  const resetUserPassword = (userId) => {
    // Dummy implementation
    console.log(`Password reset for user ${userId}`);
    return { success: true, message: 'Password reset link sent to user email' };
  };

  // Transaction Management
  const getUserTransactions = (userId) => {
    return transactions.filter(t => t.userId === userId);
  };

  const getUserJars = (userId) => {
    return jars.filter(j => j.userId === userId);
  };

  // Notification Management
  const sendNotification = (notificationData) => {
    const newNotification = {
      id: `notif_${Date.now()}`,
      ...notificationData,
      read: false,
      sentAt: new Date().toISOString(),
    };
    setNotifications([newNotification, ...notifications]);
    return newNotification;
  };

  const sendBulkNotification = (userIds, notificationData) => {
    const newNotifications = userIds.map(userId => ({
      id: `notif_${Date.now()}_${userId}`,
      userId,
      ...notificationData,
      read: false,
      sentAt: new Date().toISOString(),
    }));
    setNotifications([...newNotifications, ...notifications]);
    return newNotifications;
  };

  // Activity Log
  const addActivityLog = (log) => {
    const newLog = {
      id: `log_${Date.now()}`,
      ...log,
      timestamp: new Date().toISOString(),
    };
    setActivityLogs([newLog, ...activityLogs]);
  };

  // Search and Filter
  const searchUsers = (query) => {
    if (!query) return users;
    const lowerQuery = query.toLowerCase();
    return users.filter(u =>
      u.name.toLowerCase().includes(lowerQuery) ||
      u.email.toLowerCase().includes(lowerQuery) ||
      u.username.toLowerCase().includes(lowerQuery) ||
      u.phone.includes(query)
    );
  };

  const filterUsers = (filters) => {
    let filtered = [...users];
    
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(u => u.status === filters.status);
    }
    
    if (filters.dateFrom) {
      filtered = filtered.filter(u => new Date(u.createdAt) >= new Date(filters.dateFrom));
    }
    
    if (filters.dateTo) {
      filtered = filtered.filter(u => new Date(u.createdAt) <= new Date(filters.dateTo));
    }
    
    return filtered;
  };

  // Export Data
  const exportUsersCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Status', 'Balance', 'Created At'];
    const rows = users.map(u => [
      u.id,
      u.name,
      u.email,
      u.phone,
      u.status,
      u.totalBalance,
      u.createdAt
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportTransactionsCSV = (userId = null) => {
    const data = userId ? getUserTransactions(userId) : transactions;
    const headers = ['ID', 'User', 'Jar', 'Type', 'Amount', 'Category', 'Reason', 'Date'];
    const rows = data.map(t => [
      t.id,
      t.userName,
      t.jarName,
      t.type,
      t.amount,
      t.category,
      t.reason,
      t.date
    ]);
    
    const csvContent = [headers, ...rows]
      .map(row => row.join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${userId || 'all'}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const value = {
    darkMode,
    toggleDarkMode,
    users,
    jars,
    transactions,
    notifications,
    activityLogs,
    analytics,
    loading,
    setLoading,
    // User Management
    addUser,
    updateUser,
    deleteUser,
    updateUserStatus,
    resetUserPassword,
    searchUsers,
    filterUsers,
    // Transactions & Jars
    getUserTransactions,
    getUserJars,
    // Notifications
    sendNotification,
    sendBulkNotification,
    // Activity
    addActivityLog,
    // Export
    exportUsersCSV,
    exportTransactionsCSV,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
