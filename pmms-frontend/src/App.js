import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { SyncProvider } from './contexts/SyncContext';
import Spinner from './components/ui/Spinner';
import SyncIndicator from './components/ui/SyncIndicator';

// Pages
import Dashboard from './pages/Dashboard';
import JarsPage from './pages/JarsPage';
import TransactionsPage from './pages/TransactionsPage';
import BudgetsPage from './pages/BudgetsPage';
import GoalsPage from './pages/GoalsPage';
import RecurringPage from './pages/RecurringPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import FeaturesDemo from './pages/FeaturesDemo';
import Level5Demo from './pages/Level5Demo';
import BankIntegrationsPage from './pages/BankIntegrationsPage.tsx';
import AuthServiceDemo from './pages/AuthServiceDemo';

// Admin Routes
import AdminRoutes from './admin/AdminRoutes';

// Layout wrapper for authenticated pages
const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/jars', label: 'My Jars', icon: '🏺' },
    { path: '/transactions', label: 'Transactions', icon: '💸' },
    { path: '/budgets', label: 'Budgets', icon: '📋' },
    { path: '/goals', label: 'Goals', icon: '🎯' },
    { path: '/recurring', label: 'Recurring', icon: '🔄' },
    { path: '/demo', label: 'New Features', icon: '🚀' },
    { path: '/level5', label: 'Level 5', icon: '🌟' },
    { path: '/banking', label: 'Bank Integrations', icon: '🏦' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with user info and sync status */}
        <header className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <Link to="/" className="text-2xl font-bold gradient-text">💰 6 Jars Money Manager</Link>
          
          <div className="flex items-center gap-4">
            {/* Sync Indicator */}
            <div className="hidden sm:flex items-center px-3 py-1 bg-white rounded-full shadow-sm">
              <SyncIndicator size="sm" />
            </div>
            
            {/* User Menu */}
            <div className="flex items-center gap-3">
              <Link 
                to="/profile" 
                className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <span className="hidden sm:inline text-sm font-medium text-gray-700">
                  {user?.name?.split(' ')[0] || 'User'}
                </span>
              </Link>
              <button
                onClick={logout}
                className="px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Sign Out"
              >
                🚪 Sign Out
              </button>
            </div>
          </div>
        </header>
        
        {/* Navigation */}
        <nav className="mb-8 flex gap-2 flex-wrap">
          {navItems.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              className={`px-4 py-2 rounded-lg transition-all ${
                isActive(path)
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white hover:shadow-md'
              }`}
            >
              <span className="mr-1">{icon}</span> {label}
            </Link>
          ))}
        </nav>

        {/* Mobile Sync Status */}
        <div className="sm:hidden mb-4 flex items-center justify-center px-3 py-2 bg-white rounded-lg shadow-sm">
          <SyncIndicator size="sm" />
        </div>

        {/* Main content */}
        <main>{children}</main>
      </div>
    </div>
  );
};

// Protected Route component - redirects to login if not authenticated
const PrivateRoute = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Public Route component - redirects to dashboard if already authenticated
const PublicRoute = ({ children }) => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        <Spinner size="lg" />
      </div>
    );
  }

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <SyncProvider>
        <Routes>
          {/* Public routes - redirect to dashboard if already logged in */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/auth-demo" 
            element={
              <PublicRoute>
                <AuthServiceDemo />
              </PublicRoute>
            } 
          />

          {/* Admin routes - completely separate from user system */}
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* Protected routes - require authentication */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/jars"
            element={
              <PrivateRoute>
                <Layout>
                  <JarsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute>
                <Layout>
                  <TransactionsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/budgets"
            element={
              <PrivateRoute>
                <Layout>
                  <BudgetsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/goals"
            element={
              <PrivateRoute>
                <Layout>
                  <GoalsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/recurring"
            element={
              <PrivateRoute>
                <Layout>
                  <RecurringPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Layout>
                  <SettingsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Layout>
                  <ProfilePage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/demo"
            element={
              <PrivateRoute>
                <Layout>
                  <FeaturesDemo />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/level5"
            element={
              <PrivateRoute>
                <Layout>
                  <Level5Demo />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/banking"
            element={
              <PrivateRoute>
                <Layout>
                  <BankIntegrationsPage />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* Catch all - redirect to dashboard or login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SyncProvider>
    </Router>
  );
}

export default App;
