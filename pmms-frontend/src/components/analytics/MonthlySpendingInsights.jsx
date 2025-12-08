import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

// 🔴 DUMMY DATA - Replace with Supabase queries later
const DUMMY_MONTHLY_DATA = [
  { month: 'Jul', necessities: 18500, financial: 3500, education: 2800, longTerm: 3200, play: 3500, give: 1500 },
  { month: 'Aug', necessities: 19200, financial: 3800, education: 3100, longTerm: 3500, play: 3200, give: 1800 },
  { month: 'Sep', necessities: 17800, financial: 4200, education: 3500, longTerm: 4000, play: 3800, give: 1600 },
  { month: 'Oct', necessities: 20500, financial: 4500, education: 2900, longTerm: 3800, play: 4200, give: 2100 },
  { month: 'Nov', necessities: 19000, financial: 4000, education: 3200, longTerm: 4200, play: 3600, give: 1900 },
  { month: 'Dec', necessities: 21500, financial: 4800, education: 3400, longTerm: 4500, play: 5200, give: 2300 },
];

const DUMMY_CATEGORY_DATA = [
  { name: 'Food & Dining', value: 8500, color: '#3B82F6' },
  { name: 'Transportation', value: 3200, color: '#10B981' },
  { name: 'Bills & Utilities', value: 5800, color: '#F59E0B' },
  { name: 'Entertainment', value: 3500, color: '#EC4899' },
  { name: 'Shopping', value: 4200, color: '#8B5CF6' },
  { name: 'Healthcare', value: 2100, color: '#EF4444' },
  { name: 'Education', value: 3400, color: '#06B6D4' },
  { name: 'Others', value: 2800, color: '#6B7280' },
];

const DUMMY_TRENDS = [
  { category: 'Food & Dining', lastMonth: 7200, thisMonth: 8500, change: '+18%' },
  { category: 'Entertainment', lastMonth: 4100, thisMonth: 3500, change: '-15%' },
  { category: 'Bills & Utilities', lastMonth: 5500, thisMonth: 5800, change: '+5%' },
  { category: 'Shopping', lastMonth: 3800, thisMonth: 4200, change: '+11%' },
];

const MonthlySpendingInsights = () => {
  const [selectedMonth, setSelectedMonth] = useState('Dec');

  // 🔴 TODO: Replace with actual Supabase query
  // const { data: monthlyData } = useQuery('monthlySpending', fetchMonthlySpending);

  const formatCurrency = (value) => {
    return `₱${value.toLocaleString()}`;
  };

  const totalSpending = DUMMY_CATEGORY_DATA.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">💡 Monthly Spending Insights</h2>
        <p className="text-primary-100">Analyze your spending patterns and trends</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Total Spending</div>
          <div className="text-2xl font-bold text-primary-600">{formatCurrency(totalSpending)}</div>
          <div className="text-xs text-green-600 mt-1">↓ 8% vs last month</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Average Daily</div>
          <div className="text-2xl font-bold text-secondary-600">{formatCurrency(Math.round(totalSpending / 30))}</div>
          <div className="text-xs text-gray-500 mt-1">Based on 30 days</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Largest Category</div>
          <div className="text-2xl font-bold text-blue-600">Food</div>
          <div className="text-xs text-gray-500 mt-1">{formatCurrency(8500)} (26%)</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Transactions</div>
          <div className="text-2xl font-bold text-purple-600">142</div>
          <div className="text-xs text-green-600 mt-1">+12 vs last month</div>
        </div>
      </div>

      {/* 6-Month Trend Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">📊 6-Month Spending Trend by Jar</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={DUMMY_MONTHLY_DATA}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={formatCurrency} />
            <Legend />
            <Bar dataKey="necessities" stackId="a" fill="#3B82F6" name="Necessities" />
            <Bar dataKey="financial" stackId="a" fill="#10B981" name="Financial" />
            <Bar dataKey="education" stackId="a" fill="#8B5CF6" name="Education" />
            <Bar dataKey="longTerm" stackId="a" fill="#F59E0B" name="Long-term" />
            <Bar dataKey="play" stackId="a" fill="#EC4899" name="Play" />
            <Bar dataKey="give" stackId="a" fill="#EF4444" name="Give" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">🥧 Category Breakdown (December)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={DUMMY_CATEGORY_DATA}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {DUMMY_CATEGORY_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={formatCurrency} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">📋 Detailed Breakdown</h3>
          <div className="space-y-3">
            {DUMMY_CATEGORY_DATA.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-gray-700">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(category.value)}</div>
                  <div className="text-xs text-gray-500">
                    {((category.value / totalSpending) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trend Analysis */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">📈 Month-over-Month Trends</h3>
        <div className="space-y-4">
          {DUMMY_TRENDS.map((trend) => (
            <div key={trend.category} className="border-l-4 border-primary-500 pl-4 py-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-gray-800">{trend.category}</div>
                  <div className="text-sm text-gray-600">
                    Last month: {formatCurrency(trend.lastMonth)} → This month: {formatCurrency(trend.thisMonth)}
                  </div>
                </div>
                <div className={`text-lg font-bold ${
                  trend.change.startsWith('+') ? 'text-red-600' : 'text-green-600'
                }`}>
                  {trend.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span>🤖</span>
          <span>AI-Powered Insights</span>
        </h3>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="font-semibold text-blue-600 mb-1">💡 Spending Pattern</div>
            <p className="text-gray-700">You spend ₱8,500/month on Food & Dining, which is 18% more than last month. Consider meal prepping to save ₱2,000/month.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="font-semibold text-green-600 mb-1">✨ Good Job!</div>
            <p className="text-gray-700">Your Entertainment spending decreased by 15%! You saved ₱600 compared to last month.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="font-semibold text-orange-600 mb-1">⚠️ Watch Out</div>
            <p className="text-gray-700">Bills & Utilities increased by 5%. Your electricity bill is higher this month (₱2,100 vs ₱1,800).</p>
          </div>
        </div>
      </div>

      {/* Month Selector */}
      <div className="bg-white p-4 rounded-lg shadow">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Month to Analyze
        </label>
        <select 
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          {DUMMY_MONTHLY_DATA.map(m => (
            <option key={m.month} value={m.month}>{m.month} 2024</option>
          ))}
        </select>
        <p className="text-sm text-gray-500 mt-2">
          🔴 Currently showing dummy data. Will connect to Supabase for real transactions.
        </p>
      </div>

      {/* Implementation Notes */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">🔧 Implementation Notes (Developer):</h4>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
          <li>Replace DUMMY_MONTHLY_DATA with Supabase query aggregating transactions by month</li>
          <li>Replace DUMMY_CATEGORY_DATA with actual category totals from transactions table</li>
          <li>Calculate trends by comparing current month vs previous month data</li>
          <li>AI insights can be generated using OpenAI API based on spending patterns</li>
          <li>Add export to PDF/CSV functionality</li>
        </ul>
      </div>
    </div>
  );
};

export default MonthlySpendingInsights;
