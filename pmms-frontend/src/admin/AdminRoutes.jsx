import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { getTheme } from './theme';
import adminAuthService from './services/adminAuth.service';

// Pages
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';

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
            <Route path="transactions" element={<div>Transactions Page (Coming Soon)</div>} />
            <Route path="notifications" element={<div>Notifications Page (Coming Soon)</div>} />
            <Route path="logs" element={<div>Activity Logs Page (Coming Soon)</div>} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
        </Routes>
      </AdminThemeWrapper>
    </AdminProvider>
  );
};

export default AdminRoutes;
