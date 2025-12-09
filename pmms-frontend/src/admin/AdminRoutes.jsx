import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { getTheme } from './theme';
import adminAuthService from './services/adminAuth.service';

// Core Pages
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayoutAnimated';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import AdminTransactions from './pages/AdminTransactions';
import AdminNotifications from './pages/AdminNotifications';
import AdminActivityLogs from './pages/AdminActivityLogs';

// Finance Pages
import AdminJarOverview from './pages/finance/AdminJarOverview';
import MonthlyBudgetMonitor from './pages/finance/MonthlyBudgetMonitor';
import RecurringItemsOverview from './pages/finance/RecurringItemsOverview';

// System Pages
import BackupRestoreManager from './pages/system/BackupRestoreManager';
import CustomCategoriesManager from './pages/system/CustomCategoriesManager';
import SavingsGoalsMonitor from './pages/system/SavingsGoalsMonitor';
import RecurringEngineControl from './pages/system/RecurringEngineControl';
import SystemLogsMonitor from './pages/system/SystemLogsMonitor';
import AdminSettings from './pages/system/AdminSettings';

// Security Pages
import SessionLogs from './pages/security/SessionLogs';
import RoleManagement from './pages/security/RoleManagement';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = adminAuthService.isAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }
  
  return children;
};

// Theme Wrapper
const AdminThemeWrapper = ({ children }) => {
  const { darkMode } = useAdmin();
  const theme = getTheme(darkMode ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

const AdminRoutes = () => {
  return (
    <AdminProvider>
      <AdminThemeWrapper>
        <Routes>
          {/* Login Route - matches /admin exactly */}
          <Route index element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="transactions" element={<AdminTransactions />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="logs" element={<AdminActivityLogs />} />
            
            {/* Finance Routes */}
            <Route path="finance/jars" element={<AdminJarOverview />} />
            <Route path="finance/budgets" element={<MonthlyBudgetMonitor />} />
            <Route path="finance/recurring" element={<RecurringItemsOverview />} />
            
            {/* System Routes */}
            <Route path="system/backup" element={<BackupRestoreManager />} />
            <Route path="system/categories" element={<CustomCategoriesManager />} />
            <Route path="system/goals" element={<SavingsGoalsMonitor />} />
            <Route path="system/engine" element={<RecurringEngineControl />} />
            <Route path="system/logs" element={<SystemLogsMonitor />} />
            <Route path="system/settings" element={<AdminSettings />} />
            
            {/* Security Routes */}
            <Route path="security/sessions" element={<SessionLogs />} />
            <Route path="security/roles" element={<RoleManagement />} />
            
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
        </Routes>
      </AdminThemeWrapper>
    </AdminProvider>
  );
};

export default AdminRoutes;
