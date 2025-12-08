/**
 * Admin Service (Dummy In-Memory Version)
 * 
 * This service manages admin operations with in-memory data storage.
 * All data is stored in a simple JavaScript array.
 * 
 * 🔴 TO REPLACE WITH SUPABASE LATER:
 * - Replace users array with Supabase queries
 * - Use supabase.from('users').select() instead of getUsers()
 * - Use supabase.from('users').insert() instead of createUser()
 * - Use supabase.from('users').update() instead of updateUser()
 * - Use supabase.from('users').delete() instead of deleteUser()
 * - Use full-text search with Supabase instead of client-side filtering
 * 
 * The interface will remain exactly the same, just swap the implementation.
 */

// ============================================================
// IN-MEMORY USER DATABASE (DUMMY DATA)
// This will be replaced with Supabase database
// ============================================================
let users = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    phone: "+63 912 345 6789",
    age: 28,
    gender: "male",
    address: "123 Main Street, Manila, Metro Manila, 1000",
    status: "active",
    role: "user",
    createdAt: "2024-01-15T08:30:00.000Z",
    lastLogin: "2025-12-07T10:30:00.000Z"
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    email: "jane@example.com",
    phone: "+63 917 234 5678",
    age: 32,
    gender: "female",
    address: "456 Park Avenue, Quezon City, Metro Manila, 1100",
    status: "active",
    role: "user",
    createdAt: "2024-02-20T14:15:00.000Z",
    lastLogin: "2025-12-06T16:45:00.000Z"
  },
  {
    id: 3,
    name: "Bob Johnson",
    username: "bobjohnson",
    email: "bob@example.com",
    phone: "+63 915 987 6543",
    age: 35,
    gender: "male",
    address: "789 Oak Road, Makati City, Metro Manila, 1200",
    status: "inactive",
    role: "user",
    createdAt: "2024-03-10T09:00:00.000Z",
    lastLogin: "2025-11-15T12:00:00.000Z"
  },
  {
    id: 4,
    name: "Alice Williams",
    username: "alicew",
    email: "alice@example.com",
    phone: "+63 918 765 4321",
    age: 26,
    gender: "female",
    address: "321 Pine Street, Pasig City, Metro Manila, 1600",
    status: "active",
    role: "user",
    createdAt: "2024-04-05T11:20:00.000Z",
    lastLogin: "2025-12-07T09:15:00.000Z"
  },
  {
    id: 5,
    name: "Charlie Brown",
    username: "charlieb",
    email: "charlie@example.com",
    phone: "+63 919 876 5432",
    age: 41,
    gender: "male",
    address: "654 Elm Avenue, Taguig City, Metro Manila, 1630",
    status: "suspended",
    role: "user",
    createdAt: "2024-05-12T13:45:00.000Z",
    lastLogin: "2025-11-30T14:30:00.000Z"
  },
  {
    id: 6,
    name: "Diana Prince",
    username: "dianap",
    email: "diana@example.com",
    phone: "+63 920 123 4567",
    age: 29,
    gender: "female",
    address: "987 Cedar Lane, Pasay City, Metro Manila, 1300",
    status: "active",
    role: "admin",
    createdAt: "2024-06-18T15:30:00.000Z",
    lastLogin: "2025-12-07T11:00:00.000Z"
  }
];

// Auto-increment ID counter
let nextId = users.length + 1;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Simulate async operation (like API call)
 */
const simulateNetworkDelay = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Validate email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Check if username already exists
 */
const usernameExists = (username, excludeId = null) => {
  return users.some(u => 
    u.username.toLowerCase() === username.toLowerCase() && 
    u.id !== excludeId
  );
};

/**
 * Check if email already exists
 */
const emailExists = (email, excludeId = null) => {
  return users.some(u => 
    u.email.toLowerCase() === email.toLowerCase() && 
    u.id !== excludeId
  );
};

// ============================================================
// ADMIN CRUD OPERATIONS
// ============================================================

