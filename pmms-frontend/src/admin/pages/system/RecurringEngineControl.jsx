import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Alert,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Schedule as CronIcon,
  PlayArrow as RunIcon,
  Pause as PauseIcon,
  Refresh as RefreshIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Delete as ClearIcon,
  History as HistoryIcon,
} from '@mui/icons-material';

// Dummy cron jobs data
const cronJobs = [
  { id: 'cron_001', name: 'Process Recurring Income', schedule: '0 0 * * *', status: 'active', lastRun: '2024-12-07T00:01:00Z', nextRun: '2024-12-08T00:00:00Z', success: true },
  { id: 'cron_002', name: 'Process Recurring Bills', schedule: '0 0 * * *', status: 'active', lastRun: '2024-12-07T00:02:00Z', nextRun: '2024-12-08T00:00:00Z', success: true },
  { id: 'cron_003', name: 'Generate Monthly Reports', schedule: '0 0 1 * *', status: 'active', lastRun: '2024-12-01T00:00:00Z', nextRun: '2025-01-01T00:00:00Z', success: true },
  { id: 'cron_004', name: 'Daily Backup', schedule: '0 2 * * *', status: 'active', lastRun: '2024-12-07T02:00:00Z', nextRun: '2024-12-08T02:00:00Z', success: true },
  { id: 'cron_005', name: 'Clear Expired Sessions', schedule: '0 4 * * *', status: 'active', lastRun: '2024-12-07T04:00:00Z', nextRun: '2024-12-08T04:00:00Z', success: true },
  { id: 'cron_006', name: 'Send Reminder Notifications', schedule: '0 8 * * *', status: 'paused', lastRun: '2024-12-06T08:00:00Z', nextRun: null, success: true },
];

const cronLogs = [
  { id: 'log_001', job: 'Process Recurring Income', timestamp: '2024-12-07T00:01:00Z', status: 'success', message: 'Processed 4 recurring income items', duration: '1.2s' },
  { id: 'log_002', job: 'Process Recurring Bills', timestamp: '2024-12-07T00:02:00Z', status: 'success', message: 'Processed 8 recurring bills', duration: '2.1s' },
  { id: 'log_003', job: 'Daily Backup', timestamp: '2024-12-07T02:00:00Z', status: 'success', message: 'Backup completed (125MB)', duration: '45s' },
  { id: 'log_004', job: 'Clear Expired Sessions', timestamp: '2024-12-07T04:00:00Z', status: 'success', message: 'Cleared 12 expired sessions', duration: '0.5s' },
  { id: 'log_005', job: 'Process Recurring Bills', timestamp: '2024-12-06T00:02:00Z', status: 'failed', message: 'User user_004 has insufficient balance', duration: '1.8s' },
  { id: 'log_006', job: 'Daily Backup', timestamp: '2024-12-03T02:00:00Z', status: 'failed', message: 'Disk space insufficient', duration: '0.1s' },
];

const RecurringEngineControl = () => {
  const [jobs, setJobs] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [engineEnabled, setEngineEnabled] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setJobs(cronJobs);
      setLogs(cronLogs);
      setLoading(false);
    }, 800);
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString('en-PH', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleForceRun = (jobId) => {
    setActionLoading(true);
    setTimeout(() => {
      setActionLoading(false);
      setMessage({ type: 'success', text: 'Job executed successfully!' });
      // Update last run
      setJobs((prev) =>
        prev.map((j) =>
          j.id === jobId ? { ...j, lastRun: new Date().toISOString() } : j
        )
      );
    }, 2000);
  };

  const handleToggleJob = (jobId) => {
    setJobs((prev) =>
      prev.map((j) =>
        j.id === jobId ? { ...j, status: j.status === 'active' ? 'paused' : 'active' } : j
      )
    );
  };

  const handleClearQueue = () => {
    setActionLoading(true);
    setTimeout(() => {
      setActionLoading(false);
      setMessage({ type: 'success', text: 'Queue cleared successfully!' });
    }, 1000);
  };

  const activeJobs = jobs.filter((j) => j.status === 'active').length;
  const failedToday = logs.filter((l) => l.status === 'failed' && new Date(l.timestamp).toDateString() === new Date().toDateString()).length;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Recurring Engine Control
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Monitor and control scheduled jobs and recurring item processing
        </Typography>
      </Box>

      {message && (
        <Alert severity={message.type} onClose={() => setMessage(null)} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}

      {/* Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2, mb: 3 }}>
        <Paper sx={{ p: 2, bgcolor: engineEnabled ? '#e8f5e9' : '#ffebee' }}>
          <Typography variant="body2" color="text.secondary">Engine Status</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: engineEnabled ? 'success.main' : 'error.main' }}>
              {engineEnabled ? 'Running' : 'Stopped'}
            </Typography>
            <Switch checked={engineEnabled} onChange={(e) => setEngineEnabled(e.target.checked)} size="small" />
          </Box>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
          <Typography variant="body2" color="text.secondary">Total Jobs</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{jobs.length}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
          <Typography variant="body2" color="text.secondary">Active</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main' }}>{activeJobs}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: failedToday > 0 ? '#ffebee' : '#f5f5f5' }}>
          <Typography variant="body2" color="text.secondary">Failed Today</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: failedToday > 0 ? 'error.main' : 'text.primary' }}>
            {failedToday}
          </Typography>
        </Paper>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          {/* Cron Jobs */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CronIcon />
                Scheduled Jobs
              </Typography>
              <Button size="small" startIcon={<ClearIcon />} onClick={handleClearQueue} disabled={actionLoading}>
                Clear Queue
              </Button>
            </Box>

            <List>
              {jobs.map((job, index) => (
                <React.Fragment key={job.id}>
                  <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', py: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{job.name}</Typography>
                        <Chip
                          size="small"
                          label={job.status}
                          color={job.status === 'active' ? 'success' : 'default'}
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </Box>
                      <Box>
                        <Button
                          size="small"
                          startIcon={<RunIcon />}
                          onClick={() => handleForceRun(job.id)}
                          disabled={actionLoading}
                        >
                          Run
                        </Button>
                        <Button
                          size="small"
                          startIcon={job.status === 'active' ? <PauseIcon /> : <RunIcon />}
                          onClick={() => handleToggleJob(job.id)}
                          color={job.status === 'active' ? 'warning' : 'success'}
                        >
                          {job.status === 'active' ? 'Pause' : 'Resume'}
                        </Button>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Typography variant="caption" color="text.secondary">
                        Schedule: <code>{job.schedule}</code>
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Last: {formatDate(job.lastRun)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Next: {formatDate(job.nextRun)}
                      </Typography>
                    </Box>
                  </ListItem>
                  {index < jobs.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>

          {/* Recent Logs */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <HistoryIcon />
              Recent Execution Logs
            </Typography>

            <List>
              {logs.map((log, index) => (
                <React.Fragment key={log.id}>
                  <ListItem>
                    <ListItemIcon>
                      {log.status === 'success' ? (
                        <SuccessIcon sx={{ color: 'success.main' }} />
                      ) : (
                        <ErrorIcon sx={{ color: 'error.main' }} />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body2">{log.job}</Typography>
                          <Chip
                            size="small"
                            label={log.status}
                            color={log.status === 'success' ? 'success' : 'error'}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                            {log.message}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(log.timestamp)} • Duration: {log.duration}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < logs.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default RecurringEngineControl;
