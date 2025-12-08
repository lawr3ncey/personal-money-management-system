import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  CircularProgress,
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
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Download as ExportIcon,
} from '@mui/icons-material';
import { systemLogs } from '../../data/adminData';

const SystemLogsMonitor = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      setLogs(systemLogs);
      setLoading(false);
    }, 800);
  }, []);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    const matchesSource = sourceFilter === 'all' || log.source === sourceFilter;
    return matchesSearch && matchesLevel && matchesSource;
  });

  // Stats
  const infoCount = logs.filter((l) => l.level === 'info').length;
  const warningCount = logs.filter((l) => l.level === 'warning').length;
  const errorCount = logs.filter((l) => l.level === 'error').length;
  const sources = [...new Set(logs.map((l) => l.source))];

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString('en-PH', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'error': return <ErrorIcon sx={{ fontSize: 18 }} />;
      case 'warning': return <WarningIcon sx={{ fontSize: 18 }} />;
      case 'info': return <InfoIcon sx={{ fontSize: 18 }} />;
      default: return <InfoIcon sx={{ fontSize: 18 }} />;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'error': return '#d32f2f';
      case 'warning': return '#ed6c02';
      case 'info': return '#1976d2';
      default: return '#757575';
    }
  };

  const columns = [
    {
      field: 'timestamp',
      headerName: 'Timestamp',
      width: 160,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>
          {formatDate(params.value)}
        </Typography>
      ),
    },
    {
      field: 'level',
      headerName: 'Level',
      width: 100,
      renderCell: (params) => (
        <Chip
          icon={getLevelIcon(params.value)}
          label={params.value}
          size="small"
          sx={{
            bgcolor: `${getLevelColor(params.value)}15`,
            color: getLevelColor(params.value),
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        />
      ),
    },
    {
      field: 'source',
      headerName: 'Source',
      width: 100,
      renderCell: (params) => (
        <Chip label={params.value} size="small" variant="outlined" />
      ),
    },
    {
      field: 'message',
      headerName: 'Message',
      width: 250,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'details',
      headerName: 'Details',
      flex: 1,
      minWidth: 300,
      renderCell: (params) => (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          title={params.value}
        >
          {params.value}
        </Typography>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          System Logs
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Monitor API, database, and system events
        </Typography>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 2, mb: 3 }}>
        <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <InfoIcon sx={{ color: '#1976d2' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">Info</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{infoCount}</Typography>
            </Box>
          </Box>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#fff3e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarningIcon sx={{ color: '#ed6c02' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">Warnings</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'warning.main' }}>{warningCount}</Typography>
            </Box>
          </Box>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#ffebee' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ErrorIcon sx={{ color: '#d32f2f' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">Errors</Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'error.main' }}>{errorCount}</Typography>
            </Box>
          </Box>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
          <Typography variant="body2" color="text.secondary">Total Logs</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{logs.length}</Typography>
        </Paper>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search logs..."
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
            <InputLabel>Level</InputLabel>
            <Select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} label="Level">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="info">Info</MenuItem>
              <MenuItem value="warning">Warning</MenuItem>
              <MenuItem value="error">Error</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Source</InputLabel>
            <Select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} label="Source">
              <MenuItem value="all">All</MenuItem>
              {sources.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
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
            getRowClassName={(params) => {
              if (params.row.level === 'error') return 'error-row';
              if (params.row.level === 'warning') return 'warning-row';
              return '';
            }}
          />
        )}
      </Paper>
    </Box>
  );
};

export default SystemLogsMonitor;
