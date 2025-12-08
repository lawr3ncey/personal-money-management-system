/**
 * Authentication Service (Dummy In-Memory Version)
 * 
 * This service manages user authentication with in-memory data storage.
 * All data is stored in a simple JavaScript array and will be lost on refresh.
 * 
 * 🔴 TO REPLACE WITH SUPABASE LATER:
 * - Replace the users array with Supabase Auth API calls
 * - Use supabase.auth.signUp() instead of registerUser()
 * - Use supabase.auth.signInWithPassword() instead of loginUser()
 * - Use supabase.auth.signOut() instead of logout()
 * - Use supabase.auth.getUser() instead of getCurrentUser()
 * 
 * The interface will remain exactly the same, just swap the implementation.
 */

// ============================================================
// IN-MEMORY USER DATABASE (DUMMY DATA)
// This will be replaced with Supabase database
// ============================================================
const users = [
  // Default demo user for testing
  {
    id: 'demo-user-001',
    name: 'Demo User',
    username: 'demouser',
    email: 'demo@example.com',
    phone: '+63 912 345 6789',
    age: 25,
    gender: 'prefer-not-to-say',
    address: '123 Demo Street, Manila, Metro Manila, 1000',
    password: 'demo123', // ⚠️ In production, passwords would be hashed
    createdAt: new Date().toISOString(),
  }
];

// Current logged-in user (session state)
let currentUser = null;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Validate email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate a unique user ID
 */
