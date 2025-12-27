import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
} from '@mui/material';
import {
  People as PeopleIcon,
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  LocalAtm as LocalAtmIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useAdmin } from '../context/AdminContext';

const COLORS = ['#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const StatCard = ({ title, value, icon, color, subtitle }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Avatar
          sx={{
            bgcolor: `${color}.light`,
            color: `${color}.main`,
            width: 56,
            height: 56,
          }}
        >
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const { analytics, activityLogs } = useAdmin();

  // Use analytics directly without extra state
  if (!analytics || !analytics.userMetrics) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Typography>Loading analytics...</Typography>
      </Box>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Monitor key metrics and system performance
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
        <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PeopleIcon sx={{ color: '#1976d2' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Users
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {analytics.userMetrics.totalUsers}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {analytics.userMetrics.activeUsers} active
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccountBalanceIcon sx={{ color: '#2e7d32' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Balance
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {formatCurrency(analytics.financialMetrics.totalBalance)}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalAtmIcon sx={{ color: '#1976d2' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Income
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {formatCurrency(analytics.financialMetrics.totalIncome)}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 2, bgcolor: '#fff3e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUpIcon sx={{ color: '#ed6c02' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Transactions
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {analytics.financialMetrics.totalTransactions}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                All time
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* User Stats Mini Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2, mb: 3 }}>
        <Paper sx={{ p: 2, bgcolor: '#e8f5e9', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#2e7d32' }}>
            {analytics.userMetrics.newUsersToday}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            New Today
          </Typography>
        </Paper>

        <Paper sx={{ p: 2, bgcolor: '#e3f2fd', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2' }}>
            {analytics.userMetrics.newUsersThisWeek}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            New This Week
          </Typography>
        </Paper>

        <Paper sx={{ p: 2, bgcolor: '#fff3e0', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#ed6c02' }}>
            {analytics.userMetrics.inactiveUsers}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Inactive
          </Typography>
        </Paper>

        <Paper sx={{ p: 2, bgcolor: '#ffebee', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#d32f2f' }}>
            {analytics.userMetrics.suspendedUsers}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Suspended
          </Typography>
        </Paper>
      </Box>

      {/* Charts */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 2, mb: 3 }}>
        {/* User Growth Chart */}
        <Box>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              User Growth (Last 6 Months)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analytics.userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#7c3aed"
                  strokeWidth={2}
                  name="Total Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Box>

        {/* Most Used Jars */}
        <Box>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Most Used Jars
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.mostUsedJars}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {analytics.mostUsedJars.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Box>

      {/* Transaction Volume */}
      <Box sx={{ mb: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Transaction Volume (Last 7 Days)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.transactionVolumeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" orientation="left" stroke="#7c3aed" />
                <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="count"
                  fill="#7c3aed"
                  name="Transaction Count"
                />
                <Bar
                  yAxisId="right"
                  dataKey="amount"
                  fill="#3b82f6"
                  name="Total Amount (₱)"
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
      </Box>

      {/* Recent Activity */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Recent Activity
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>IP Address</TableCell>
                <TableCell>Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activityLogs.slice(0, 10).map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.userName}</TableCell>
                  <TableCell>
                    <Chip
                      label={log.action.replace('_', ' ').toUpperCase()}
                      size="small"
                      color={
                        log.action === 'login'
                          ? 'success'
                          : log.action === 'transaction'
                          ? 'primary'
                          : 'default'
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{log.details}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="text.secondary">
                      {log.ipAddress}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(log.timestamp).toLocaleString()}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
