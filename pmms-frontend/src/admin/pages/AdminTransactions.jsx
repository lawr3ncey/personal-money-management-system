import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  InputAdornment,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as ViewIcon,
  CloudDownload as DownloadIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Pending as PendingIcon,
} from '@mui/icons-material';
import { dummyTransactions } from '../data/dummyData';

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');

  // Simulate loading data from backend
  useEffect(() => {
    const fetchTransactions = () => {
      setTimeout(() => {
        setTransactions(dummyTransactions);
        setLoading(false);
      }, 800); // Simulate API call
    };

    fetchTransactions();
  }, []);

  // Filter transactions
  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.jarName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'all' || txn.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || txn.method === methodFilter;

    return matchesSearch && matchesType && matchesStatus && matchesMethod;
  });

  // Calculate stats
  const totalTransactions = transactions.length;
  const completedCount = transactions.filter((t) => t.status === 'Completed').length;
  const pendingCount = transactions.filter((t) => t.status === 'Pending').length;
  const failedCount = transactions.filter((t) => t.status === 'Failed').length;
  const totalAmount = transactions
    .filter((t) => t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0);

  // Get status chip
  const getStatusChip = (status) => {
    const statusConfig = {
      Completed: { color: 'success', icon: <CheckIcon sx={{ fontSize: 16 }} /> },
      Pending: { color: 'warning', icon: <PendingIcon sx={{ fontSize: 16 }} /> },
      Failed: { color: 'error', icon: <CancelIcon sx={{ fontSize: 16 }} /> },
    };

    const config = statusConfig[status] || statusConfig.Completed;

    return (
      <Chip
        label={status}
        color={config.color}
        size="small"
        icon={config.icon}
        sx={{ fontWeight: 600 }}
      />
    );
  };

  // Get type chip
  const getTypeChip = (type) => {
    const typeColors = {
      income: 'success',
      deduction: 'error',
      transfer_in: 'info',
      transfer_out: 'warning',
    };

    return (
      <Chip
        label={type.replace('_', ' ')}
        color={typeColors[type] || 'default'}
        size="small"
        variant="outlined"
      />
    );
  };

  // Get method badge
  const getMethodBadge = (method) => {
    return (
      <Chip
        label={method}
        size="small"
        sx={{
          bgcolor: method === 'auto' ? '#e3f2fd' : '#f3e5f5',
          color: method === 'auto' ? '#1565c0' : '#6a1b9a',
          fontWeight: 500,
          textTransform: 'capitalize',
        }}
      />
    );
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // DataGrid columns
  const columns = [
    {
      field: 'id',
      headerName: 'Transaction ID',
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'userName',
      headerName: 'User',
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'jarName',
      headerName: 'Jar',
      width: 150,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 130,
      renderCell: (params) => getTypeChip(params.value),
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 130,
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: params.row.type === 'income' || params.row.type === 'transfer_in' ? 'success.main' : 'error.main',
          }}
        >
          {params.row.type === 'income' || params.row.type === 'transfer_in' ? '+' : '-'}
          {formatCurrency(params.value)}
        </Typography>
      ),
    },
    {
      field: 'reason',
      headerName: 'Reason',
      width: 200,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography variant="body2" noWrap>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 130,
    },
    {
      field: 'method',
      headerName: 'Method',
      width: 100,
      renderCell: (params) => getMethodBadge(params.value),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => getStatusChip(params.value),
    },
    {
      field: 'date',
      headerName: 'Date & Time',
      width: 180,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
          {formatDate(params.value)}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="View Details">
            <IconButton size="small" color="primary">
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Transactions
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Monitor all financial transactions across the PMMS system
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
        <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Total Transactions
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {totalTransactions}
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Completed
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main' }}>
            {completedCount}
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#fff3e0' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Pending
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'warning.main' }}>
            {pendingCount}
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#ffebee' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Failed
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'error.main' }}>
            {failedCount}
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#f3e5f5' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Total Amount
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {formatCurrency(totalAmount)}
          </Typography>
        </Paper>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Search by user, jar, reason, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{ flex: 1, minWidth: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Type</InputLabel>
            <Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} label="Type">
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="income">Income</MenuItem>
              <MenuItem value="deduction">Deduction</MenuItem>
              <MenuItem value="transfer_in">Transfer In</MenuItem>
              <MenuItem value="transfer_out">Transfer Out</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Failed">Failed</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Method</InputLabel>
            <Select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)} label="Method">
              <MenuItem value="all">All Methods</MenuItem>
              <MenuItem value="auto">Auto</MenuItem>
              <MenuItem value="manual">Manual</MenuItem>
            </Select>
          </FormControl>

          <Tooltip title="Export to CSV">
            <IconButton color="primary">
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      {/* Data Grid */}
      <Paper sx={{ height: 600, width: '100%' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={filteredTransactions}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50, 100]}
            disableSelectionOnClick
            sx={{
              border: 0,
              '& .MuiDataGrid-cell': {
                borderBottom: '1px solid #f0f0f0',
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',
                fontWeight: 600,
              },
            }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default AdminTransactions;
