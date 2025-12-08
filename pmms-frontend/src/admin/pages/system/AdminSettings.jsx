import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Chip,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Save as SaveIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
  Palette as ThemeIcon,
  Notifications as NotificationsIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { adminSettings, adminAccounts, rolePermissions } from '../../data/adminData';

const AdminSettings = () => {
  const [settings, setSettings] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTimeout(() => {
      setSettings(adminSettings);
      setAdmins(adminAccounts);
      setLoading(false);
    }, 800);
  }, []);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    }, 1500);
  };

  const handleSettingChange = (category, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Admin Settings
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Configure system settings and manage admin accounts
        </Typography>
      </Box>

      {message && (
        <Alert severity={message.type} onClose={() => setMessage(null)} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} sx={{ mb: 3 }}>
        <Tab icon={<SettingsIcon />} label="General" iconPosition="start" />
        <Tab icon={<SecurityIcon />} label="Security" iconPosition="start" />
        <Tab icon={<NotificationsIcon />} label="Notifications" iconPosition="start" />
        <Tab icon={<LockIcon />} label="Admin Accounts" iconPosition="start" />
        <Tab icon={<ThemeIcon />} label="Theme" iconPosition="start" />
      </Tabs>

      {/* General Settings */}
      {activeTab === 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsIcon />
            General Settings
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
            <TextField
              label="Site Name"
              value={settings.general.siteName}
              onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
              fullWidth
            />
            <TextField
              label="Timezone"
              value={settings.general.timezone}
              onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
              fullWidth
            />
            <TextField
              label="Date Format"
              value={settings.general.dateFormat}
              onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
              fullWidth
            />
            <TextField
              label="Currency"
              value={settings.general.currency}
              onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
              fullWidth
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Feature Toggles
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
            {Object.entries(settings.features).map(([key, value]) => (
              <FormControlLabel
                key={key}
                control={
                  <Switch
                    checked={value}
                    onChange={(e) => handleSettingChange('features', key, e.target.checked)}
                  />
                }
                label={key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
              />
            ))}
          </Box>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Paper>
      )}

      {/* Security Settings */}
      {activeTab === 1 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <SecurityIcon />
            Security Settings
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
            <TextField
              label="Max Login Attempts"
              type="number"
              value={settings.security.maxLoginAttempts}
              onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
              fullWidth
            />
            <TextField
              label="Session Timeout (minutes)"
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
              fullWidth
            />
            <TextField
              label="Min Password Length"
              type="number"
              value={settings.security.passwordMinLength}
              onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
              fullWidth
            />
          </Box>

          <Box sx={{ mt: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.security.requireSpecialChar}
                  onChange={(e) => handleSettingChange('security', 'requireSpecialChar', e.target.checked)}
                />
              }
              label="Require Special Characters in Password"
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Change Admin Password
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2, mb: 2 }}>
            <TextField label="Current Password" type="password" fullWidth />
            <TextField label="New Password" type="password" fullWidth />
            <TextField label="Confirm New Password" type="password" fullWidth />
          </Box>

          <Button variant="outlined" startIcon={<LockIcon />}>
            Update Password
          </Button>
        </Paper>
      )}

      {/* Notification Settings */}
      {activeTab === 2 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <NotificationsIcon />
            Notification Settings
          </Typography>

          <Box sx={{ display: 'grid', gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.emailAlerts}
                  onChange={(e) => handleSettingChange('notifications', 'emailAlerts', e.target.checked)}
                />
              }
              label="Email Alerts"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.slackIntegration}
                  onChange={(e) => handleSettingChange('notifications', 'slackIntegration', e.target.checked)}
                />
              }
              label="Slack Integration"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.suspiciousActivityAlert}
                  onChange={(e) => handleSettingChange('notifications', 'suspiciousActivityAlert', e.target.checked)}
                />
              }
              label="Suspicious Activity Alerts"
            />
            <TextField
              label="Low Balance Alert Threshold (₱)"
              type="number"
              value={settings.notifications.lowBalanceAlert}
              onChange={(e) => handleSettingChange('notifications', 'lowBalanceAlert', parseInt(e.target.value))}
              sx={{ maxWidth: 300 }}
            />
          </Box>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave} disabled={saving}>
              Save Changes
            </Button>
          </Box>
        </Paper>
      )}

      {/* Admin Accounts */}
      {activeTab === 3 && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LockIcon />
              Admin Accounts
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} size="small">
              Add Admin
            </Button>
          </Box>

          <List>
            {admins.map((admin, index) => (
              <React.Fragment key={admin.id}>
                <ListItem>
                  <Avatar sx={{ mr: 2, bgcolor: rolePermissions[admin.role]?.color || '#757575' }}>
                    {admin.name.charAt(0)}
                  </Avatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>{admin.name}</Typography>
                        <Chip
                          size="small"
                          label={rolePermissions[admin.role]?.label || admin.role}
                          sx={{
                            bgcolor: `${rolePermissions[admin.role]?.color || '#757575'}20`,
                            color: rolePermissions[admin.role]?.color || '#757575',
                          }}
                        />
                        <Chip
                          size="small"
                          label={admin.status}
                          color={admin.status === 'active' ? 'success' : 'default'}
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          {admin.email} • Last login: {new Date(admin.lastLogin).toLocaleDateString()}
                        </Typography>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton size="small" color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" disabled={admin.role === 'super_admin'}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < admins.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {/* Theme Settings */}
      {activeTab === 4 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <ThemeIcon />
            Theme Settings
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Paper
              sx={{
                p: 3,
                cursor: 'pointer',
                border: theme === 'light' ? '2px solid #1976d2' : '2px solid transparent',
                bgcolor: '#ffffff',
                width: 150,
                textAlign: 'center',
              }}
              onClick={() => setTheme('light')}
            >
              <Box sx={{ width: 40, height: 40, bgcolor: '#f5f5f5', mx: 'auto', mb: 1, borderRadius: 1 }} />
              <Typography variant="body2">Light Mode</Typography>
            </Paper>
            <Paper
              sx={{
                p: 3,
                cursor: 'pointer',
                border: theme === 'dark' ? '2px solid #1976d2' : '2px solid transparent',
                bgcolor: '#1e1e1e',
                width: 150,
                textAlign: 'center',
              }}
              onClick={() => setTheme('dark')}
            >
              <Box sx={{ width: 40, height: 40, bgcolor: '#2d2d2d', mx: 'auto', mb: 1, borderRadius: 1 }} />
              <Typography variant="body2" sx={{ color: 'white' }}>Dark Mode</Typography>
            </Paper>
          </Box>

          <Alert severity="info">
            Theme changes will apply immediately across the admin panel.
          </Alert>
        </Paper>
      )}
    </Box>
  );
};

export default AdminSettings;
