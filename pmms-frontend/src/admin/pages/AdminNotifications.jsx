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
  Card,
  CardContent,
  Chip,
  IconButton,
  InputAdornment,
  Badge,
  Avatar,
  Divider,
  Stack,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  CheckCircle as SuccessIcon,
  Computer as SystemIcon,
  Person as PersonIcon,
  MarkEmailRead as MarkReadIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { dummyNotifications } from '../data/dummyData';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [readFilter, setReadFilter] = useState('all');

  // Simulate loading data from backend
  useEffect(() => {
    const fetchNotifications = () => {
      setTimeout(() => {
        // Sort by most recent first
        const sortedNotifications = [...dummyNotifications].sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setNotifications(sortedNotifications);
        setLoading(false);
      }, 800);
    };

    fetchNotifications();
  }, []);

  // Filter notifications
  const filteredNotifications = notifications.filter((notif) => {
    const matchesSearch =
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.userName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'all' || notif.type === typeFilter;
    const matchesRead =
      readFilter === 'all' ||
      (readFilter === 'read' && notif.isRead) ||
      (readFilter === 'unread' && !notif.isRead);

    return matchesSearch && matchesType && matchesRead;
  });

  // Calculate stats
  const totalNotifications = notifications.length;
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const systemNotifications = notifications.filter((n) => n.type === 'system' || n.userId === 'all').length;
  const userNotifications = notifications.filter((n) => n.userId !== 'all' && n.type !== 'system').length;

  // Get type icon and color
  const getTypeConfig = (type) => {
    const configs = {
      info: {
        icon: <InfoIcon />,
        color: '#1976d2',
        bgcolor: '#e3f2fd',
      },
      warning: {
        icon: <WarningIcon />,
        color: '#ed6c02',
        bgcolor: '#fff3e0',
      },
      success: {
        icon: <SuccessIcon />,
        color: '#2e7d32',
        bgcolor: '#e8f5e9',
      },
      system: {
        icon: <SystemIcon />,
        color: '#9c27b0',
        bgcolor: '#f3e5f5',
      },
    };

    return configs[type] || configs.info;
  };

  // Format date/time
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString('en-PH', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Handle mark as read
  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
    );
  };

  // Handle mark all as read
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Notifications
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and monitor all system and user notifications
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<SendIcon />} sx={{ textTransform: 'none' }}>
          Send Notification
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, mb: 3 }}>
        <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NotificationsIcon sx={{ color: '#1976d2' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                Total Notifications
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {totalNotifications}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 2, bgcolor: '#fff3e0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon sx={{ color: '#ed6c02' }} />
            </Badge>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Unread
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'warning.main' }}>
                {unreadCount}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 2, bgcolor: '#f3e5f5' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SystemIcon sx={{ color: '#9c27b0' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                System Alerts
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {systemNotifications}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon sx={{ color: '#2e7d32' }} />
            <Box>
              <Typography variant="body2" color="text.secondary">
                User Notifications
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {userNotifications}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      {/* Filters and Actions */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Search notifications..."
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
              <MenuItem value="info">Info</MenuItem>
              <MenuItem value="warning">Warning</MenuItem>
              <MenuItem value="success">Success</MenuItem>
              <MenuItem value="system">System</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select value={readFilter} onChange={(e) => setReadFilter(e.target.value)} label="Status">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="unread">Unread</MenuItem>
              <MenuItem value="read">Read</MenuItem>
            </Select>
          </FormControl>

          {unreadCount > 0 && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<MarkReadIcon />}
              onClick={handleMarkAllAsRead}
              sx={{ textTransform: 'none' }}
            >
              Mark All as Read
            </Button>
          )}
        </Box>
      </Paper>

      {/* Notifications List */}
      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : filteredNotifications.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <NotificationsIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No notifications found
            </Typography>
          </Box>
        ) : (
          <Stack spacing={1.5}>
            {filteredNotifications.map((notification, index) => {
              const typeConfig = getTypeConfig(notification.type);

              return (
                <Card
                  key={notification.id}
                  sx={{
                    border: '1px solid',
                    borderColor: notification.isRead ? '#e0e0e0' : typeConfig.color,
                    bgcolor: notification.isRead ? '#fafafa' : typeConfig.bgcolor,
                    opacity: notification.isRead ? 0.7 : 1,
                    transition: 'all 0.2s',
                    '&:hover': {
                      boxShadow: 2,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      {/* Icon */}
                      <Avatar
                        sx={{
                          bgcolor: typeConfig.color,
                          width: 40,
                          height: 40,
                        }}
                      >
                        {typeConfig.icon}
                      </Avatar>

                      {/* Content */}
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {notification.title}
                          </Typography>
                          <Chip
                            label={notification.type}
                            size="small"
                            sx={{
                              bgcolor: typeConfig.color,
                              color: 'white',
                              textTransform: 'capitalize',
                              fontSize: '0.7rem',
                            }}
                          />
                        </Box>

                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {notification.message}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <Typography variant="caption" color="text.secondary">
                              {notification.userId === 'all' ? 'All Users' : notification.userName}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              •
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatTimestamp(notification.timestamp)}
                            </Typography>
                            {!notification.isRead && (
                              <>
                                <Typography variant="caption" color="text.secondary">
                                  •
                                </Typography>
                                <Chip label="New" size="small" color="primary" sx={{ height: 18, fontSize: '0.65rem' }} />
                              </>
                            )}
                          </Box>

                          {/* Actions */}
                          <Box>
                            {!notification.isRead && (
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => handleMarkAsRead(notification.id)}
                                title="Mark as Read"
                              >
                                <MarkReadIcon fontSize="small" />
                              </IconButton>
                            )}
                            <IconButton size="small" color="error" title="Delete">
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        )}
      </Paper>
    </Box>
  );
};

export default AdminNotifications;
