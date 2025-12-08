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
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  CheckCircle as ApproveIcon,
  Cancel as DenyIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { customCategories } from '../../data/adminData';
import { dummyUsers } from '../../data/dummyData';

const CustomCategoriesManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [confirmDialog, setConfirmDialog] = useState({ open: false, type: null, category: null });

  useEffect(() => {
    setTimeout(() => {
      setCategories(customCategories);
      setLoading(false);
    }, 800);
  }, []);

  const filteredCategories = categories.filter((cat) => {
    const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cat.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const totalCategories = categories.length;
  const approvedCount = categories.filter((c) => c.status === 'approved').length;
  const pendingCount = categories.filter((c) => c.status === 'pending').length;
  const deniedCount = categories.filter((c) => c.status === 'denied').length;
  const totalUsage = categories.reduce((sum, c) => sum + c.usageCount, 0);

  const handleApprove = (category) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === category.id ? { ...c, status: 'approved' } : c))
    );
    setConfirmDialog({ open: false, type: null, category: null });
  };

  const handleDeny = (category) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === category.id ? { ...c, status: 'denied', denyReason: 'Rejected by admin' } : c))
    );
    setConfirmDialog({ open: false, type: null, category: null });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'denied': return 'error';
      default: return 'default';
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-PH', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const columns = [
    {
      field: 'icon',
      headerName: '',
      width: 60,
      renderCell: (params) => (
        <Typography variant="h5">{params.value}</Typography>
      ),
    },
    {
      field: 'name',
      headerName: 'Category Name',
      width: 180,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 500 }}>{params.value}</Typography>
      ),
    },
    {
      field: 'userId',
      headerName: 'Created By',
      width: 160,
      renderCell: (params) => {
        const user = dummyUsers?.find((u) => u.id === params.value);
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: '#1976d2' }}>
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
            <Typography variant="body2">{user?.name || params.value}</Typography>
          </Box>
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={getStatusColor(params.value)}
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      field: 'usageCount',
      headerName: 'Usage',
      width: 100,
      renderCell: (params) => (
        <Chip label={`${params.value} uses`} size="small" variant="outlined" />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Created',
      width: 120,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
          {formatDate(params.value)}
        </Typography>
      ),
    },
    {
      field: 'denyReason',
      headerName: 'Notes',
      width: 180,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary" noWrap>
          {params.value || '-'}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 140,
      sortable: false,
      renderCell: (params) => (
        <Box>
          {params.row.status === 'pending' && (
            <>
              <Tooltip title="Approve">
                <IconButton
                  size="small"
                  color="success"
                  onClick={() => setConfirmDialog({ open: true, type: 'approve', category: params.row })}
                >
                  <ApproveIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Deny">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => setConfirmDialog({ open: true, type: 'deny', category: params.row })}
                >
                  <DenyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </>
          )}
          <Tooltip title="View">
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
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Custom Categories
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review and manage user-created spending categories
        </Typography>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 2, mb: 3 }}>
        <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
          <Typography variant="body2" color="text.secondary">Total</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{totalCategories}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
          <Typography variant="body2" color="text.secondary">Approved</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main' }}>{approvedCount}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#fff3e0' }}>
          <Typography variant="body2" color="text.secondary">Pending</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'warning.main' }}>{pendingCount}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#ffebee' }}>
          <Typography variant="body2" color="text.secondary">Denied</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'error.main' }}>{deniedCount}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#f3e5f5' }}>
          <Typography variant="body2" color="text.secondary">Total Usage</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{totalUsage}</Typography>
        </Paper>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search categories..."
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
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="denied">Denied</MenuItem>
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
            rows={filteredCategories}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25]}
            disableSelectionOnClick
            sx={{ border: 0 }}
          />
        )}
      </Paper>

      {/* Confirm Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, type: null, category: null })}
      >
        <DialogTitle>
          {confirmDialog.type === 'approve' ? 'Approve Category' : 'Deny Category'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {confirmDialog.type} the category "{confirmDialog.category?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, type: null, category: null })}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color={confirmDialog.type === 'approve' ? 'success' : 'error'}
            onClick={() => {
              confirmDialog.type === 'approve'
                ? handleApprove(confirmDialog.category)
                : handleDeny(confirmDialog.category);
            }}
          >
            {confirmDialog.type === 'approve' ? 'Approve' : 'Deny'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomCategoriesManager;