const generateUserId = () => {
  return `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Simulate async operation (like API call)
 */
const simulateNetworkDelay = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// ============================================================
// AUTHENTICATION FUNCTIONS
// ============================================================

/**
 * Register a new user
 * 
 * @param {string} name - User's full name
 * @param {string} username - User's username
 * @param {string} email - User's email address
 * @param {string} phone - User's phone number
 * @param {number} age - User's age
 * @param {string} gender - User's gender (male, female, prefer-not-to-say)
 * @param {string} address - User's address
 * @param {string} password - User's password
 * @returns {Promise<Object>} Success response with user data
 * @throws {Error} If validation fails or email/username already exists
 * 
 * 🔴 REPLACE WITH SUPABASE:
 * const { data, error } = await supabase.auth.signUp({
 *   email: email,
 *   password: password,
 *   options: {
 *     data: { name, username, phone, age, gender, address }
 *   }
 * });
 */
export const registerUser = async (name, username, email, phone, age, gender, address, password) => {
  // Simulate network delay
  await simulateNetworkDelay();

  // Validation
  if (!name || !name.trim()) {
    throw new Error('Name is required');
  }

  if (!username || !username.trim()) {
    throw new Error('Username is required');
  }

  if (username.length < 3) {
    throw new Error('Username must be at least 3 characters');
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    throw new Error('Username can only contain letters, numbers, and underscores');
  }

  if (!email || !email.trim()) {
    throw new Error('Email is required');
  }

  if (!isValidEmail(email)) {
    throw new Error('Please enter a valid email address');
  }

  if (!phone || !phone.trim()) {
    throw new Error('Phone number is required');
  }

  if (!age || age < 13 || age > 120) {
    throw new Error('Please enter a valid age (13-120)');
  }

  if (!gender) {
    throw new Error('Gender is required');
  }

  if (!address || !address.trim() || address.trim().length < 10) {
    throw new Error('Please enter a complete address (minimum 10 characters)');
  }

  if (!password) {
    throw new Error('Password is required');
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  // Check if email already exists
  const existingEmail = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (existingEmail) {
    throw new Error('Email already registered. Please use a different email or login.');
  }

  // Check if username already exists
  const existingUsername = users.find(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  );

  if (existingUsername) {
    throw new Error('Username already taken. Please choose a different username.');
  }

  // Create new user
  const newUser = {
    id: generateUserId(),
    name: name.trim(),
    username: username.toLowerCase().trim(),
    email: email.toLowerCase().trim(),
    phone: phone.trim(),
    age: parseInt(age),
    gender: gender,
    address: address.trim(),
    password: password, // ⚠️ In production, this would be hashed
    createdAt: new Date().toISOString(),
  };

  // Add to users array
  users.push(newUser);

  // Return user data (without password)
  const { password: _, ...userWithoutPassword } = newUser;
  
  return {
    success: true,
    user: userWithoutPassword,
    message: 'Account created successfully. You may now log in.',
  };
};

/**
 * Login user with email and password
 * 
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<Object>} Success response with user data
 * @throws {Error} If credentials are invalid
 * 
 * 🔴 REPLACE WITH SUPABASE:
 * const { data, error } = await supabase.auth.signInWithPassword({
 *   email: email,
 *   password: password
 * });
 */
export const loginUser = async (email, password) => {
  // Simulate network delay
  await simulateNetworkDelay();

  // Validation
  if (!email || !email.trim()) {
    throw new Error('Email is required');
  }

  if (!password) {
    throw new Error('Password is required');
  }

  // Find user by email
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  // Validate credentials
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }

  // Set as current user (session)
  const { password: _, ...userWithoutPassword } = user;
  currentUser = userWithoutPassword;

  return {
    success: true,
    user: userWithoutPassword,
    message: 'Login successful',
  };
};

/**
 * Logout current user
 * 
 * 🔴 REPLACE WITH SUPABASE:
 * await supabase.auth.signOut();
 */
export const logoutUser = () => {
  currentUser = null;
  return {
    success: true,
    message: 'Logged out successfully',
  };
};

/**
 * Get current logged-in user
 * 
 * @returns {Object|null} Current user object or null if not logged in
 * 
 * 🔴 REPLACE WITH SUPABASE:
 * const { data: { user } } = await supabase.auth.getUser();
 */
export const getCurrentUser = () => {
  return currentUser;
};

/**
 * Check if user is authenticated
 * 
 * @returns {boolean} True if user is logged in
 */
export const isAuthenticated = () => {
  return currentUser !== null;
};

/**
 * Get all registered users (for debugging/admin purposes)
 * ⚠️ This function should NOT be exposed in production!
 * 
 * @returns {Array} Array of all users (without passwords)
 */
export const getUsers = () => {
  return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
};

/**
 * Update user profile
 * 
 * @param {Object} updates - Object with fields to update (name, email)
 * @returns {Promise<Object>} Updated user data
 * @throws {Error} If user not logged in or validation fails
 * 
 * 🔴 REPLACE WITH SUPABASE:
 * const { data, error } = await supabase.auth.updateUser({
 *   email: updates.email,
 *   data: { name: updates.name }
 * });
 */
export const updateUserProfile = async (updates) => {
  await simulateNetworkDelay();

  if (!currentUser) {
    throw new Error('User not logged in');
  }

  // Find user in array
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex === -1) {
    throw new Error('User not found');
  }

  // Validate email if being updated
  if (updates.email && !isValidEmail(updates.email)) {
    throw new Error('Invalid email address');
  }

  // Check if new email already exists
  if (updates.email && updates.email !== currentUser.email) {
    const emailExists = users.some(
      u => u.email.toLowerCase() === updates.email.toLowerCase() && u.id !== currentUser.id
    );
    if (emailExists) {
      throw new Error('Email already in use');
    }
  }

  // Update user
  if (updates.name) users[userIndex].name = updates.name.trim();
  if (updates.email) users[userIndex].email = updates.email.toLowerCase().trim();

  // Update current user session
  const { password, ...userWithoutPassword } = users[userIndex];
  currentUser = userWithoutPassword;

  return {
    success: true,
    user: userWithoutPassword,
    message: 'Profile updated successfully',
  };
};

/**
 * Change user password
 * 
 * @param {string} currentPassword - User's current password
 * @param {string} newPassword - New password
 * @returns {Promise<Object>} Success response
 * @throws {Error} If validation fails
 * 
 * 🔴 REPLACE WITH SUPABASE:
 * const { error } = await supabase.auth.updateUser({
 *   password: newPassword
 * });
 */
export const changePassword = async (currentPassword, newPassword) => {
  await simulateNetworkDelay();

  if (!currentUser) {
    throw new Error('User not logged in');
  }

  const userIndex = users.findIndex(u => u.id === currentUser.id);
  if (userIndex === -1) {
    throw new Error('User not found');
  }

  // Verify current password
  if (users[userIndex].password !== currentPassword) {
    throw new Error('Current password is incorrect');
  }

  // Validate new password
  if (newPassword.length < 6) {
    throw new Error('New password must be at least 6 characters');
  }

  // Update password
  users[userIndex].password = newPassword;

  return {
    success: true,
    message: 'Password changed successfully',
  };
};

// ============================================================
// DEFAULT EXPORT (Optional)
// ============================================================
const authService = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  isAuthenticated,
  getUsers,
  updateUserProfile,
  changePassword,
};

export default authService;
