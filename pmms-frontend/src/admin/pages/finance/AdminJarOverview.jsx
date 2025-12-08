import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
  Avatar,
  LinearProgress,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Search as SearchIcon,
  Visibility as ViewIcon,
  AccountBalanceWallet as JarIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { dummyJars, dummyUsers } from '../../data/dummyData';

// Combine jars with user data
const getEnrichedJars = () => {
  return dummyJars.map((jar) => {
    const user = dummyUsers.find((u) => u.id === jar.userId);
    return {
      ...jar,
      userName: user?.name || 'Unknown User',
      userEmail: user?.email || '',
    };
  });
};

const AdminJarOverview = () => {
  const [jars, setJars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [jarTypeFilter, setJarTypeFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      setJars(getEnrichedJars());
      setLoading(false);
    }, 800);
  }, []);

  const filteredJars = jars.filter((jar) => {
    const matchesSearch =
      jar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      jar.userName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = jarTypeFilter === 'all' || jar.name === jarTypeFilter;
    return matchesSearch && matchesType;
  });

  // Stats
  const totalBalance = jars.reduce((sum, j) => sum + j.balance, 0);
  const avgBalance = jars.length > 0 ? totalBalance / jars.length : 0;
  const jarTypes = [...new Set(jars.map((j) => j.name))];

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || isNaN(amount)) return '₱0';
    return `₱${Number(amount).toLocaleString()}`;
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 80) return '#d32f2f';
    if (percentage >= 50) return '#ed6c02';
    return '#2e7d32';
  };

  const columns = [
    {
      field: 'userName',
      headerName: 'User',
      width: 180,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 28, height: 28, fontSize: '0.8rem', bgcolor: '#1976d2' }}>
            {params.value.charAt(0)}
          </Avatar>
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'name',
      headerName: 'Jar Type',
      width: 150,
      renderCell: (params) => (
        <Chip
          icon={<JarIcon sx={{ fontSize: 16 }} />}
          label={params.value}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: 'balance',
      headerName: 'Balance',
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
          {formatCurrency(params.value)}
        </Typography>
      ),
    },
    {
      field: 'percentage',
      headerName: 'Allocation',
      width: 100,
      renderCell: (params) => (
        <Typography variant="body2">{params.value}%</Typography>
      ),
    },
    {
      field: 'monthlyBudget',
      headerName: 'Monthly Budget',
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2">{formatCurrency(params.value || 0)}</Typography>
      ),
    },
    {
      field: 'spent',
      headerName: 'Spent',
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" color="error.main">
          {formatCurrency(params.value || 0)}
        </Typography>
      ),
    },
    {
      field: 'usage',
      headerName: 'Usage',
      width: 150,
      renderCell: (params) => {
        const budget = params.row.monthlyBudget || 1;
        const spent = params.row.spent || 0;
        const usage = Math.min((spent / budget) * 100, 100);
        return (
          <Box sx={{ width: '100%' }}>
            <LinearProgress
              variant="determinate"
              value={usage}
              sx={{
                height: 8,
                borderRadius: 4,
                bgcolor: '#f0f0f0',
                '& .MuiLinearProgress-bar': {
                  bgcolor: getUsageColor(usage),
                },
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {usage.toFixed(0)}% used
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 80,
      sortable: false,
      renderCell: () => (
        <Tooltip title="View Details">
          <IconButton size="small" color="primary">
            <ViewIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Jar Overview
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Monitor all jars across all users in the PMMS system
        </Typography>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
        <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
          <Typography variant="body2" color="text.secondary">Total Jars</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{jars.length}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
          <Typography variant="body2" color="text.secondary">Total Balance</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main' }}>{formatCurrency(totalBalance)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#f3e5f5' }}>
          <Typography variant="body2" color="text.secondary">Average Balance</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{formatCurrency(avgBalance)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#fff3e0' }}>
          <Typography variant="body2" color="text.secondary">Jar Types</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{jarTypes.length}</Typography>
        </Paper>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search by user or jar type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Jar Type</InputLabel>
            <Select value={jarTypeFilter} onChange={(e) => setJarTypeFilter(e.target.value)} label="Jar Type">
              <MenuItem value="all">All Types</MenuItem>
              {jarTypes.map((t) => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ flex: 1 }} />

          <Button
            size="small"
            startIcon={<RefreshIcon />}
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 500);
            }}
          >
            Refresh
          </Button>
        </Box>
      </Paper>

      {/* Table */}
      <Paper sx={{ height: 500, width: '100%' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={filteredJars}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            sx={{ border: 0 }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default AdminJarOverview;