/**
 * Get all users with optional filters
 * 
 * @param {Object} filters - { status, role, sortBy, sortOrder }
 * @returns {Promise<Array>} Array of users
 * 
 * 🔴 REPLACE WITH SUPABASE:
 * const { data, error } = await supabase
 *   .from('users')
 *   .select('*')
 *   .order(filters.sortBy, { ascending: filters.sortOrder === 'asc' });
 */
export const getUsers = async (filters = {}) => {
  await simulateNetworkDelay();

  let filteredUsers = [...users];

  // Filter by status
  if (filters.status && filters.status !== 'all') {
    filteredUsers = filteredUsers.filter(u => u.status === filters.status);
  }

  // Filter by role
  if (filters.role && filters.role !== 'all') {
    filteredUsers = filteredUsers.filter(u => u.role === filters.role);
  }

  // Sort
  if (filters.sortBy) {
    const sortOrder = filters.sortOrder === 'desc' ? -1 : 1;
    filteredUsers.sort((a, b) => {
      if (a[filters.sortBy] < b[filters.sortBy]) return -1 * sortOrder;
      if (a[filters.sortBy] > b[filters.sortBy]) return 1 * sortOrder;
      return 0;
    });
  }

  return {
    success: true,
    data: filteredUsers,
    total: filteredUsers.length
  };
};

/**
 * Get user by ID
 * 
 * @param {number} id - User ID
 * @returns {Promise<Object>} User object
 * 
 * 🔴 REPLACE WITH SUPABASE:
 * const { data, error } = await supabase
 *   .from('users')
 *   .select('*')
 *   .eq('id', id)
 *   .single();
 */
export const getUserById = async (id) => {
  await simulateNetworkDelay();

  const user = users.find(u => u.id === id);

  if (!user) {
    throw new Error('User not found');
  }

  return {
    success: true,
    data: user
  };
};

/**
 * Create new user
 * 
 * @param {Object} userData - User data object
 * @returns {Promise<Object>} Created user
 * 
 * 🔴 REPLACE WITH SUPABASE:
 * const { data, error } = await supabase
 *   .from('users')
 *   .insert([userData])
 *   .select()
 *   .single();
 */
export const createUser = async (userData) => {
  await simulateNetworkDelay();

  // Validation
  if (!userData.name || !userData.name.trim()) {
    throw new Error('Name is required');
  }

  if (!userData.username || !userData.username.trim()) {
    throw new Error('Username is required');
  }

  if (userData.username.length < 3) {
    throw new Error('Username must be at least 3 characters');
  }

  if (!userData.email || !userData.email.trim()) {
    throw new Error('Email is required');
  }

  if (!isValidEmail(userData.email)) {
    throw new Error('Invalid email format');
  }

  if (usernameExists(userData.username)) {
    throw new Error('Username already exists');
  }

  if (emailExists(userData.email)) {
    throw new Error('Email already exists');
  }

  // Create new user
  const newUser = {
    id: nextId++,
    name: userData.name.trim(),
    username: userData.username.toLowerCase().trim(),
    email: userData.email.toLowerCase().trim(),
    phone: userData.phone?.trim() || '',
    age: userData.age || null,
    gender: userData.gender || '',
    address: userData.address?.trim() || '',
    status: userData.status || 'active',
    role: userData.role || 'user',
    createdAt: new Date().toISOString(),
    lastLogin: null
  };

  users.push(newUser);

  return {
    success: true,
    data: newUser,
    message: 'User created successfully'
  };
};

/**
 * Update user
 * 
 * @param {number} id - User ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated user
 * 
 * 🔴 REPLACE WITH SUPABASE:
 * const { data, error } = await supabase
 *   .from('users')
 *   .update(updates)
 *   .eq('id', id)
 *   .select()
 *   .single();
 */
