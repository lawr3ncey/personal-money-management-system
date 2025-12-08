import React from 'react';
import { Box, Skeleton, Paper } from '@mui/material';

// Card Skeleton
export const CardSkeleton = ({ height = 120 }) => (
  <Paper sx={{ p: 2, height }}>
    <Skeleton variant="text" width="40%" height={24} />
    <Skeleton variant="text" width="60%" height={40} sx={{ mt: 1 }} />
    <Skeleton variant="text" width="30%" height={20} sx={{ mt: 1 }} />
  </Paper>
);

// Table Skeleton
export const TableSkeleton = ({ rows = 5, columns = 5 }) => (
  <Paper sx={{ p: 2 }}>
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      {[...Array(columns)].map((_, i) => (
        <Skeleton key={i} variant="text" width={`${100 / columns}%`} height={40} />
      ))}
    </Box>
    {[...Array(rows)].map((_, rowIndex) => (
      <Box key={rowIndex} sx={{ display: 'flex', gap: 2, mb: 1 }}>
        {[...Array(columns)].map((_, colIndex) => (
          <Skeleton key={colIndex} variant="text" width={`${100 / columns}%`} height={32} />
        ))}
      </Box>
    ))}
  </Paper>
);

// Chart Skeleton
export const ChartSkeleton = ({ height = 300 }) => (
  <Paper sx={{ p: 2 }}>
    <Skeleton variant="text" width="30%" height={32} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" width="100%" height={height} sx={{ borderRadius: 1 }} />
  </Paper>
);

// List Skeleton
export const ListSkeleton = ({ items = 5 }) => (
  <Paper sx={{ p: 2 }}>
    {[...Array(items)].map((_, i) => (
      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="40%" height={16} />
        </Box>
      </Box>
    ))}
  </Paper>
);

// Profile Skeleton
export const ProfileSkeleton = () => (
  <Paper sx={{ p: 3 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
      <Skeleton variant="circular" width={80} height={80} />
      <Box>
        <Skeleton variant="text" width={200} height={32} />
        <Skeleton variant="text" width={150} height={20} />
      </Box>
    </Box>
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
      {[...Array(6)].map((_, i) => (
        <Box key={i}>
          <Skeleton variant="text" width="40%" height={16} />
          <Skeleton variant="text" width="70%" height={24} />
        </Box>
      ))}
    </Box>
  </Paper>
);

// Stats Row Skeleton
export const StatsRowSkeleton = ({ count = 4 }) => (
  <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${count}, 1fr)`, gap: 2 }}>
    {[...Array(count)].map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </Box>
);

export default {
  CardSkeleton,
  TableSkeleton,
  ChartSkeleton,
  ListSkeleton,
  ProfileSkeleton,
  StatsRowSkeleton,
};
