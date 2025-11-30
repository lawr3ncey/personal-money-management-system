import React, { useEffect, useState } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import { useTransactions } from '../hooks/useTransactions';
import { formatCurrency } from '../utils/formatters';
import { incomeService } from '../services';
import { useNotification } from '../contexts/NotificationContext';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import TransactionList from '../components/transactions/TransactionList';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { overview, loading: analyticsLoading } = useAnalytics();
  const { transactions, loading: transactionsLoading } = useTransactions({ limit: 5 });
  const { showSuccess, showError } = useNotification();
  const [trendData, setTrendData] = useState([]);
  const [distributing, setDistributing] = useState(false);

  useEffect(() => {
    // Simulate trend data - replace with actual API call
    if (overview) {
      const mockTrend = Array.from({ length: 6 }, (_, i) => ({
        month: new Date(Date.now() - (5 - i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
        balance: Math.random() * 50000 + 20000
      }));
      setTrendData(mockTrend);
    }
  }, [overview]);

  if (analyticsLoading) {
    return <Spinner size="lg" className="my-12" />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

      {/* Income Distribution Form */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">💰 Distribute Income</h2>
          <form onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            // Strip commas from input (e.g., "15,000" -> "15000")
            const incomeValue = formData.get('income').replace(/,/g, '');
            const income = parseFloat(incomeValue);
            if (income > 0) {
              try {
                setDistributing(true);
                await incomeService.distributeIncome({ income });
                showSuccess(`₱${income.toFixed(2)} distributed successfully!`);
                e.target.reset();
                window.location.reload(); // Refresh to show new jars
              } catch (err) {
                showError(err.response?.data?.message || err.message);
              } finally {
                setDistributing(false);
              }
            }
          }}>
            <div className="flex gap-4">
              <Input
                type="number"
                name="income"
                step="0.01"
                placeholder="Enter your income amount (e.g., 10000)"
                required
                className="flex-1"
              />
              <Button type="submit" variant="primary" loading={distributing}>
                Distribute to 6 Jars
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              💚 55% Necessities | 💰 10% Financial Freedom | 📚 10% Education | 🏦 10% Long-Term | 🎉 10% Play | ❤️ 5% Give
            </p>
          </form>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-600 mb-1">Total Balance</p>
            <p className="text-2xl font-bold text-primary-600">
              {formatCurrency(overview?.totalBalance || 0)}
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-600 mb-1">Monthly Income</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(overview?.monthlyIncome || 0)}
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-600 mb-1">Monthly Expenses</p>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(overview?.monthlyExpenses || 0)}
            </p>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <p className="text-sm text-gray-600 mb-1">Active Jars</p>
            <p className="text-2xl font-bold text-gray-900">
              {overview?.jarCount || 0}
            </p>
          </div>
        </Card>
      </div>

      {/* Balance Trend Chart */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Balance Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#34c759" 
                strokeWidth={2}
                dot={{ fill: '#34c759', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          {transactionsLoading ? (
            <Spinner />
          ) : (
            <TransactionList 
              transactions={transactions} 
              loading={false}
              hasMore={false}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
