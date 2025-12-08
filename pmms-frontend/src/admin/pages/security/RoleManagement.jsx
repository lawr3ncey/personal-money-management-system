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
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Security as SecurityIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandIcon,
  AdminPanelSettings as AdminIcon,
  People as PeopleIcon,
  Receipt as TransactionIcon,
  Assessment as ReportIcon,
  Settings as SettingsIcon,
  Visibility as ViewIcon,
  Download as ExportIcon,
  Upload as ImportIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import { adminAccounts, rolePermissions } from '../../data/adminData';

// All available permissions
const allPermissions = [
  { id: 'view_dashboard', label: 'View Dashboard', category: 'Dashboard', icon: <ViewIcon /> },
  { id: 'view_users', label: 'View Users', category: 'Users', icon: <PeopleIcon /> },
  { id: 'edit_users', label: 'Edit Users', category: 'Users', icon: <EditIcon /> },
  { id: 'delete_users', label: 'Delete Users', category: 'Users', icon: <DeleteIcon /> },
  { id: 'view_transactions', label: 'View Transactions', category: 'Finance', icon: <TransactionIcon /> },
  { id: 'edit_transactions', label: 'Edit Transactions', category: 'Finance', icon: <EditIcon /> },
  { id: 'view_reports', label: 'View Reports', category: 'Reports', icon: <ReportIcon /> },
  { id: 'export_data', label: 'Export Data', category: 'Data', icon: <ExportIcon /> },
  { id: 'import_data', label: 'Import Data', category: 'Data', icon: <ImportIcon /> },
  { id: 'view_logs', label: 'View System Logs', category: 'System', icon: <SettingsIcon /> },
  { id: 'manage_settings', label: 'Manage Settings', category: 'System', icon: <SettingsIcon /> },
  { id: 'reset_password', label: 'Reset User Passwords', category: 'Security', icon: <LockIcon /> },
  { id: 'manage_roles', label: 'Manage Roles', category: 'Security', icon: <SecurityIcon /> },
  { id: 'manage_admins', label: 'Manage Admin Accounts', category: 'Security', icon: <AdminIcon /> },
];

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState({ name: '', label: '', color: '#1976d2', permissions: [] });

  useEffect(() => {
    setTimeout(() => {
      // Convert rolePermissions object to array
      const rolesArray = Object.entries(rolePermissions).map(([key, value]) => ({
        id: key,
        name: key,
        ...value,
      }));
      setRoles(rolesArray);
      setAdmins(adminAccounts);
      setLoading(false);
    }, 800);
  }, []);

  const handleOpenDialog = (role = null) => {
    if (role) {
      setEditingRole(role);
      setNewRole({ ...role });
    } else {
      setEditingRole(null);
      setNewRole({ name: '', label: '', color: '#1976d2', permissions: [] });
    }
    setDialogOpen(true);
  };

  const handleSaveRole = () => {
    if (editingRole) {
      setRoles((prev) => prev.map((r) => (r.id === editingRole.id ? { ...r, ...newRole } : r)));
      setMessage({ type: 'success', text: 'Role updated successfully!' });
    } else {
      const id = `role_${Date.now()}`;
      setRoles((prev) => [...prev, { ...newRole, id, name: newRole.label.toLowerCase().replace(/\s+/g, '_') }]);
      setMessage({ type: 'success', text: 'Role created successfully!' });
    }
    setDialogOpen(false);
  };

  const handlePermissionToggle = (permId) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permId)
        ? prev.permissions.filter((p) => p !== permId)
        : [...prev.permissions, permId],
    }));
  };

  const getAdminsWithRole = (roleId) => {
    return admins.filter((a) => a.role === roleId);
  };

  // Group permissions by category
  const groupedPermissions = allPermissions.reduce((acc, perm) => {
    if (!acc[perm.category]) acc[perm.category] = [];
    acc[perm.category].push(perm);
    return acc;
  }, {});

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Role-Based Access Control
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage admin roles and permissions
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          Create Role
        </Button>
      </Box>

      {message && (
        <Alert severity={message.type} onClose={() => setMessage(null)} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}

      {/* Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2, mb: 3 }}>
        <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
          <Typography variant="body2" color="text.secondary">Total Roles</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{roles.length}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#f3e5f5' }}>
          <Typography variant="body2" color="text.secondary">Total Admins</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{admins.length}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
          <Typography variant="body2" color="text.secondary">Active Admins</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main' }}>
            {admins.filter((a) => a.status === 'active').length}
          </Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#fff3e0' }}>
          <Typography variant="body2" color="text.secondary">Permissions</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{allPermissions.length}</Typography>
        </Paper>
      </Box>

      {/* Roles List */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {roles.map((role) => (
          <Paper key={role.id} sx={{ p: 0, overflow: 'hidden' }}>
            <Box sx={{ p: 2, bgcolor: `${role.color}15`, borderBottom: `3px solid ${role.color}` }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ bgcolor: role.color, width: 36, height: 36 }}>
                    <SecurityIcon sx={{ fontSize: 20 }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{role.label}</Typography>
                    <Typography variant="caption" color="text.secondary">{role.name}</Typography>
                  </Box>
                </Box>
                <Box>
                  <IconButton size="small" onClick={() => handleOpenDialog(role)} disabled={role.id === 'super_admin'}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" color="error" disabled={role.id === 'super_admin'}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>

            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}>
                Permissions ({Array.isArray(role.permissions) ? role.permissions.length : 1})
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                {Array.isArray(role.permissions) ? (
                  role.permissions.slice(0, 6).map((perm, i) => (
                    <Chip key={i} label={perm} size="small" variant="outlined" />
                  ))
                ) : (
                  <Chip label={role.permissions[0]} size="small" color="error" />
                )}
                {Array.isArray(role.permissions) && role.permissions.length > 6 && (
                  <Chip label={`+${role.permissions.length - 6} more`} size="small" />
                )}
              </Box>

              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}>
                Admins with this role ({getAdminsWithRole(role.id).length})
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {getAdminsWithRole(role.id).map((admin) => (
                  <Chip
                    key={admin.id}
                    avatar={<Avatar sx={{ bgcolor: role.color }}>{admin.name.charAt(0)}</Avatar>}
                    label={admin.name}
                    size="small"
                    sx={{ bgcolor: `${role.color}20` }}
                  />
                ))}
                {getAdminsWithRole(role.id).length === 0 && (
                  <Typography variant="caption" color="text.secondary">No admins assigned</Typography>
                )}
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Create/Edit Role Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingRole ? 'Edit Role' : 'Create New Role'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Role Label"
              value={newRole.label}
              onChange={(e) => setNewRole({ ...newRole, label: e.target.value })}
              fullWidth
              placeholder="e.g., Content Manager"
            />
            <TextField
              label="Color"
              type="color"
              value={newRole.color}
              onChange={(e) => setNewRole({ ...newRole, color: e.target.value })}
              fullWidth
              InputProps={{ sx: { height: 56 } }}
            />

            <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 1 }}>
              Permissions
            </Typography>

            {Object.entries(groupedPermissions).map(([category, perms]) => (
              <Accordion key={category} defaultExpanded={category === 'Dashboard'}>
                <AccordionSummary expandIcon={<ExpandIcon />}>
                  <Typography sx={{ fontWeight: 500 }}>{category}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {perms.map((perm) => (
                      <FormControlLabel
                        key={perm.id}
                        control={
                          <Checkbox
                            checked={newRole.permissions.includes(perm.id)}
                            onChange={() => handlePermissionToggle(perm.id)}
                          />
                        }
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {perm.icon}
                            <Typography variant="body2">{perm.label}</Typography>
                          </Box>
                        }
                      />
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveRole} disabled={!newRole.label}>
            {editingRole ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoleManagement;
