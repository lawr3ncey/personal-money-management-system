import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Spinner from './components/ui/Spinner';

// Pages
import Dashboard from './pages/Dashboard';
import JarsPage from './pages/JarsPage';
import TransactionsPage from './pages/TransactionsPage';

// Layout wrapper for authenticated pages
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Simple header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold gradient-text">💰 6 Jars Money Manager</h1>
        </header>
        
        {/* Navigation */}
        <nav className="mb-8 flex gap-4">
          <a href="/" className="px-4 py-2 bg-white rounded-lg hover:shadow-md transition-shadow">
            Dashboard
          </a>
          <a href="/jars" className="px-4 py-2 bg-white rounded-lg hover:shadow-md transition-shadow">
            My Jars
          </a>
          <a href="/transactions" className="px-4 py-2 bg-white rounded-lg hover:shadow-md transition-shadow">
            Transactions
          </a>
        </nav>

        {/* Main content */}
        <main>{children}</main>
      </div>
    </div>
  );
};

// Protected Route component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  // For now, bypass authentication during development
  // TODO: Implement login page and uncomment this
  // return isAuthenticated ? children : <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        {/* Public routes */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}

        {/* Protected routes */}
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

        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
