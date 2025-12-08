import React, { useState } from 'react';
import authService from '../services/authService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

/**
 * AuthService Demo Component
 * 
 * This component demonstrates how to use the standalone authService.js
 * directly in your components without going through AuthContext.
 * 
 * This is useful for:
 * - Testing the authService
 * - Understanding the API
 * - Prototyping features
 */
const AuthServiceDemo = () => {
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [allUsers, setAllUsers] = useState([]);
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [registerForm, setRegisterForm] = useState({ 
    name: '', 
    username: '',
    email: '', 
    phone: '',
    age: '',
    gender: '',
    address: '',
    password: '' 
  });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const updateDisplay = () => {
    setCurrentUser(authService.getCurrentUser());
    setAllUsers(authService.getUsers());
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setOutput('');

    try {
      const result = await authService.registerUser(
        registerForm.name,
        registerForm.username,
        registerForm.email,
        registerForm.phone,
        parseInt(registerForm.age),
        registerForm.gender,
        registerForm.address,
        registerForm.password
      );
      setOutput(`✅ ${result.message}\n\nUser: ${JSON.stringify(result.user, null, 2)}`);
      setRegisterForm({ name: '', username: '', email: '', phone: '', age: '', gender: '', address: '', password: '' });
      updateDisplay();
    } catch (error) {
      setOutput(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setOutput('');

    try {
      const result = await authService.loginUser(loginForm.email, loginForm.password);
      setOutput(`✅ ${result.message}\n\nUser: ${JSON.stringify(result.user, null, 2)}`);
      setLoginForm({ email: '', password: '' });
      updateDisplay();
    } catch (error) {
      setOutput(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    const result = authService.logoutUser();
    setOutput(`✅ ${result.message}`);
    updateDisplay();
  };

  const handleQuickTest = async () => {
    setIsLoading(true);
    setOutput('Running quick test...\n\n');

    try {
      // Register a test user
      const registerResult = await authService.registerUser(
        'Test User',
        `testuser${Date.now()}`,
        `test${Date.now()}@example.com`,
        '+63 912 345 6789',
        25,
        'prefer-not-to-say',
        '123 Test Street, Manila',
        'test123'
      );
      setOutput(prev => prev + `✅ Registered: ${registerResult.user.email}\n\n`);

      // Login with test user
      const loginResult = await authService.loginUser(
        registerResult.user.email,
        'test123'
      );
      setOutput(prev => prev + `✅ Logged in: ${loginResult.user.name}\n\n`);

      // Check auth status
      const isAuth = authService.isAuthenticated();
      setOutput(prev => prev + `✅ Authenticated: ${isAuth}\n\n`);

      // Get current user
      const user = authService.getCurrentUser();
      setOutput(prev => prev + `✅ Current user: ${user.name}\n\n`);

      // Logout
      authService.logoutUser();
      setOutput(prev => prev + `✅ Logged out\n\n`);

      const isAuthAfter = authService.isAuthenticated();
      setOutput(prev => prev + `✅ Authenticated after logout: ${isAuthAfter}\n\n`);

      setOutput(prev => prev + '✅ Quick test completed!');
      updateDisplay();
    } catch (error) {
      setOutput(prev => prev + `❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            🔐 AuthService Demo
          </h1>
          <p className="text-gray-600">
            Test the standalone authService.js API
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Register Form */}
          <Card>
            <h2 className="text-xl font-bold mb-4">📝 Register New User</h2>
            <form onSubmit={handleRegister} className="space-y-2">
              <input
                type="text"
                placeholder="Full Name"
                value={registerForm.name}
                onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                disabled={isLoading}
              />
              <input
                type="text"
                placeholder="Username"
                value={registerForm.username}
                onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                disabled={isLoading}
              />
              <input
                type="email"
                placeholder="Email"
                value={registerForm.email}
                onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                disabled={isLoading}
              />
              <input
                type="tel"
                placeholder="Phone (+63 912 345 6789)"
                value={registerForm.phone}
                onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                disabled={isLoading}
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Age"
                  value={registerForm.age}
                  onChange={(e) => setRegisterForm({ ...registerForm, age: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                  disabled={isLoading}
                />
                <select
                  value={registerForm.gender}
                  onChange={(e) => setRegisterForm({ ...registerForm, gender: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                  disabled={isLoading}
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
              <textarea
                placeholder="Address"
                value={registerForm.address}
                onChange={(e) => setRegisterForm({ ...registerForm, address: e.target.value })}
                rows="2"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 text-sm resize-none"
                disabled={isLoading}
              />
              <input
                type="password"
                placeholder="Password (min 6 chars)"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 text-sm"
                disabled={isLoading}
              />
              <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
              </Button>
            </form>
          </Card>

          {/* Login Form */}
          <Card>
            <h2 className="text-xl font-bold mb-4">🔑 Login</h2>
            <form onSubmit={handleLogin} className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                disabled={isLoading}
              />
              <input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                disabled={isLoading}
              />
              <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
            <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm">
              <strong>Demo User:</strong><br />
              Email: demo@example.com<br />
              Password: demo123
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-6">
          <h2 className="text-xl font-bold mb-4">⚡ Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleQuickTest} variant="primary" disabled={isLoading}>
              🧪 Run Quick Test
            </Button>
            <Button onClick={handleLogout} variant="secondary" disabled={isLoading || !currentUser}>
              🚪 Logout
            </Button>
            <Button onClick={updateDisplay} variant="secondary" disabled={isLoading}>
              🔄 Refresh Display
            </Button>
          </div>
        </Card>

        {/* Current Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current User */}
          <Card>
            <h2 className="text-xl font-bold mb-4">👤 Current User</h2>
            {currentUser ? (
              <div className="space-y-2">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✅ Authenticated: <strong>Yes</strong>
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm"><strong>ID:</strong> {currentUser.id}</p>
                  <p className="text-sm"><strong>Name:</strong> {currentUser.name}</p>
                  <p className="text-sm"><strong>Email:</strong> {currentUser.email}</p>
                  <p className="text-sm"><strong>Created:</strong> {new Date(currentUser.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600">
                  ❌ Not logged in
                </p>
              </div>
            )}
          </Card>

          {/* All Users */}
          <Card>
            <h2 className="text-xl font-bold mb-4">👥 All Users ({allUsers.length})</h2>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {allUsers.length > 0 ? (
                allUsers.map((user) => (
                  <div key={user.id} className="p-2 bg-gray-50 rounded text-sm">
                    <p><strong>{user.name}</strong></p>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-600">No users registered yet</p>
              )}
            </div>
          </Card>
        </div>

        {/* Output Console */}
        {output && (
          <Card className="mt-6">
            <h2 className="text-xl font-bold mb-4">📄 Output</h2>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
              {output}
            </pre>
          </Card>
        )}

        {/* API Reference */}
        <Card className="mt-6">
          <h2 className="text-xl font-bold mb-4">📚 API Reference</h2>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <code className="text-primary-600 font-mono text-xs">
                authService.registerUser(name, username, email, phone, age, gender, address, password)
              </code>
              <p className="text-gray-600 mt-1 text-xs">Register a new user account with complete profile</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <code className="text-primary-600 font-mono">
                authService.loginUser(email, password)
              </code>
              <p className="text-gray-600 mt-1">Login with email and password</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <code className="text-primary-600 font-mono">
                authService.logoutUser()
              </code>
              <p className="text-gray-600 mt-1">Logout current user</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <code className="text-primary-600 font-mono">
                authService.getCurrentUser()
              </code>
              <p className="text-gray-600 mt-1">Get current logged-in user</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <code className="text-primary-600 font-mono">
                authService.isAuthenticated()
              </code>
              <p className="text-gray-600 mt-1">Check if user is logged in</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <code className="text-primary-600 font-mono">
                authService.getUsers()
              </code>
              <p className="text-gray-600 mt-1">Get all users (for debugging)</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthServiceDemo;
