import React from 'react';
import { Box, Paper, Typography, Avatar, Chip } from '@mui/material';
import {
  People as UsersIcon,
  Receipt as TransactionsIcon,
  Repeat as RecurringIcon,
  Category as CategoryIcon,
  Assessment as ReportsIcon,
  CheckCircle as HealthyIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

// Dummy stats data
const summaryStats = {
  totalUsers: 8,
  activeUsers: 6,
  totalTransactions: 356,
  transactionsToday: 12,
  recurringItems: 12,
  activeRecurring: 10,
  customCategories: 7,
  pendingCategories: 2,
  monthlyReports: 4,
  reportsThisMonth: 1,
  systemHealth: 'healthy',
  apiStatus: 'operational',
};

const SummaryCards = () => {
  const cards = [
    {
      title: 'Total Users',
      value: summaryStats.totalUsers,
      subtitle: `${summaryStats.activeUsers} active`,
      icon: <UsersIcon />,
      color: '#1976d2',
      trend: '+1 this week',
    },
    {
      title: 'Total Transactions',
      value: summaryStats.totalTransactions,
      subtitle: `${summaryStats.transactionsToday} today`,
      icon: <TransactionsIcon />,
      color: '#2e7d32',
      trend: '+12 today',
    },
    {
      title: 'Recurring Items',
      value: summaryStats.recurringItems,
      subtitle: `${summaryStats.activeRecurring} active`,
      icon: <RecurringIcon />,
      color: '#9c27b0',
      trend: 'All on schedule',
    },
    {
      title: 'Custom Categories',
      value: summaryStats.customCategories,
      subtitle: `${summaryStats.pendingCategories} pending`,
      icon: <CategoryIcon />,
      color: '#ed6c02',
      trend: '2 need review',
    },
    {
      title: 'Monthly Reports',
      value: summaryStats.monthlyReports,
      subtitle: `${summaryStats.reportsThisMonth} this month`,
      icon: <ReportsIcon />,
      color: '#0288d1',
      trend: 'Up to date',
    },
    {
      title: 'System Health',
      value: summaryStats.systemHealth === 'healthy' ? 'Healthy' : 'Issues',
      subtitle: summaryStats.apiStatus,
      icon: summaryStats.systemHealth === 'healthy' ? <HealthyIcon /> : <WarningIcon />,
      color: summaryStats.systemHealth === 'healthy' ? '#2e7d32' : '#d32f2f',
      trend: '99.9% uptime',
    },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 2,
      }}
    >
      {cards.map((card, index) => (
        <Paper
          key={index}
          sx={{
            p: 2.5,
            bgcolor: `${card.color}08`,
            border: '1px solid',
            borderColor: `${card.color}20`,
            transition: 'all 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 2,
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                {card.title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: card.color }}>
                {card.value}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {card.subtitle}
              </Typography>
            </Box>
            <Avatar
              sx={{
                bgcolor: `${card.color}20`,
                color: card.color,
                width: 48,
                height: 48,
              }}
            >
              {card.icon}
            </Avatar>
          </Box>
          <Chip
            label={card.trend}
            size="small"
            sx={{
              mt: 1.5,
              bgcolor: `${card.color}15`,
              color: card.color,
              fontSize: '0.7rem',
            }}
          />
        </Paper>
      ))}
    </Box>
  );
};

export default SummaryCards;
