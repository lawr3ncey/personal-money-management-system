import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminAuthService from '../services/adminAuth.service';
import adminDataService from '../services/adminData.service';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';

const AdminDashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [jarStats, setJarStats] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const currentUser = adminAuthService.getCurrentUser();

  useEffect(() => {
    // Check authentication
    if (!adminAuthService.isAuthenticated()) {
      navigate('/admin', { replace: true });
      return;
    }

    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, usersData, transactionsData, jarsData] = await Promise.all([
        adminDataService.getDashboardStats(),
        adminDataService.getUsers(),
        adminDataService.getRecentTransactions(5),
        adminDataService.getJarStats()
      ]);

      setStats(statsData);
      setUsers(usersData);
      setRecentTransactions(transactionsData);
      setJarStats(jarsData);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    adminAuthService.logout();
    navigate('/admin', { replace: true });
  };

  const handleUserStatusToggle = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await adminDataService.updateUserStatus(userId, newStatus);
      loadDashboardData();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSearch = async () => {
    try {
      const results = await adminDataService.getUsers({ search: searchQuery });
      setUsers(results);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">👑</span>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm opacity-90">6 Jars Money Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm opacity-90">Logged in as</p>
                <p className="font-semibold">{currentUser?.name}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="secondary"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
              >
                🚪 Logout
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6">
            {['overview', 'users', 'transactions', 'jars'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-t-lg font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-purple-600'
                    : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Users</p>
                    <p className="text-3xl font-bold mt-1">{stats?.totalUsers}</p>
                    <p className="text-xs mt-1 opacity-75">{stats?.activeUsers} active</p>
                  </div>
                  <span className="text-5xl opacity-50">👥</span>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Balance</p>
                    <p className="text-3xl font-bold mt-1">{formatCurrency(stats?.totalBalance)}</p>
                    <p className="text-xs mt-1 opacity-75">All users</p>
                  </div>
                  <span className="text-5xl opacity-50">💰</span>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Transactions</p>
                    <p className="text-3xl font-bold mt-1">{stats?.totalTransactions}</p>
                    <p className="text-xs mt-1 opacity-75">Total recorded</p>
                  </div>
                  <span className="text-5xl opacity-50">💸</span>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Active Goals</p>
                    <p className="text-3xl font-bold mt-1">{stats?.activeGoals}</p>
                    <p className="text-xs mt-1 opacity-75">{stats?.completedGoals} completed</p>
                  </div>
                  <span className="text-5xl opacity-50">🎯</span>
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span>💸</span> Recent Transactions
                </h3>
                <div className="space-y-3">
                  {recentTransactions.map(txn => (
                    <div key={txn.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-sm">{txn.userName}</p>
                        <p className="text-xs text-gray-600">{txn.reason}</p>
                        <p className="text-xs text-gray-500">{formatDate(txn.date)}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${txn.type === 'add' ? 'text-green-600' : 'text-red-600'}`}>
                          {txn.type === 'add' ? '+' : '-'}{formatCurrency(txn.amount)}
                        </p>
                        <p className="text-xs text-gray-500">{txn.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span>🏺</span> Jar Distribution
                </h3>
                <div className="space-y-3">
                  {jarStats.map(jar => (
                    <div key={jar.id} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{jar.name}</span>
                        <span className="font-bold text-purple-600">{formatCurrency(jar.totalAmount)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                          style={{ width: `${jar.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {/* Search Bar */}
            <Card>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search users by name or email..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
                <Button onClick={handleSearch} variant="primary">
                  🔍 Search
                </Button>
                {searchQuery && (
                  <Button onClick={() => { setSearchQuery(''); loadDashboardData(); }} variant="secondary">
                    Clear
                  </Button>
                )}
              </div>
            </Card>

            {/* Users Table */}
            <Card>
              <h3 className="text-lg font-bold mb-4">User Management</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">User</th>
                      <th className="text-left py-3 px-4">Balance</th>
                      <th className="text-left py-3 px-4">Transactions</th>
                      <th className="text-left py-3 px-4">Joined</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-bold text-green-600">
                          {formatCurrency(user.totalBalance)}
                        </td>
                        <td className="py-3 px-4">{user.transactionCount}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {user.status === 'active' ? '✅ Active' : '⏸️ Inactive'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            onClick={() => handleUserStatusToggle(user.id, user.status)}
                            variant={user.status === 'active' ? 'danger' : 'primary'}
                            className="text-sm py-1 px-3"
                          >
                            {user.status === 'active' ? '🚫 Deactivate' : '✅ Activate'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <Card>
            <h3 className="text-lg font-bold mb-4">All Transactions</h3>
            <div className="space-y-3">
              {recentTransactions.map(txn => (
                <div key={txn.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold">{txn.userName}</p>
                    <p className="text-sm text-gray-600">{txn.reason}</p>
                    <p className="text-xs text-gray-500 mt-1">{txn.category} • {formatDate(txn.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold ${txn.type === 'add' ? 'text-green-600' : 'text-red-600'}`}>
                      {txn.type === 'add' ? '+' : '-'}{formatCurrency(txn.amount)}
                    </p>
                    <p className="text-xs text-gray-500">{txn.type === 'add' ? 'Income' : 'Expense'}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Jars Tab */}
        {activeTab === 'jars' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jarStats.map(jar => (
              <Card key={jar.id} className="bg-gradient-to-br from-purple-50 to-blue-50">
                <h3 className="text-lg font-bold mb-2">{jar.name}</h3>
                <p className="text-3xl font-bold text-purple-600 mb-2">{formatCurrency(jar.totalAmount)}</p>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Percentage: {jar.percentage}%</p>
                  <p>Active Users: {jar.userCount}</p>
                </div>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
                    style={{ width: `${jar.percentage}%` }}
                  />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
