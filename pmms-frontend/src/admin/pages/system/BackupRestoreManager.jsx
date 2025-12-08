import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  CloudDownload as DownloadIcon,
  Backup as BackupIcon,
  Restore as RestoreIcon,
  History as HistoryIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Schedule as ScheduleIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { backupHistory } from '../../data/adminData';

const BackupRestoreManager = () => {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setBackups(backupHistory);
      setLoading(false);
    }, 800);
  }, []);

  const handleCreateBackup = () => {
    setActionLoading(true);
    setTimeout(() => {
      setActionLoading(false);
      setMessage({ type: 'success', text: 'Backup created successfully!' });
      // Add new backup to list
      const newBackup = {
        id: `backup_${Date.now()}`,
        type: 'manual',
        size: '126MB',
        status: 'completed',
        createdBy: 'admin_001',
        timestamp: new Date().toISOString(),
        duration: '46s',
      };
      setBackups([newBackup, ...backups]);
    }, 2000);
  };

  const handleRestore = (backupId) => {
    setActionLoading(true);
    setTimeout(() => {
      setActionLoading(false);
      setMessage({ type: 'success', text: 'Database restored successfully!' });
    }, 3000);
  };

  const handleExport = (type) => {
    setActionLoading(true);
    setTimeout(() => {
      setActionLoading(false);
      setMessage({ type: 'success', text: `${type} data exported successfully!` });
    }, 1500);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString('en-PH', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status) => {
    if (status === 'completed') return <SuccessIcon sx={{ color: 'success.main' }} />;
    return <ErrorIcon sx={{ color: 'error.main' }} />;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Backup & Restore
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage system backups and data exports
        </Typography>
      </Box>

      {message && (
        <Alert severity={message.type} onClose={() => setMessage(null)} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}

      {/* Action Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 3, mb: 4 }}>
        {/* Create Backup */}
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <BackupIcon sx={{ fontSize: 40, color: '#1976d2' }} />
            <Box>
              <Typography variant="h6">Create Backup</Typography>
              <Typography variant="body2" color="text.secondary">
                Full database backup
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            fullWidth
            startIcon={<BackupIcon />}
            onClick={handleCreateBackup}
            disabled={actionLoading}
          >
            {actionLoading ? 'Creating...' : 'Create Backup Now'}
          </Button>
        </Paper>

        {/* Export Data */}
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <DownloadIcon sx={{ fontSize: 40, color: '#2e7d32' }} />
            <Box>
              <Typography variant="h6">Export Data</Typography>
              <Typography variant="body2" color="text.secondary">
                Export to JSON/CSV
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" size="small" onClick={() => handleExport('Users')}>
              Users
            </Button>
            <Button variant="outlined" size="small" onClick={() => handleExport('Transactions')}>
              Transactions
            </Button>
            <Button variant="outlined" size="small" onClick={() => handleExport('All')}>
              All
            </Button>
          </Box>
        </Paper>

        {/* Import Data */}
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <UploadIcon sx={{ fontSize: 40, color: '#9c27b0' }} />
            <Box>
              <Typography variant="h6">Import Data</Typography>
              <Typography variant="body2" color="text.secondary">
                Import from JSON/CSV
              </Typography>
            </Box>
          </Box>
          <Button variant="outlined" fullWidth startIcon={<UploadIcon />} component="label">
            Upload File
            <input type="file" hidden accept=".json,.csv" />
          </Button>
        </Paper>

        {/* Scheduled Backups */}
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <ScheduleIcon sx={{ fontSize: 40, color: '#ed6c02' }} />
            <Box>
              <Typography variant="h6">Auto Backup</Typography>
              <Typography variant="body2" color="text.secondary">
                Daily at 2:00 AM
              </Typography>
            </Box>
          </Box>
          <Chip label="Enabled" color="success" sx={{ mt: 1 }} />
        </Paper>
      </Box>

      {/* Backup History */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <HistoryIcon />
          Backup History
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {backups.map((backup, index) => (
              <React.Fragment key={backup.id}>
                <ListItem>
                  <ListItemIcon>{getStatusIcon(backup.status)}</ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1">
                          {backup.type === 'full' ? 'Full Backup' : backup.type === 'incremental' ? 'Incremental' : 'Manual Backup'}
                        </Typography>
                        <Chip label={backup.type} size="small" variant="outlined" />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(backup.timestamp)} • Size: {backup.size} • Duration: {backup.duration}
                        </Typography>
                        {backup.error && (
                          <Typography variant="caption" color="error" sx={{ display: 'block' }}>
                            Error: {backup.error}
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="Restore">
                      <IconButton
                        edge="end"
                        color="primary"
                        onClick={() => handleRestore(backup.id)}
                        disabled={backup.status === 'failed'}
                      >
                        <RestoreIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton edge="end" color="primary" disabled={backup.status === 'failed'}>
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton edge="end" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < backups.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default BackupRestoreManager;
