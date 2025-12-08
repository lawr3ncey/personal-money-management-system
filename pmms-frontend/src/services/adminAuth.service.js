/**
 * Admin Authentication Service
 * 
 * Separate authentication for admin panel.
 * Uses localStorage for dummy data.
 * 
 * 🔴 TODO: Replace with Supabase
 * - Create admin_users table
 * - Use Supabase Auth with admin role
 */

const ADMIN_STORAGE_KEY = 'pmms_admin_session';

// Dummy admin credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
  name: 'System Administrator',
  email: 'admin@pmms.com',
  role: 'superadmin'
};

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const adminAuthService = {
  /**
   * Admin login
   */
  login: async (username, password) => {
    await delay();
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const session = {
        user: {
          username: ADMIN_CREDENTIALS.username,
          name: ADMIN_CREDENTIALS.name,
          email: ADMIN_CREDENTIALS.email,
          role: ADMIN_CREDENTIALS.role
        },
        token: `admin_token_${Date.now()}`,
        loginAt: new Date().toISOString()
      };
      
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(session));
      return { success: true, data: session };
    }
    
    throw new Error('Invalid username or password');
  },

  /**
   * Admin logout
   */
  logout: () => {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  },

  /**
   * Get current admin session
   */
  getSession: () => {
    const sessionStr = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!sessionStr) return null;
    
    try {
      return JSON.parse(sessionStr);
    } catch {
      return null;
    }
  },

  /**
   * Check if admin is authenticated
   */
  isAuthenticated: () => {
    return !!adminAuthService.getSession();
  },

  /**
   * Get current admin user
   */
  getCurrentUser: () => {
    const session = adminAuthService.getSession();
    return session?.user || null;
  }
};

export default adminAuthService;
