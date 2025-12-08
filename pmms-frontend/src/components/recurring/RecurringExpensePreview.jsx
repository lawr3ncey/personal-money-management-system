import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 🔴 DUMMY DATA - Replace with Supabase queries later
const DUMMY_RECURRING_ITEMS = [
  {
    id: 1,
    name: 'Electric Bill',
    amount: 2500,
    frequency: 'monthly',
    jar: 'Necessities',
    category: 'Utilities',
    nextDueDate: '2025-01-05',
    startDate: '2024-01-01',
    status: 'active',
    isAutomatic: false,
    dayOfMonth: 5
  },
  {
    id: 2,
    name: 'Internet Bill',
    amount: 1699,
    frequency: 'monthly',
    jar: 'Necessities',
    category: 'Utilities',
    nextDueDate: '2025-01-10',
    startDate: '2024-03-01',
    status: 'active',
    isAutomatic: true,
    dayOfMonth: 10
  },
  {
    id: 3,
    name: 'Netflix Subscription',
    amount: 549,
    frequency: 'monthly',
    jar: 'Play',
    category: 'Entertainment',
    nextDueDate: '2025-01-15',
    startDate: '2024-06-01',
    status: 'active',
    isAutomatic: true,
    dayOfMonth: 15
  },
  {
    id: 4,
    name: 'Car Insurance',
    amount: 15000,
    frequency: 'yearly',
    jar: 'Necessities',
    category: 'Insurance',
    nextDueDate: '2025-06-15',
    startDate: '2024-06-15',
    status: 'active',
    isAutomatic: false,
    dayOfMonth: 15
  },
  {
    id: 5,
    name: 'Gym Membership',
    amount: 2500,
    frequency: 'monthly',
    jar: 'Necessities',
    category: 'Health',
    nextDueDate: '2025-01-20',
    startDate: '2024-01-01',
    status: 'paused',
    isAutomatic: true,
    dayOfMonth: 20
  },
  {
    id: 6,
    name: 'Spotify Premium',
    amount: 149,
    frequency: 'monthly',
    jar: 'Play',
    category: 'Entertainment',
    nextDueDate: '2025-01-18',
    startDate: '2024-01-01',
    status: 'active',
    isAutomatic: true,
    dayOfMonth: 18
  },
  {
    id: 7,
    name: 'Water Bill',
    amount: 800,
    frequency: 'monthly',
    jar: 'Necessities',
    category: 'Utilities',
    nextDueDate: '2025-01-08',
    startDate: '2024-01-01',
    status: 'active',
    isAutomatic: false,
    dayOfMonth: 8
  },
  {
    id: 8,
    name: 'Amazon Prime',
    amount: 2400,
    frequency: 'yearly',
    jar: 'Play',
    category: 'Entertainment',
    nextDueDate: '2025-03-20',
    startDate: '2024-03-20',
    status: 'active',
    isAutomatic: true,
    dayOfMonth: 20
  },
];

const JAR_CONFIG = {
  'Necessities': { icon: '🏠', color: '#3B82F6' },
  'Financial Freedom': { icon: '💰', color: '#10B981' },
  'Education': { icon: '📚', color: '#8B5CF6' },
  'Long-term Savings': { icon: '🎯', color: '#F59E0B' },
  'Play': { icon: '🎮', color: '#EC4899' },
  'Give': { icon: '❤️', color: '#EF4444' },
};

