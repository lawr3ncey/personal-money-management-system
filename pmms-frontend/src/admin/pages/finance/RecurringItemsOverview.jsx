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
  Switch,
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
  Receipt as BillIcon,
  Pause as PauseIcon,
  PlayArrow as PlayIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { recurringItems } from '../../data/adminData';

const RecurringItemsOverview = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      setItems(recurringItems);
      setLoading(false);
    }, 800);
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.userName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Stats
  const totalRecurring = items.length;
  const activeItems = items.filter((i) => i.status === 'active').length;
  const pausedItems = items.filter((i) => i.status === 'paused').length;
  const incomeItems = items.filter((i) => i.type === 'income');
  const billItems = items.filter((i) => i.type === 'bill');
  const totalMonthlyIncome = incomeItems.reduce((sum, i) => sum + i.amount, 0);
  const totalMonthlyBills = billItems.reduce((sum, i) => sum + i.amount, 0);

  const formatCurrency = (amount) => `₱${amount.toLocaleString()}`;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-PH', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const columns = [
    {
      field: 'userName',
      headerName: 'User',
      width: 160,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 28, height: 28, fontSize: '0.8rem', bgcolor: '#1976d2' }}>
            {params.value.charAt(0)}
          </Avatar>
          <Typography variant="body2" noWrap>{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 100,
      renderCell: (params) => (
        <Chip
          icon={params.value === 'income' ? <IncomeIcon sx={{ fontSize: 16 }} /> : <BillIcon sx={{ fontSize: 16 }} />}
          label={params.value}
          size="small"
          color={params.value === 'income' ? 'success' : 'error'}
          variant="outlined"
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      field: 'name',
      headerName: 'Item Name',
      width: 180,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 500 }}>{params.value}</Typography>
      ),
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 120,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: params.row.type === 'income' ? 'success.main' : 'error.main' }}
        >
          {params.row.type === 'income' ? '+' : '-'}{formatCurrency(params.value)}
        </Typography>
      ),
    },
    {
      field: 'frequency',
      headerName: 'Frequency',
      width: 100,
      renderCell: (params) => (
        <Chip label={params.value} size="small" variant="outlined" sx={{ textTransform: 'capitalize' }} />
      ),
    },
    {
      field: 'jarName',
      headerName: 'Target Jar',
      width: 140,
    },
    {
      field: 'nextDate',
      headerName: 'Next Run',
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
          {formatDate(params.value)}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Chip
          icon={params.value === 'active' ? <PlayIcon sx={{ fontSize: 14 }} /> : <PauseIcon sx={{ fontSize: 14 }} />}
          label={params.value}
          size="small"
          color={params.value === 'active' ? 'success' : 'default'}
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 80,
      sortable: false,
      renderCell: () => (
        <Tooltip title="Edit">
          <IconButton size="small" color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Recurring Items
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage recurring income and bill schedules across all users
        </Typography>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2, mb: 3 }}>
        <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
          <Typography variant="body2" color="text.secondary">Total Recurring</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{totalRecurring}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
          <Typography variant="body2" color="text.secondary">Active</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main' }}>{activeItems}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
          <Typography variant="body2" color="text.secondary">Paused</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{pausedItems}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
          <Typography variant="body2" color="text.secondary">Monthly Income</Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>{formatCurrency(totalMonthlyIncome)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#ffebee' }}>
          <Typography variant="body2" color="text.secondary">Monthly Bills</Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'error.main' }}>{formatCurrency(totalMonthlyBills)}</Typography>
        </Paper>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search by user or item name..."
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

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Type</InputLabel>
            <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} label="Type">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="bill">Bill</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="paused">Paused</MenuItem>
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
            rows={filteredItems}
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

export default RecurringItemsOverview;
