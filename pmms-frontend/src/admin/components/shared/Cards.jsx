import React from 'react';
import { Paper, Typography, Box, Chip, LinearProgress, Avatar, Tooltip } from '@mui/material';
import { TrendingUp, TrendingDown, TrendingFlat } from '@mui/icons-material';

// Stat Card - Main summary cards
export const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  color = '#1976d2',
  bgColor,
  trend,
  trendValue,
}) => {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />;
    if (trend === 'down') return <TrendingDown sx={{ fontSize: 16, color: 'error.main' }} />;
    return <TrendingFlat sx={{ fontSize: 16, color: 'text.secondary' }} />;
  };

  return (
    <Paper
      sx={{
        p: 2.5,
        bgcolor: bgColor || `${color}10`,
        border: '1px solid',
        borderColor: `${color}30`,
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700, color }}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
          {trend && trendValue && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
              {getTrendIcon()}
              <Typography
                variant="caption"
                sx={{ color: trend === 'up' ? 'success.main' : trend === 'down' ? 'error.main' : 'text.secondary' }}
              >
                {trendValue}
              </Typography>
            </Box>
          )}
        </Box>
        {icon && (
          <Avatar sx={{ bgcolor: color, width: 48, height: 48 }}>
            {icon}
          </Avatar>
        )}
      </Box>
    </Paper>
  );
};

// Mini Stat Card
export const MiniStatCard = ({ title, value, color = '#1976d2' }) => (
  <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: `${color}10` }}>
    <Typography variant="h5" sx={{ fontWeight: 700, color }}>
      {value}
    </Typography>
    <Typography variant="caption" color="text.secondary">
      {title}
    </Typography>
  </Paper>
);

// Progress Card with bar
export const ProgressCard = ({ title, current, target, color = '#1976d2', subtitle }) => {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {percentage.toFixed(0)}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 4,
          bgcolor: `${color}20`,
          '& .MuiLinearProgress-bar': { bgcolor: color, borderRadius: 4 },
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
        <Typography variant="caption" color="text.secondary">
          ₱{current.toLocaleString()}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          ₱{target.toLocaleString()}
        </Typography>
      </Box>
      {subtitle && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
          {subtitle}
        </Typography>
      )}
    </Paper>
  );
};

// Status Card
export const StatusCard = ({ title, status, details, icon, lastCheck }) => {
  const statusColors = {
    healthy: '#2e7d32',
    warning: '#ed6c02',
    error: '#d32f2f',
    inactive: '#757575',
  };

  const color = statusColors[status] || statusColors.inactive;

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <Avatar sx={{ bgcolor: `${color}20`, color, width: 36, height: 36 }}>
          {icon}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2">{title}</Typography>
          <Chip
            label={status}
            size="small"
            sx={{
              bgcolor: `${color}20`,
              color,
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          />
        </Box>
      </Box>
      {details && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
          {details}
        </Typography>
      )}
      {lastCheck && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
          Last check: {new Date(lastCheck).toLocaleString()}
        </Typography>
      )}
    </Paper>
  );
};

// Info Row
export const InfoRow = ({ label, value, color }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75 }}>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 500, color: color || 'text.primary' }}>
      {value}
    </Typography>
  </Box>
);

export default {
  StatCard,
  MiniStatCard,
  ProgressCard,
  StatusCard,
  InfoRow,
};
