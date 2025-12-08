import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  CircularProgress,
  Avatar,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Search as SearchIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Block as BlockIcon,
  CheckCircle as SuccessIcon,
  Cancel as FailedIcon,
  Warning as WarningIcon,
  Download as ExportIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { sessionLogs } from '../../data/adminData';

const SessionLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      setLogs(sessionLogs);
      setLoading(false);
    }, 800);
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ip.includes(searchQuery) ||
      log.device.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    return matchesSearch && matchesStatus && matchesAction;
  });

  // Stats
  const successCount = logs.filter((l) => l.status === 'success').length;
  const failedCount = logs.filter((l) => l.status === 'failed').length;
  const todayCount = logs.filter((l) => new Date(l.timestamp).toDateString() === new Date().toDateString()).length;
  const suspiciousCount = logs.filter((l) => l.status === 'failed' && l.reason?.includes('locked')).length;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString('en-PH', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'login': return <LoginIcon sx={{ fontSize: 16 }} />;
      case 'logout': return <LogoutIcon sx={{ fontSize: 16 }} />;
      default: return <LoginIcon sx={{ fontSize: 16 }} />;
    }
  };

  const columns = [
    {
      field: 'timestamp',
      headerName: 'Time',
      width: 140,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
          {formatDate(params.value)}
        </Typography>
      ),
    },
    {
      field: 'userName',
      headerName: 'User',
      width: 160,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ width: 28, height: 28, fontSize: '0.75rem', bgcolor: params.row.status === 'failed' ? '#f44336' : '#4caf50' }}>
            {params.value.charAt(0)}
          </Avatar>
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => (
        <Chip
          icon={getActionIcon(params.value)}
          label={params.value}
          size="small"
          color={params.value === 'login' ? 'primary' : 'default'}
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Chip
          icon={params.value === 'success' ? <SuccessIcon sx={{ fontSize: 14 }} /> : <FailedIcon sx={{ fontSize: 14 }} />}
          label={params.value}
          size="small"
          color={params.value === 'success' ? 'success' : 'error'}
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      field: 'ip',
      headerName: 'IP Address',
      width: 130,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'device',
      headerName: 'Device',
      width: 160,
    },
    {
      field: 'location',
      headerName: 'Location',
      width: 140,
    },
    {
      field: 'reason',
      headerName: 'Reason',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        params.value ? (
          <Typography variant="body2" color="error.main">
            {params.value}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">—</Typography>
        )
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Session Logs
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track user login activities, locations, and suspicious attempts
        </Typography>
      </Box>

      {/* Alert for suspicious activity */}
      {suspiciousCount > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }} icon={<WarningIcon />}>
          {suspiciousCount} account(s) have been locked due to multiple failed login attempts
        </Alert>
      )}

      {/* Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2, mb: 3 }}>
        <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
          <Typography variant="body2" color="text.secondary">Today's Sessions</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{todayCount}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SuccessIcon sx={{ color: 'success.main' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">Successful</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main' }}>{successCount}</Typography>
            </Box>
          </Box>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#ffebee' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FailedIcon sx={{ color: 'error.main' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">Failed</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'error.main' }}>{failedCount}</Typography>
            </Box>
          </Box>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: suspiciousCount > 0 ? '#fff3e0' : '#f5f5f5' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BlockIcon sx={{ color: suspiciousCount > 0 ? 'warning.main' : 'text.secondary' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">Locked</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: suspiciousCount > 0 ? 'warning.main' : 'text.primary' }}>
                {suspiciousCount}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search by user, IP, device..."
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
              <MenuItem value="success">Success</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Action</InputLabel>
            <Select value={actionFilter} onChange={(e) => setActionFilter(e.target.value)} label="Action">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="login">Login</MenuItem>
              <MenuItem value="logout">Logout</MenuItem>
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
          <Button size="small" startIcon={<ExportIcon />}>
            Export
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
            rows={filteredLogs}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            disableSelectionOnClick
            sx={{ border: 0 }}
            getRowClassName={(params) => (params.row.status === 'failed' ? 'error-row' : '')}
          />
        )}
      </Paper>
    </Box>
  );
};

export default SessionLogs;
