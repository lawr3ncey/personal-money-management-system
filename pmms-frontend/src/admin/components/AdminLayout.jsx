import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  AccountBalance as AccountBalanceIcon,
  Notifications as NotificationsIcon,
  History as HistoryIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  AccountCircle,
  Logout,
  Savings as SavingsIcon,
  AttachMoney as MoneyIcon,
  Repeat as RecurringIcon,
  Backup as BackupIcon,
  Category as CategoryIcon,
  Flag as GoalIcon,
  Schedule as ScheduleIcon,
  BugReport as LogsIcon,
  Settings as SettingsIcon,
  VpnKey as SessionIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { useAdmin } from '../context/AdminContext';
import adminAuthService from '../services/adminAuth.service';

const drawerWidth = 260;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { text: 'User Management', icon: <PeopleIcon />, path: '/admin/users' },
  { text: 'Transactions', icon: <AccountBalanceIcon />, path: '/admin/transactions' },
  { text: 'Notifications', icon: <NotificationsIcon />, path: '/admin/notifications' },
  { text: 'Activity Logs', icon: <HistoryIcon />, path: '/admin/logs' },
  { divider: true, label: 'Finance' },
  { text: 'Jar Overview', icon: <SavingsIcon />, path: '/admin/finance/jars' },
  { text: 'Monthly Budgets', icon: <MoneyIcon />, path: '/admin/finance/budgets' },
  { text: 'Recurring Items', icon: <RecurringIcon />, path: '/admin/finance/recurring' },
  { divider: true, label: 'System' },
  { text: 'Backup & Restore', icon: <BackupIcon />, path: '/admin/system/backup' },
  { text: 'Categories', icon: <CategoryIcon />, path: '/admin/system/categories' },
  { text: 'Savings Goals', icon: <GoalIcon />, path: '/admin/system/goals' },
  { text: 'Recurring Engine', icon: <ScheduleIcon />, path: '/admin/system/engine' },
  { text: 'System Logs', icon: <LogsIcon />, path: '/admin/system/logs' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/admin/system/settings' },
  { divider: true, label: 'Security' },
  { text: 'Session Logs', icon: <SessionIcon />, path: '/admin/security/sessions' },
  { text: 'Role Management', icon: <SecurityIcon />, path: '/admin/security/roles' },
];

const AdminLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { darkMode, toggleDarkMode } = useAdmin();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const currentAdmin = adminAuthService.getCurrentAdmin();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    adminAuthService.logout();
    navigate('/admin');
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            width: 40,
            height: 40,
          }}
        >
          👑
        </Avatar>
        <Box>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            PMMS Admin
          </Typography>
          <Typography variant="caption" color="text.secondary">
            v1.0.0
          </Typography>
        </Box>
      </Box>
      <Divider />
      <List sx={{ overflowY: 'auto', flex: 1 }}>
        {menuItems.map((item, index) => (
          item.divider ? (
            <React.Fragment key={`divider-${index}`}>
              <Divider sx={{ my: 1 }} />
              <Typography
                variant="caption"
                sx={{
                  px: 2,
                  py: 0.5,
                  color: 'text.secondary',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  fontSize: '0.7rem',
                  letterSpacing: '0.5px',
                }}
              >
                {item.label}
              </Typography>
            </React.Fragment>
          ) : (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  py: 0.75,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname === item.path ? 'inherit' : 'text.secondary',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ fontSize: '0.9rem' }}
                />
              </ListItemButton>
            </ListItem>
          )
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {menuItems.find(item => item.path === location.pathname)?.text || 'Admin Panel'}
          </Typography>

          {/* Dark Mode Toggle */}
          <IconButton onClick={toggleDarkMode} color="inherit" sx={{ mr: 1 }}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Admin Profile Menu */}
          <IconButton
            onClick={handleMenuOpen}
            color="inherit"
            sx={{ ml: 1 }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: 'primary.main',
              }}
            >
              {currentAdmin?.name?.charAt(0) || 'A'}
            </Avatar>
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box sx={{ px: 2, py: 1.5, minWidth: 200 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {currentAdmin?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {currentAdmin?.email}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 0.5,
                  color: 'primary.main',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {currentAdmin?.role === 'super_admin' ? 'Super Admin' : 'Admin'}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              Profile Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better mobile performance
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: '64px', // AppBar height
          bgcolor: 'background.default',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
