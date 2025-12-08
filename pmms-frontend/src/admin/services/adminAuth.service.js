// Admin Authentication Service
// Handles admin login, logout, and session management

const ADMIN_STORAGE_KEY = 'admin_session';

// Dummy admin credentials
const ADMIN_CREDENTIALS = [
  {
    id: 'admin_001',
    username: 'admin',
    email: 'admin@pmms.com',
    password: 'admin123456', // In production, this would be hashed
    role: 'super_admin',
    name: 'System Administrator',
  },
  {
    id: 'admin_002',
    username: 'moderator',
    email: 'moderator@pmms.com',
    password: 'moderator123',
    role: 'admin',
    name: 'Content Moderator',
  },
];

class AdminAuthService {
  constructor() {
    this.currentAdmin = this.getStoredAdmin();
  }

  // Login
  async login(username, password) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find admin by username or email
    const admin = ADMIN_CREDENTIALS.find(
      a => (a.username === username || a.email === username) && a.password === password
    );

    if (!admin) {
      throw new Error('Invalid credentials');
    }

    // Store session (exclude password)
    const session = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      name: admin.name,
      loginAt: new Date().toISOString(),
    };

    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(session));
    this.currentAdmin = session;

    return session;
  }

  // Logout
  logout() {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    this.currentAdmin = null;
  }

  // Check if admin is logged in
  isAuthenticated() {
    return !!this.currentAdmin;
  }

  // Get current admin
  getCurrentAdmin() {
    return this.currentAdmin;
  }

  // Get stored admin from localStorage
  getStoredAdmin() {
    try {
      const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error reading admin session:', error);
      return null;
    }
  }

  // Check if admin is super admin
  isSuperAdmin() {
    return this.currentAdmin?.role === 'super_admin';
  }

  // Check if admin has permission
  hasPermission(permission) {
    if (!this.currentAdmin) return false;
    if (this.currentAdmin.role === 'super_admin') return true;
    
    // Define permissions for regular admin
    const adminPermissions = [
      'view_users',
      'view_transactions',
      'send_notifications',
      'view_logs',
    ];
    
    return adminPermissions.includes(permission);
  }
}

// Export singleton instance
export default new AdminAuthService();
