/**
 * Mock Authentication Service
 * 
 * This service simulates authentication functionality using localStorage.
 * 
 * TO REPLACE WITH REAL AUTH LATER:
 * - Firebase Auth: Replace with firebase.auth() methods
 * - JWT + Node: Replace with actual API calls to /auth endpoints
 * - The interface remains the same, just swap the implementation
 */

// Simulated network delay (ms)
const NETWORK_DELAY = 800;

// Mock user database stored in localStorage
const MOCK_USERS_KEY = 'pmms_mock_users';
const CURRENT_USER_KEY = 'pmms_current_user';
const AUTH_TOKEN_KEY = 'pmms_auth_token';

// Default demo user
const DEFAULT_USERS = [
  {
    id: 'user_demo_001',
    email: 'demo@example.com',
    password: 'demo123', // In real app, this would be hashed
    name: 'Demo User',
    username: 'demouser',
    phone: '+63 912 345 6789',
    age: 25,
    gender: 'prefer-not-to-say',
    address: '123 Demo Street, Manila, Metro Manila, 1000',
    role: 'user',
    createdAt: new Date().toISOString(),
    preferences: {
      currency: 'PHP',
      theme: 'light',
      notifications: true
    }
  },
  {
    id: 'admin_001',
    email: 'admin@pmms.com',
    password: 'admin123456', // In real app, this would be hashed
    name: 'System Administrator',
    username: 'admin',
    phone: '+63 917 123 4567',
    age: 30,
    gender: 'male',
    address: 'Admin Office, Manila, Philippines',
    role: 'admin',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: null,
    preferences: {
      currency: 'PHP',
      theme: 'light',
      notifications: true
    }
  }
];

// Initialize mock users if not exists
const initializeMockUsers = () => {
  const existingUsers = localStorage.getItem(MOCK_USERS_KEY);
  if (!existingUsers) {
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(DEFAULT_USERS));
  }
};

// Get all mock users
const getMockUsers = () => {
  initializeMockUsers();
  const users = localStorage.getItem(MOCK_USERS_KEY);
  return JSON.parse(users) || [];
};

// Save mock users
const saveMockUsers = (users) => {
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
};

// Generate fake token
const generateToken = (userId) => {
  return `mock_token_${userId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Simulate async operation with delay
const simulateDelay = (ms = NETWORK_DELAY) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const mockAuthService = {
  /**
   * Register a new user
   * @param {Object} userData - { name, username, email, phone, age, gender, address, password }
   * @returns {Promise} - { success, data: { user, token }, message }
   */
  register: async (userData) => {
    await simulateDelay();
    
    const { name, username, email, phone, age, gender, address, password } = userData;
    
    // Validation
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required');
    }
    
    if (username && username.length < 3) {
      throw new Error('Username must be at least 3 characters');
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    
    const users = getMockUsers();
    
    // Check if email already exists
    const existingEmail = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingEmail) {
      throw new Error('Email already registered');
    }
    
    // Check if username already exists
    if (username) {
      const existingUsername = users.find(u => u.username && u.username.toLowerCase() === username.toLowerCase());
      if (existingUsername) {
        throw new Error('Username already taken');
      }
    }
    
    // Create new user
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      username: username || null,
      email: email.toLowerCase(),
      phone: phone || null,
      age: age || null,
      gender: gender || null,
      address: address || null,
      password, // In real app, this would be hashed
      role: 'user', // Default role for new registrations
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLogin: null,
      preferences: {
        currency: 'PHP',
        theme: 'light',
        notifications: true
      }
    };
    
    // Save to mock database
    users.push(newUser);
    saveMockUsers(users);
    
    // Generate token
    const token = generateToken(newUser.id);
    
    // Create user object without password
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    
    // Save to session
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    
    return {
      success: true,
      data: {
        user: userWithoutPassword,
        token
      },
      message: 'Registration successful'
    };
  },

  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise} - { success, data: { user, token }, message }
   */
  login: async (credentials) => {
    await simulateDelay();
    
    const { email, password } = credentials;
    
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    const users = getMockUsers();
    
    // Find user
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Generate token
    const token = generateToken(user.id);
    
    // Create user object without password
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    
    // Save to session
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    
    return {
      success: true,
      data: {
        user: userWithoutPassword,
        token
      },
      message: 'Login successful'
    };
  },

  /**
   * Logout current user
   */
  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },

  /**
   * Get current logged in user
   * @returns {Object|null} - User object or null
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem(CURRENT_USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Get current auth token
   * @returns {string|null} - Token or null
   */
  getToken: () => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  },

  /**
   * Check if user is authenticated
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem(AUTH_TOKEN_KEY) && !!localStorage.getItem(CURRENT_USER_KEY);
  },

  /**
   * Update user profile
   * @param {Object} updates - { name, preferences }
   * @returns {Promise} - Updated user
   */
  updateProfile: async (updates) => {
    await simulateDelay();
    
    const currentUser = mockAuthService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Not authenticated');
    }
    
    const users = getMockUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Update user
    const updatedUser = {
      ...users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    users[userIndex] = updatedUser;
    saveMockUsers(users);
    
    // Update session
    const userWithoutPassword = { ...updatedUser };
    delete userWithoutPassword.password;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    
    return {
      success: true,
      data: { user: userWithoutPassword },
      message: 'Profile updated successfully'
    };
  },

  /**
   * Change password
   * @param {Object} data - { currentPassword, newPassword }
   * @returns {Promise}
   */
  changePassword: async ({ currentPassword, newPassword }) => {
    await simulateDelay();
    
    const currentUser = mockAuthService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Not authenticated');
    }
    
    const users = getMockUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Verify current password
    if (users[userIndex].password !== currentPassword) {
      throw new Error('Current password is incorrect');
    }
    
    if (newPassword.length < 6) {
      throw new Error('New password must be at least 6 characters');
    }
    
    // Update password
    users[userIndex].password = newPassword;
    users[userIndex].updatedAt = new Date().toISOString();
    saveMockUsers(users);
    
    return {
      success: true,
      message: 'Password changed successfully'
    };
  },

  /**
   * Delete account
   * @param {string} password - Current password for confirmation
   * @returns {Promise}
   */
  deleteAccount: async (password) => {
    await simulateDelay();
    
    const currentUser = mockAuthService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Not authenticated');
    }
    
    const users = getMockUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Verify password
    if (users[userIndex].password !== password) {
      throw new Error('Password is incorrect');
    }
    
    // Remove user
    users.splice(userIndex, 1);
    saveMockUsers(users);
    
    // Clear session
    mockAuthService.logout();
    
    // Clear user data
    localStorage.removeItem(`pmms_cloud_data_${currentUser.id}`);
    
    return {
      success: true,
      message: 'Account deleted successfully'
    };
  }
};

export default mockAuthService;
