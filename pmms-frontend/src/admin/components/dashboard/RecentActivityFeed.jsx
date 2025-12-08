import React from 'react';
import { Box, Paper, Typography, Avatar, Chip, Divider } from '@mui/material';
import {
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  AccountBalance as TransactionIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

// Dummy activity data
const dummyActivities = [
  {
    id: 1,
    type: 'login',
    user: 'Juan Dela Cruz',
    action: 'logged in',
    timestamp: '2024-12-07T15:30:00Z',
    icon: <LoginIcon />,
    color: '#2e7d32',
  },
  {
    id: 2,
    type: 'transaction',
    user: 'Maria Santos',
    action: 'added ₱5,000 to Savings jar',
    timestamp: '2024-12-07T15:25:00Z',
    icon: <TransactionIcon />,
    color: '#1976d2',
  },
  {
    id: 3,
    type: 'register',
    user: 'New User',
    action: 'created an account',
    timestamp: '2024-12-07T15:20:00Z',
    icon: <RegisterIcon />,
    color: '#9c27b0',
  },
  {
    id: 4,
    type: 'error',
    user: 'System',
    action: 'API rate limit exceeded',
    timestamp: '2024-12-07T15:15:00Z',
    icon: <ErrorIcon />,
    color: '#d32f2f',
  },
  {
    id: 5,
    type: 'warning',
    user: 'Pedro Reyes',
    action: 'exceeded Play jar budget',
    timestamp: '2024-12-07T15:10:00Z',
    icon: <WarningIcon />,
    color: '#ed6c02',
  },
  {
    id: 6,
    type: 'login',
    user: 'Roberto Diaz',
    action: 'logged in from mobile',
    timestamp: '2024-12-07T15:05:00Z',
    icon: <LoginIcon />,
    color: '#2e7d32',
  },
  {
    id: 7,
    type: 'transaction',
    user: 'Isabel Cruz',
    action: 'paid ₱2,500 for course',
    timestamp: '2024-12-07T15:00:00Z',
    icon: <TransactionIcon />,
    color: '#1976d2',
  },
  {
    id: 8,
    type: 'settings',
    user: 'Admin',
    action: 'updated system settings',
    timestamp: '2024-12-07T14:55:00Z',
    icon: <SettingsIcon />,
    color: '#757575',
  },
];

const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString();
};

const RecentActivityFeed = () => {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Recent Activity
      </Typography>

      <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
        {dummyActivities.map((activity, index) => (
          <Box key={activity.id}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                py: 1.5,
                '&:hover': { bgcolor: 'action.hover', borderRadius: 1 },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: `${activity.color}20`,
                  color: activity.color,
                  width: 36,
                  height: 36,
                }}
              >
                {activity.icon}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {activity.user}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {activity.action}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ whiteSpace: 'nowrap' }}>
                {formatTimeAgo(activity.timestamp)}
              </Typography>
            </Box>
            {index < dummyActivities.length - 1 && <Divider />}
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default RecentActivityFeed;
