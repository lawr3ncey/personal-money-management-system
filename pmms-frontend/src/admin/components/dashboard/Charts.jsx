import React from 'react';
import { Box, Paper, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
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
  AreaChart,
  Area,
} from 'recharts';

// Dummy data for User Growth
const userGrowthData = [
  { month: 'Jul', users: 2 },
  { month: 'Aug', users: 3 },
  { month: 'Sep', users: 4 },
  { month: 'Oct', users: 5 },
  { month: 'Nov', users: 7 },
  { month: 'Dec', users: 8 },
];

// User Growth Chart
export const UserGrowthChart = () => (
  <Paper sx={{ p: 2, height: '100%' }}>
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
      User Growth
    </Typography>
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={userGrowthData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="users" stroke="#1976d2" fill="#1976d220" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  </Paper>
);

// Most Used Jars Data
const jarUsageData = [
  { name: 'Necessities', value: 45, color: '#1976d2' },
  { name: 'Play', value: 25, color: '#9c27b0' },
  { name: 'Education', value: 12, color: '#2e7d32' },
  { name: 'Savings', value: 10, color: '#ed6c02' },
  { name: 'Give', value: 5, color: '#d32f2f' },
  { name: 'Freedom', value: 3, color: '#0288d1' },
];

// Most Used Jars Pie Chart
export const MostUsedJarsChart = () => (
  <Paper sx={{ p: 2, height: '100%' }}>
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
      Most Used Jars
    </Typography>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={jarUsageData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {jarUsageData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </Paper>
);

// Top Spending Categories Data
const categoryData = [
  { category: 'Food', amount: 45000 },
  { category: 'Housing', amount: 72000 },
  { category: 'Transport', amount: 12000 },
  { category: 'Entertainment', amount: 25000 },
  { category: 'Education', amount: 35000 },
  { category: 'Shopping', amount: 22000 },
];

// Top Spending Categories Chart
export const TopCategoriesChart = () => (
  <Paper sx={{ p: 2, height: '100%' }}>
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
      Top Spending Categories
    </Typography>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={categoryData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`} />
        <YAxis type="category" dataKey="category" width={80} />
        <Tooltip formatter={(v) => `₱${v.toLocaleString()}`} />
        <Bar dataKey="amount" fill="#1976d2" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </Paper>
);

// System Activity Data
const systemActivityData = {
  daily: [
    { time: '00:00', requests: 45 },
    { time: '04:00', requests: 12 },
    { time: '08:00', requests: 156 },
    { time: '12:00', requests: 234 },
    { time: '16:00', requests: 189 },
    { time: '20:00', requests: 145 },
  ],
  weekly: [
    { time: 'Mon', requests: 1245 },
    { time: 'Tue', requests: 1456 },
    { time: 'Wed', requests: 1367 },
    { time: 'Thu', requests: 1589 },
    { time: 'Fri', requests: 1823 },
    { time: 'Sat', requests: 2145 },
    { time: 'Sun', requests: 1234 },
  ],
  monthly: [
    { time: 'Week 1', requests: 8456 },
    { time: 'Week 2', requests: 9234 },
    { time: 'Week 3', requests: 8789 },
    { time: 'Week 4', requests: 10234 },
  ],
};

// System Activity Chart with Toggle
export const SystemActivityChart = () => {
  const [period, setPeriod] = React.useState('daily');

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          System Activity
        </Typography>
        <ToggleButtonGroup
          value={period}
          exclusive
          onChange={(e, v) => v && setPeriod(v)}
          size="small"
        >
          <ToggleButton value="daily">Daily</ToggleButton>
          <ToggleButton value="weekly">Weekly</ToggleButton>
          <ToggleButton value="monthly">Monthly</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={systemActivityData[period]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="requests" stroke="#9c27b0" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

// Jar Heatmap Data
const heatmapData = [
  { jar: 'Necessities', mon: 12, tue: 8, wed: 15, thu: 10, fri: 18, sat: 22, sun: 5 },
  { jar: 'Freedom', mon: 2, tue: 1, wed: 3, thu: 2, fri: 4, sat: 1, sun: 0 },
  { jar: 'Play', mon: 5, tue: 8, wed: 4, thu: 6, fri: 15, sat: 25, sun: 18 },
  { jar: 'Education', mon: 3, tue: 2, wed: 5, thu: 4, fri: 2, sat: 1, sun: 0 },
  { jar: 'Savings', mon: 1, tue: 0, wed: 2, thu: 1, fri: 3, sat: 0, sun: 0 },
  { jar: 'Give', mon: 1, tue: 0, wed: 1, thu: 0, fri: 2, sat: 3, sun: 5 },
];

const getHeatColor = (value) => {
  if (value === 0) return '#f5f5f5';
  if (value <= 3) return '#bbdefb';
  if (value <= 8) return '#64b5f6';
  if (value <= 15) return '#1976d2';
  return '#0d47a1';
};

// Jar Heatmap (Simple version without external lib)
export const JarHeatmap = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Jar Activity Heatmap
      </Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{ minWidth: 400 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', mb: 1 }}>
            <Box sx={{ width: 100 }} />
            {days.map((day) => (
              <Box key={day} sx={{ flex: 1, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  {day}
                </Typography>
              </Box>
            ))}
          </Box>
          {/* Rows */}
          {heatmapData.map((row) => (
            <Box key={row.jar} sx={{ display: 'flex', mb: 0.5 }}>
              <Box sx={{ width: 100, display: 'flex', alignItems: 'center' }}>
                <Typography variant="caption" noWrap>
                  {row.jar}
                </Typography>
              </Box>
              {dayKeys.map((day) => (
                <Box
                  key={day}
                  sx={{
                    flex: 1,
                    height: 28,
                    bgcolor: getHeatColor(row[day]),
                    borderRadius: 0.5,
                    mx: 0.25,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title={`${row.jar} - ${day}: ${row[day]} transactions`}
                >
                  <Typography variant="caption" sx={{ color: row[day] > 8 ? 'white' : 'text.secondary', fontSize: '0.65rem' }}>
                    {row[day] > 0 ? row[day] : ''}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default {
  UserGrowthChart,
  MostUsedJarsChart,
  TopCategoriesChart,
  SystemActivityChart,
  JarHeatmap,
};
