import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminAuthService from '../services/adminAuth.service';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (adminAuthService.isAuthenticated()) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter username and password');
      return;
    }

    setLoading(true);

    try {
      await adminAuthService.login(username, password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      <div className="w-full max-w-md px-4">
        {/* Admin Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white bg-opacity-10 rounded-full mb-4">
            <span className="text-6xl">👑</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-purple-200">6 Jars Money Management System</p>
        </div>

        <Card className="shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Administrator Login</h2>
              <p className="text-gray-600 text-sm mt-2">Enter your credentials to access the admin panel</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                ❌ {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="Enter username"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                placeholder="Enter password"
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3 text-lg"
              disabled={loading}
            >
              {loading ? '🔄 Logging in...' : '🔐 Login to Admin Panel'}
            </Button>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Demo credentials: <code className="bg-gray-100 px-2 py-1 rounded">admin</code> / <code className="bg-gray-100 px-2 py-1 rounded">admin123</code>
              </p>
            </div>
          </form>
        </Card>

        <div className="text-center mt-6">
          <a
            href="/"
            className="text-purple-200 hover:text-white transition-colors text-sm"
          >
            ← Back to User Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