const RecurringExpensePreview = () => {
  const [recurringItems, setRecurringItems] = useState(DUMMY_RECURRING_ITEMS);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState('upcoming'); // upcoming, annual, timeline

  // 🔴 TODO: Replace with actual Supabase query
  // const { data: recurringItems } = useQuery('recurringItems', fetchRecurringItems);
  // const { mutate: updateRecurringItem } = useMutation(updateItem);

  const formatCurrency = (value) => {
    return `₱${value.toLocaleString()}`;
  };

  const getFrequencyMultiplier = (frequency) => {
    switch (frequency) {
      case 'monthly': return 12;
      case 'quarterly': return 4;
      case 'yearly': return 1;
      case 'weekly': return 52;
      default: return 12;
    }
  };

  const calculateAnnualCost = (item) => {
    return item.amount * getFrequencyMultiplier(item.frequency);
  };

  const calculateTotalAnnualCost = () => {
    return recurringItems
      .filter(item => item.status === 'active')
      .reduce((sum, item) => sum + calculateAnnualCost(item), 0);
  };

  const calculateMonthlyAverage = () => {
    return Math.round(calculateTotalAnnualCost() / 12);
  };

  const getUpcomingItems = () => {
    const today = new Date();
    const next30Days = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    return recurringItems
      .filter(item => {
        if (item.status !== 'active') return false;
        const dueDate = new Date(item.nextDueDate);
        return dueDate >= today && dueDate <= next30Days;
      })
      .sort((a, b) => new Date(a.nextDueDate) - new Date(b.nextDueDate));
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>;
      case 'paused':
        return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Paused</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Cancelled</span>;
      default:
        return null;
    }
  };

  const toggleItemStatus = (itemId) => {
    setRecurringItems(recurringItems.map(item => {
      if (item.id === itemId) {
        const newStatus = item.status === 'active' ? 'paused' : 'active';
        return { ...item, status: newStatus };
      }
      return item;
    }));
    // 🔴 TODO: Update in Supabase
  };

  const deleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this recurring item?')) {
      setRecurringItems(recurringItems.filter(item => item.id !== itemId));
      // 🔴 TODO: Delete from Supabase
    }
  };

  // Generate annual projection chart data
  const generateAnnualProjection = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = months.map((month, index) => {
      let monthTotal = 0;
      
      recurringItems.filter(item => item.status === 'active').forEach(item => {
        if (item.frequency === 'monthly') {
          monthTotal += item.amount;
        } else if (item.frequency === 'yearly') {
          const dueMonth = new Date(item.nextDueDate).getMonth();
          if (dueMonth === index) {
            monthTotal += item.amount;
          }
        } else if (item.frequency === 'quarterly') {
          if (index % 3 === 0) {
            monthTotal += item.amount;
          }
        }
      });

      return {
        month,
        amount: monthTotal,
        monthIndex: index
      };
    });

    return data;
  };

  const filteredItems = selectedFilter === 'all' 
    ? recurringItems 
    : recurringItems.filter(item => item.jar === selectedFilter);

  const upcomingItems = getUpcomingItems();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">🔄 Recurring Expense Preview</h2>
        <p className="text-purple-100">Track and manage your recurring payments across all jars</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Total Annual Cost</div>
          <div className="text-3xl font-bold text-purple-600">{formatCurrency(calculateTotalAnnualCost())}</div>
          <div className="text-xs text-gray-500 mt-1">All recurring items</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Monthly Average</div>
          <div className="text-3xl font-bold text-blue-600">{formatCurrency(calculateMonthlyAverage())}</div>
          <div className="text-xs text-gray-500 mt-1">Per month</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Active Items</div>
          <div className="text-3xl font-bold text-green-600">
            {recurringItems.filter(item => item.status === 'active').length}
          </div>
          <div className="text-xs text-gray-500 mt-1">Currently active</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Due in 30 Days</div>
          <div className="text-3xl font-bold text-orange-600">{upcomingItems.length}</div>
          <div className="text-xs text-gray-500 mt-1">Upcoming payments</div>
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('upcoming')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              viewMode === 'upcoming'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📅 Upcoming (30 Days)
          </button>
          <button
            onClick={() => setViewMode('annual')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              viewMode === 'annual'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📊 Annual Projection
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              viewMode === 'timeline'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📋 All Items
          </button>
        </div>
      </div>

      {/* Upcoming View */}
      {viewMode === 'upcoming' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">💳 Due in Next 30 Days</h3>
          {upcomingItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🎉</div>
              <p>No recurring payments due in the next 30 days!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingItems.map(item => {
                const daysUntil = getDaysUntilDue(item.nextDueDate);
                const jarConfig = JAR_CONFIG[item.jar];
                const isUrgent = daysUntil <= 7;

                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg border-2 ${
                      isUrgent ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-3xl">{jarConfig.icon}</span>
                        <div>
                          <div className="font-semibold text-gray-800">{item.name}</div>
                          <div className="text-sm text-gray-600">
                            {item.category} • {item.jar}
                            {item.isAutomatic && <span className="ml-2 text-green-600">🤖 Auto-pay</span>}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Due: {new Date(item.nextDueDate).toLocaleDateString()} 
                            <span className={isUrgent ? 'text-red-600 font-semibold ml-2' : 'text-gray-600 ml-2'}>
                              ({daysUntil} {daysUntil === 1 ? 'day' : 'days'})
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-800">{formatCurrency(item.amount)}</div>
                        <div className="text-xs text-gray-500">{item.frequency}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Annual Projection View */}
      {viewMode === 'annual' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">📊 Annual Projection</h3>
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={generateAnnualProjection()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  name="Recurring Expenses"
                  dot={{ fill: '#8b5cf6', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Annual Breakdown by Jar */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {Object.entries(JAR_CONFIG).map(([jarName, config]) => {
              const jarItems = recurringItems.filter(item => item.jar === jarName && item.status === 'active');
              const jarAnnualTotal = jarItems.reduce((sum, item) => sum + calculateAnnualCost(item), 0);

              if (jarAnnualTotal === 0) return null;

              return (
                <div key={jarName} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{config.icon}</span>
                    <span className="font-semibold text-gray-800">{jarName}</span>
                  </div>
                  <div className="text-2xl font-bold" style={{ color: config.color }}>
                    {formatCurrency(jarAnnualTotal)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {jarItems.length} {jarItems.length === 1 ? 'item' : 'items'} • {formatCurrency(Math.round(jarAnnualTotal / 12))}/mo
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All Items Timeline View */}
      {viewMode === 'timeline' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">📋 All Recurring Items</h3>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
              ➕ Add New Item
            </button>
          </div>

          {/* Filter by Jar */}
          <div className="mb-4 flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedFilter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {Object.entries(JAR_CONFIG).map(([jarName, config]) => (
              <button
                key={jarName}
                onClick={() => setSelectedFilter(jarName)}
                className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${
                  selectedFilter === jarName
                    ? 'text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                style={selectedFilter === jarName ? { backgroundColor: config.color } : {}}
              >
                <span>{config.icon}</span>
                <span>{jarName}</span>
              </button>
            ))}
          </div>

          {/* Items List */}
          <div className="space-y-3">
            {filteredItems.map(item => {
              const jarConfig = JAR_CONFIG[item.jar];
              const annualCost = calculateAnnualCost(item);

              return (
                <div key={item.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-3xl">{jarConfig.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">{item.name}</span>
                          {getStatusBadge(item.status)}
                          {item.isAutomatic && <span className="text-sm text-green-600">🤖</span>}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          <span style={{ color: jarConfig.color }} className="font-semibold">{item.jar}</span>
                          {' • '}
                          {item.category}
                          {' • '}
                          Next: {new Date(item.nextDueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right mr-4">
                      <div className="text-xl font-bold text-gray-800">{formatCurrency(item.amount)}</div>
                      <div className="text-xs text-gray-500">{item.frequency}</div>
                      <div className="text-xs text-purple-600 font-semibold mt-1">
                        {formatCurrency(annualCost)}/year
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleItemStatus(item.id)}
                      className={`px-3 py-1 text-sm rounded-lg transition ${
                        item.status === 'active'
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : 'bg-green-100 text-green-800 hover:bg-green-200'
                      }`}
                    >
                      {item.status === 'active' ? '⏸️ Pause' : '▶️ Resume'}
                    </button>
                    <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition">
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Impact on Jars */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold mb-4">💡 Impact on Your Jars</h3>
        <p className="text-gray-700 mb-4">
          Your recurring expenses affect your jar balances. Here's the monthly breakdown:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(JAR_CONFIG).map(([jarName, config]) => {
            const jarMonthlyTotal = recurringItems
              .filter(item => item.jar === jarName && item.status === 'active' && item.frequency === 'monthly')
              .reduce((sum, item) => sum + item.amount, 0);

            if (jarMonthlyTotal === 0) return null;

            return (
              <div key={jarName} className="bg-white p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{config.icon}</span>
                  <span className="text-sm font-semibold text-gray-700">{jarName}</span>
                </div>
                <div className="text-xl font-bold" style={{ color: config.color }}>
                  {formatCurrency(jarMonthlyTotal)}
                </div>
                <div className="text-xs text-gray-500 mt-1">monthly recurring</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Implementation Notes */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">🔧 Implementation Notes (Developer):</h4>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
          <li>Replace DUMMY_RECURRING_ITEMS with Supabase 'recurring_items' table</li>
          <li>Implement automatic payment detection via bank API integration</li>
          <li>Add notifications 3 days before due date</li>
          <li>Create background job to automatically create transactions on due dates</li>
          <li>Implement edit modal for recurring items</li>
          <li>Add CSV export for recurring expense report</li>
          <li>Track actual vs expected payments and highlight discrepancies</li>
        </ul>
      </div>
    </div>
  );
};

export default RecurringExpensePreview;
