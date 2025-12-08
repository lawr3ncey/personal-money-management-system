import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  IconButton,
  Chip,
  MenuItem,
  Typography,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { useAdmin } from '../context/AdminContext';
import UserDetailModal from '../components/UserDetailModal';
import UserFormModal from '../components/UserFormModal';

const UserManagement = () => {
  const {
    users,
    searchUsers,
    filterUsers,
    updateUserStatus,
    deleteUser,
    exportUsersCSV,
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Filter and search users
  const filteredUsers = useMemo(() => {
    let result = users;
    
    // Apply search
    if (searchQuery) {
      result = searchUsers(searchQuery);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = filterUsers({ status: statusFilter });
    }
    
    return result;
  }, [users, searchQuery, statusFilter, searchUsers, filterUsers]);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setDetailModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormModalOpen(true);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setFormModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

  const handleToggleStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    updateUserStatus(userId, newStatus);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      renderCell: (params) => (
        <Typography variant="caption" color="text.secondary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 180,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      width: 140,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value.toUpperCase()}
          size="small"
          color={
            params.value === 'active'
              ? 'success'
              : params.value === 'inactive'
              ? 'default'
              : 'error'
          }
        />
      ),
    },
    {
      field: 'totalBalance',
      headerName: 'Balance',
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
          {formatCurrency(params.value)}
        </Typography>
      ),
    },
    {
      field: 'transactionCount',
      headerName: 'Transactions',
      width: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'createdAt',
      headerName: 'Joined',
      width: 120,
      renderCell: (params) => (
        <Typography variant="caption" color="text.secondary">
          {new Date(params.value).toLocaleDateString()}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="View Details">
            <IconButton
              size="small"
              color="info"
              onClick={() => handleViewUser(params.row)}
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit User">
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEditUser(params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={params.row.status === 'active' ? 'Suspend' : 'Activate'}>
            <IconButton
              size="small"
              color={params.row.status === 'active' ? 'warning' : 'success'}
              onClick={() => handleToggleStatus(params.row.id, params.row.status)}
            >
              {params.row.status === 'active' ? (
                <BlockIcon fontSize="small" />
              ) : (
                <CheckCircleIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete User">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDeleteUser(params.row.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          User Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={exportUsersCSV}
          >
            Export CSV
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </Box>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Search"
            placeholder="Name, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{ minWidth: 300 }}
          />
          <TextField
            select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            size="small"
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="suspended">Suspended</MenuItem>
          </TextField>
        </Box>
      </Paper>

      {/* DataGrid */}
      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          checkboxSelection
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        />
      </Paper>

      {/* Modals */}
      <UserDetailModal
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        user={selectedUser}
      />
      
      <UserFormModal
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        user={editingUser}
      />
    </Box>
  );
};

export default UserManagement;
