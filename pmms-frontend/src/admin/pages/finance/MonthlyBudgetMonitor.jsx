import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
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
  TrendingUp as IncomeIcon,
  TrendingDown as ExpenseIcon,
  Warning as WarningIcon,
  CheckCircle as SuccessIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { monthlyBudgets } from '../../data/adminData';

const MonthlyBudgetMonitor = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [monthFilter, setMonthFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      setBudgets(monthlyBudgets);
      setLoading(false);
    }, 800);
  }, []);

  const filteredBudgets = budgets.filter((b) => {
    const matchesSearch = b.userName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMonth = monthFilter === 'all' || b.month === monthFilter;
    return matchesSearch && matchesMonth;
  });

  // Stats
  const totalIncome = budgets.reduce((sum, b) => sum + b.totalIncome, 0);
  const totalExpense = budgets.reduce((sum, b) => sum + b.totalExpense, 0);
  const totalSavings = budgets.reduce((sum, b) => sum + b.savings, 0);
  const overspendingCount = budgets.filter((b) => b.overspending).length;
  const totalLimitHits = budgets.reduce((sum, b) => sum + b.limitHits, 0);

  const formatCurrency = (amount) => `₱${amount.toLocaleString()}`;

  const months = [...new Set(budgets.map((b) => b.month))];

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
      field: 'month',
      headerName: 'Month',
      width: 120,
      renderCell: (params) => (
        <Chip label={params.value} size="small" variant="outlined" />
      ),
    },
    {
      field: 'totalIncome',
      headerName: 'Income',
      width: 130,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IncomeIcon sx={{ fontSize: 16, color: 'success.main' }} />
          <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 500 }}>
            {formatCurrency(params.value)}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'totalExpense',
      headerName: 'Expense',
      width: 130,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <ExpenseIcon sx={{ fontSize: 16, color: 'error.main' }} />
          <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 500 }}>
            {formatCurrency(params.value)}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'savings',
      headerName: 'Savings',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 600, color: '#1976d2' }}>
          {formatCurrency(params.value)}
        </Typography>
      ),
    },
    {
      field: 'savingsRate',
      headerName: 'Savings Rate',
      width: 140,
      renderCell: (params) => {
        const rate = (params.row.savings / params.row.totalIncome) * 100;
        const color = rate >= 20 ? '#2e7d32' : rate >= 10 ? '#ed6c02' : '#d32f2f';
        return (
          <Box sx={{ width: '100%' }}>
            <LinearProgress
              variant="determinate"
              value={Math.min(rate, 100)}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: '#f0f0f0',
                '& .MuiLinearProgress-bar': { bgcolor: color },
              }}
            />
            <Typography variant="caption" sx={{ color }}>{rate.toFixed(1)}%</Typography>
          </Box>
        );
      },
    },
    {
      field: 'limitHits',
      headerName: 'Limit Hits',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={params.value > 2 ? 'error' : params.value > 0 ? 'warning' : 'success'}
        />
      ),
    },
    {
      field: 'overspending',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <Chip
          icon={params.value ? <WarningIcon sx={{ fontSize: 16 }} /> : <SuccessIcon sx={{ fontSize: 16 }} />}
          label={params.value ? 'Overspending' : 'On Track'}
          size="small"
          color={params.value ? 'error' : 'success'}
          variant="outlined"
        />
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Monthly Budget Monitor
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Aggregated monthly budget data across all users
        </Typography>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2, mb: 3 }}>
        <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
          <Typography variant="body2" color="text.secondary">Total Income</Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>{formatCurrency(totalIncome)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#ffebee' }}>
          <Typography variant="body2" color="text.secondary">Total Expense</Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'error.main' }}>{formatCurrency(totalExpense)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
          <Typography variant="body2" color="text.secondary">Total Savings</Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{formatCurrency(totalSavings)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#fff3e0' }}>
          <Typography variant="body2" color="text.secondary">Limit Hits</Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'warning.main' }}>{totalLimitHits}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: overspendingCount > 0 ? '#ffebee' : '#e8f5e9' }}>
          <Typography variant="body2" color="text.secondary">Overspending</Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: overspendingCount > 0 ? 'error.main' : 'success.main' }}>
            {overspendingCount} users
          </Typography>
        </Paper>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search by user..."
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
            <InputLabel>Month</InputLabel>
            <Select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} label="Month">
              <MenuItem value="all">All Months</MenuItem>
              {months.map((m) => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
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
      <Paper sx={{ height: 450, width: '100%' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={filteredBudgets}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25]}
            disableSelectionOnClick
            sx={{ border: 0 }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default MonthlyBudgetMonitor;
