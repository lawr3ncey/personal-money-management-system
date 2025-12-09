/**
 * AdminLayoutAnimated - Enhanced Admin Layout with Animated Sidebar
 * 
 * This is a NON-DESTRUCTIVE integration of the animated sidebar component.
 * All existing admin features, routing, and logic remain untouched.
 * 
 * Features:
 * - Animated sidebar with hover expand/collapse (desktop)
 * - Slide-in animation for mobile
 * - Preserves all existing admin panel functionality
 * - Dark mode support
 * - Responsive design
 */

import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Box,
} from '@mui/material';
import {
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
import { motion } from 'framer-motion';
import { Sidebar, SidebarBody, SidebarLink } from '../../components/ui/sidebar';
import { useAdmin } from '../context/AdminContext';
import adminAuthService from '../services/adminAuth.service';

// Logo components for the sidebar
const Logo = ({ darkMode }) => {
  return (
    <div className="flex items-center space-x-2 text-sm py-1 relative z-20">
      <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xl font-bold">👑</span>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`font-semibold text-lg whitespace-pre ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}
      >
        PMMS Admin
      </motion.span>
    </div>
  );
};

const LogoIcon = () => {
  return (
    <div className="flex items-center space-x-2 text-sm py-1 relative z-20">
      <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xl font-bold">👑</span>
      </div>
    </div>
  );
};

const AdminLayoutAnimated = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useAdmin();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const currentAdmin = adminAuthService.getCurrentAdmin();

  // Menu items configuration - preserving all existing routes
  const menuItems = [
    { 
      label: 'Dashboard', 
      href: '/admin/dashboard',
      icon: <DashboardIcon className="h-5 w-5 flex-shrink-0" />
    },
    { 
      label: 'User Management', 
      href: '/admin/users',
      icon: <PeopleIcon className="h-5 w-5 flex-shrink-0" />
    },
    { 
      label: 'Transactions', 
      href: '/admin/transactions',
      icon: <AccountBalanceIcon className="h-5 w-5 flex-shrink-0" />
    },
    { 
      label: 'Notifications', 
      href: '/admin/notifications',
      icon: <NotificationsIcon className="h-5 w-5 flex-shrink-0" />
    },
    { 
      label: 'Activity Logs', 
      href: '/admin/logs',
      icon: <HistoryIcon className="h-5 w-5 flex-shrink-0" />
    },
  ];

  const financeMenuItems = [
    { 
      label: 'Jar Overview', 
      href: '/admin/finance/jars',
      icon: <SavingsIcon className="h-5 w-5 flex-shrink-0" />
    },
    { 
      label: 'Monthly Budgets', 
      href: '/admin/finance/budgets',
      icon: <MoneyIcon className="h-5 w-5 flex-shrink-0" />
    },
    { 
      label: 'Recurring Items', 
      href: '/admin/finance/recurring',
      icon: <RecurringIcon className="h-5 w-5 flex-shrink-0" />
    },
  ];

  const systemMenuItems = [
    { 
      label: 'Backup & Restore', 
      href: '/admin/system/backup',
      icon: <BackupIcon className="h-5 w-5 flex-shrink-0" />
    },
    { 
      label: 'Categories', 
      href: '/admin/system/categories',
      icon: <CategoryIcon className="h-5 w-5 flex-shrink-0" />
    },
    { 
      label: 'Savings Goals', 
      href: '/admin/system/goals',
      icon: <GoalIcon className="h-5 w-5 flex-shrink-0" />
    },
    { 
      label: 'Recurring Engine', 
      href: '/admin/system/engine',
      icon: <ScheduleIcon className="h-5 w-5 flex-shrink-0" />
    },
    { 
      label: 'System Logs', 
      href: '/admin/system/logs',
      icon: <LogsIcon className="h-5 w-5 flex-shrink-0" />
    },
    { 
      label: 'Settings', 
      href: '/admin/system/settings',
      icon: <SettingsIcon className="h-5 w-5 flex-shrink-0" />
    },
  ];

  const securityMenuItems = [
    { 
      label: 'Session Logs', 
      href: '/admin/security/sessions',
      icon: <SessionIcon className="h-5 w-5 flex-shrink-0" />
    },
    { 
      label: 'Role Management', 
      href: '/admin/security/roles',
      icon: <SecurityIcon className="h-5 w-5 flex-shrink-0" />
    },
  ];

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

  // Find current page title
  const allMenuItems = [...menuItems, ...financeMenuItems, ...systemMenuItems, ...securityMenuItems];
  const currentPageTitle = allMenuItems.find(item => item.href === location.pathname)?.label || 'Admin Panel';

  return (
    <div className={`flex w-full h-screen overflow-hidden ${darkMode ? 'dark' : ''}`}>
      {/* Animated Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* Logo - Sticky */}
            <div className="sticky top-0 bg-neutral-100 dark:bg-neutral-800 z-10 pb-4">
              {sidebarOpen ? <Logo darkMode={darkMode} /> : <LogoIcon />}
            </div>
            
            {/* Main Menu */}
            <div className="mt-4 flex flex-col gap-2">
              {menuItems.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>

            {/* Finance Section */}
            <div className="mt-6">
              {sidebarOpen && (
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase px-2 mb-2">
                  Finance
                </div>
              )}
              <div className="flex flex-col gap-2">
                {financeMenuItems.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>

            {/* System Section */}
            <div className="mt-6">
              {sidebarOpen && (
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase px-2 mb-2">
                  System
                </div>
              )}
              <div className="flex flex-col gap-2">
                {systemMenuItems.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>

            {/* Security Section */}
            <div className="mt-6">
              {sidebarOpen && (
                <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase px-2 mb-2">
                  Security
                </div>
              )}
              <div className="flex flex-col gap-2">
                {securityMenuItems.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
          </div>

          {/* Admin Profile at Bottom */}
          <div>
            <SidebarLink
              link={{
                label: currentAdmin?.name || 'Admin',
                href: '#',
                icon: (
                  <Avatar
                    sx={{
                      width: 28,
                      height: 28,
                      bgcolor: 'primary.main',
                      fontSize: '0.875rem',
                    }}
                  >
                    {currentAdmin?.name?.charAt(0) || 'A'}
                  </Avatar>
                ),
              }}
            />
            {sidebarOpen && (
              <div className="text-xs text-neutral-500 dark:text-neutral-400 px-2 mt-1">
                v1.0.0
              </div>
            )}
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top AppBar */}
        <AppBar
          position="static"
          elevation={1}
          sx={{
            bgcolor: darkMode ? 'rgb(23, 23, 23)' : 'white',
            color: darkMode ? 'white' : 'rgb(23, 23, 23)',
            borderBottom: darkMode ? '1px solid rgb(38, 38, 38)' : '1px solid rgb(229, 231, 235)',
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              {currentPageTitle}
            </Typography>

            {/* Dark Mode Toggle */}
            <IconButton onClick={toggleDarkMode} color="inherit" sx={{ mr: 1 }}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {/* Admin Profile Menu */}
            <IconButton onClick={handleMenuOpen} color="inherit" sx={{ ml: 1 }}>
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

        {/* Page Content - All existing admin pages render here */}
        <Box
          sx={{
            flex: 1,
            width: '100%',
            overflowX: 'hidden',
            overflowY: 'auto',
            bgcolor: darkMode ? 'rgb(23, 23, 23)' : 'rgb(249, 250, 251)',
            p: 3,
          }}
        >
          <Outlet />
        </Box>
      </div>
    </div>
  );
};

export default AdminLayoutAnimated;