export const updateUser = async (id, updates) => {
  await simulateNetworkDelay();

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    throw new Error('User not found');
  }

  // Validation
  if (updates.username && usernameExists(updates.username, id)) {
    throw new Error('Username already exists');
  }

  if (updates.email && emailExists(updates.email, id)) {
    throw new Error('Email already exists');
  }

  if (updates.email && !isValidEmail(updates.email)) {
    throw new Error('Invalid email format');
  }

  // Update user
  const updatedUser = {
    ...users[userIndex],
    ...updates,
    username: updates.username ? updates.username.toLowerCase().trim() : users[userIndex].username,
    email: updates.email ? updates.email.toLowerCase().trim() : users[userIndex].email,
  };

  users[userIndex] = updatedUser;

  return {
    success: true,
    data: updatedUser,
    message: 'User updated successfully'
  };
};

/**
 * Delete user
 * 
 * @param {number} id - User ID
 * @returns {Promise<Object>} Success response
 * 
 * 🔴 REPLACE WITH SUPABASE:
 * const { error } = await supabase
 *   .from('users')
 *   .delete()
 *   .eq('id', id);
 */
export const deleteUser = async (id) => {
  await simulateNetworkDelay();

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    throw new Error('User not found');
  }

  const deletedUser = users[userIndex];
  users.splice(userIndex, 1);

  return {
    success: true,
    data: deletedUser,
    message: 'User deleted successfully'
  };
};

/**
 * Search users by query
 * 
 * @param {string} query - Search query
 * @returns {Promise<Array>} Matching users
 * 
 * 🔴 REPLACE WITH SUPABASE:
 * const { data, error } = await supabase
 *   .from('users')
 *   .select('*')
 *   .or(`name.ilike.%${query}%,email.ilike.%${query}%,username.ilike.%${query}%`);
 */
export const searchUsers = async (query) => {
  await simulateNetworkDelay();

  if (!query || !query.trim()) {
    return getUsers();
  }

  const searchTerm = query.toLowerCase().trim();
  const results = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm) ||
    u.email.toLowerCase().includes(searchTerm) ||
    u.username.toLowerCase().includes(searchTerm) ||
    u.phone.includes(searchTerm)
  );

  return {
    success: true,
    data: results,
    total: results.length
  };
};

/**
 * Get user statistics
 * 
 * @returns {Promise<Object>} Statistics object
 * 
 * 🔴 REPLACE WITH SUPABASE:
 * Use aggregate queries for real-time stats
 */
export const getUserStats = async () => {
  await simulateNetworkDelay(300);

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    admins: users.filter(u => u.role === 'admin').length,
    users: users.filter(u => u.role === 'user').length,
    newThisMonth: users.filter(u => {
      const createdDate = new Date(u.createdAt);
      const now = new Date();
      return createdDate.getMonth() === now.getMonth() && 
             createdDate.getFullYear() === now.getFullYear();
    }).length
  };

  return {
    success: true,
    data: stats
  };
};

/**
 * Bulk update user status
 * 
 * @param {Array<number>} ids - User IDs
 * @param {string} status - New status
 * @returns {Promise<Object>} Success response
 */
export const bulkUpdateStatus = async (ids, status) => {
  await simulateNetworkDelay();

  const validStatuses = ['active', 'inactive', 'suspended'];
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid status');
  }

  let updated = 0;
  ids.forEach(id => {
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      users[userIndex].status = status;
      updated++;
    }
  });

  return {
    success: true,
    message: `${updated} user(s) updated successfully`
  };
};

/**
 * Bulk delete users
 * 
 * @param {Array<number>} ids - User IDs
 * @returns {Promise<Object>} Success response
 */
export const bulkDeleteUsers = async (ids) => {
  await simulateNetworkDelay();

  users = users.filter(u => !ids.includes(u.id));

  return {
    success: true,
    message: `${ids.length} user(s) deleted successfully`
  };
};

// ============================================================
// DEFAULT EXPORT
// ============================================================
const adminService = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
  getUserStats,
  bulkUpdateStatus,
  bulkDeleteUsers
};

export default adminService;
