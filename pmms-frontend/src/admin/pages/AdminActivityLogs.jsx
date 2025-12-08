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
  Avatar,
  CircularProgress,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Search as SearchIcon,
  CloudDownload as DownloadIcon,
  Person as PersonIcon,
  Computer as SystemIcon,
  AdminPanelSettings as AdminIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  AccountBalance as TransactionIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Sync as SyncIcon,
} from '@mui/icons-material';
import { dummyActivityLogs } from '../data/dummyData';

const AdminActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [actorFilter, setActorFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  const [deviceFilter, setDeviceFilter] = useState('all');

  // Simulate loading data from backend
  useEffect(() => {
    const fetchLogs = () => {
      setTimeout(() => {
        setLogs(dummyActivityLogs);
        setLoading(false);
      }, 800);
    };

    fetchLogs();
  }, []);

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.actorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.includes(searchQuery);

    const matchesActor =
      actorFilter === 'all' ||
      (actorFilter === 'user' && log.actor.startsWith('user_')) ||
      (actorFilter === 'admin' && log.actor.startsWith('admin_')) ||
      (actorFilter === 'system' && log.actor === 'system');

    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesDevice = deviceFilter === 'all' || log.device === deviceFilter;

    return matchesSearch && matchesActor && matchesAction && matchesDevice;
  });

  // Calculate stats
  const totalLogs = logs.length;
  const userActions = logs.filter((l) => l.actor.startsWith('user_')).length;
  const adminActions = logs.filter((l) => l.actor.startsWith('admin_')).length;
  const systemActions = logs.filter((l) => l.actor === 'system').length;
  const todayLogs = logs.filter((l) => {
    const logDate = new Date(l.timestamp);
    const today = new Date();
    return logDate.toDateString() === today.toDateString();
  }).length;

  // Get action icon and color
  const getActionConfig = (action) => {
    const configs = {
      session_login: { icon: <LoginIcon />, color: '#2e7d32', label: 'Login' },
      session_logout: { icon: <LogoutIcon />, color: '#757575', label: 'Logout' },
      transaction_create: { icon: <TransactionIcon />, color: '#1976d2', label: 'Transaction' },
      income_add: { icon: <AddIcon />, color: '#2e7d32', label: 'Income' },
      income_distribution: { icon: <SyncIcon />, color: '#9c27b0', label: 'Distribution' },
      jar_transfer: { icon: <SyncIcon />, color: '#ed6c02', label: 'Transfer' },
      jar_setup: { icon: <AddIcon />, color: '#0288d1', label: 'Setup' },
      profile_update: { icon: <EditIcon />, color: '#1976d2', label: 'Profile Update' },
      account_created: { icon: <PersonIcon />, color: '#2e7d32', label: 'Account Created' },
      admin_login: { icon: <AdminIcon />, color: '#d32f2f', label: 'Admin Login' },
      user_suspend: { icon: <DeleteIcon />, color: '#d32f2f', label: 'User Suspend' },
      system_backup: { icon: <SystemIcon />, color: '#757575', label: 'System Backup' },
      system_notification: { icon: <SystemIcon />, color: '#9c27b0', label: 'System Notif' },
      auto_distribution: { icon: <SyncIcon />, color: '#0288d1', label: 'Auto Dist' },
    };

    return configs[action] || { icon: <EditIcon />, color: '#757575', label: action };
  };

  // Get actor avatar
  const getActorAvatar = (actor, actorName) => {
    if (actor === 'system') {
      return (
        <Avatar sx={{ bgcolor: '#757575', width: 32, height: 32 }}>
          <SystemIcon fontSize="small" />
        </Avatar>
      );
    }

    if (actor.startsWith('admin_')) {
      return (
        <Avatar sx={{ bgcolor: '#d32f2f', width: 32, height: 32 }}>
          <AdminIcon fontSize="small" />
        </Avatar>
      );
    }

    return (
      <Avatar sx={{ bgcolor: '#1976d2', width: 32, height: 32 }}>
        {actorName.charAt(0).toUpperCase()}
      </Avatar>
    );
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-PH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // Get device chip
  const getDeviceChip = (device) => {
    const deviceConfig = {
      web: { color: '#1976d2', bgcolor: '#e3f2fd' },
      mobile: { color: '#2e7d32', bgcolor: '#e8f5e9' },
      system: { color: '#757575', bgcolor: '#f5f5f5' },
    };

    const config = deviceConfig[device] || deviceConfig.system;

    return (
      <Chip
        label={device}
        size="small"
        sx={{
          bgcolor: config.bgcolor,
          color: config.color,
          fontWeight: 500,
          textTransform: 'capitalize',
        }}
      />
    );
  };

  // DataGrid columns
  const columns = [
    {
      field: 'timestamp',
      headerName: 'Timestamp',
      width: 200,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>
          {formatTimestamp(params.value)}
        </Typography>
      ),
    },
    {
      field: 'actorName',
      headerName: 'Actor',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {getActorAvatar(params.row.actor, params.value)}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.85rem' }}>
              {params.value}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              {params.row.actor}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        const config = getActionConfig(params.value);
        return (
          <Chip
            icon={config.icon}
            label={config.label}
            size="small"
            sx={{
              bgcolor: `${config.color}15`,
              color: config.color,
              fontWeight: 500,
              '& .MuiChip-icon': {
                color: config.color,
              },
            }}
          />
        );
      },
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 350,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography variant="body2" noWrap sx={{ fontSize: '0.85rem' }}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: 'device',
      headerName: 'Device',
      width: 100,
      renderCell: (params) => getDeviceChip(params.value),
    },
    {
      field: 'ipAddress',
      headerName: 'IP Address',
      width: 140,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
          {params.value}
        </Typography>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Activity Logs
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Comprehensive audit trail of all system and user activities
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
        <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Total Logs
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {totalLogs}
          </Typography>
        </Paper>

        <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            User Actions
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main' }}>
            {userActions}
          </Typography>
        </Paper>

        <Paper sx={{ p: 2, bgcolor: '#ffebee' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Admin Actions
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'error.main' }}>
            {adminActions}
          </Typography>
        </Paper>

        <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            System Events
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {systemActions}
          </Typography>
        </Paper>

        <Paper sx={{ p: 2, bgcolor: '#f3e5f5' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Today's Activity
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {todayLogs}
          </Typography>
        </Paper>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Search by actor, description, action, or IP..."
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
            <InputLabel>Actor Type</InputLabel>
            <Select value={actorFilter} onChange={(e) => setActorFilter(e.target.value)} label="Actor Type">
              <MenuItem value="all">All Actors</MenuItem>
              <MenuItem value="user">Users</MenuItem>
              <MenuItem value="admin">Admins</MenuItem>
              <MenuItem value="system">System</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Action</InputLabel>
            <Select value={actionFilter} onChange={(e) => setActionFilter(e.target.value)} label="Action">
              <MenuItem value="all">All Actions</MenuItem>
              <MenuItem value="session_login">Login</MenuItem>
              <MenuItem value="session_logout">Logout</MenuItem>
              <MenuItem value="transaction_create">Transaction</MenuItem>
              <MenuItem value="income_add">Income</MenuItem>
              <MenuItem value="income_distribution">Distribution</MenuItem>
              <MenuItem value="profile_update">Profile Update</MenuItem>
              <MenuItem value="jar_transfer">Jar Transfer</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Device</InputLabel>
            <Select value={deviceFilter} onChange={(e) => setDeviceFilter(e.target.value)} label="Device">
              <MenuItem value="all">All Devices</MenuItem>
              <MenuItem value="web">Web</MenuItem>
              <MenuItem value="mobile">Mobile</MenuItem>
              <MenuItem value="system">System</MenuItem>
            </Select>
          </FormControl>

          <Tooltip title="Export Logs">
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
            rows={filteredLogs}
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
              '& .MuiDataGrid-row': {
                '&:hover': {
                  backgroundColor: '#fafafa',
                },
              },
            }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default AdminActivityLogs;
