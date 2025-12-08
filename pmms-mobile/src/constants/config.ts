/**
 * Environment Configuration
 * 
 * DUMMY MODE (Current):
 * - All data stored in AsyncStorage
 * - No real Supabase connection
 * - Perfect for development/testing UI
 * 
 * TO ENABLE REAL SUPABASE:
 * 1. Create a Supabase project at https://supabase.com
 * 2. Run the SQL schema from supabase-schema.sql
 * 3. Get your project URL and anon key from Supabase dashboard
 * 4. Replace the values below
 * 5. Change USE_DUMMY_DATA to false
 */

// ⚠️ SET TO false WHEN YOU WANT TO USE REAL SUPABASE
export const USE_DUMMY_DATA = true;

// Supabase Configuration
// Replace these with your actual Supabase project credentials
export const SUPABASE_URL = 'https://your-project.supabase.co';
export const SUPABASE_ANON_KEY = 'your-anon-key-here';

// App Configuration
export const APP_NAME = '6 Jars Money Manager';
export const APP_VERSION = '1.0.0';
export const DEFAULT_CURRENCY = 'PHP';

// Storage Keys (for dummy mode)
export const STORAGE_KEYS = {
  USER: '@pmms_user',
  USERS: '@pmms_users',
  SESSION: '@pmms_session',
  PASSWORDS: '@pmms_passwords',
  JARS: '@pmms_jars',
  TRANSACTIONS: '@pmms_transactions',
  INCOME_HISTORY: '@pmms_income_history',
  BUDGETS: '@pmms_budgets',
  GOALS: '@pmms_goals',
  RECURRING: '@pmms_recurring',
  MONTHLY_REPORTS: '@pmms_monthly_reports',
  LAST_SYNC: '@pmms_last_sync',
} as const;

// Default Jars Configuration
export const DEFAULT_JARS = [
  {
    name: 'Necessities',
    category: 'NEC' as const,
    percentage: 55,
    color: '#10b981',
    icon: '🏠',
    description: 'Bills, food, transportation',
  },
  {
    name: 'Financial Freedom',
    category: 'FFA' as const,
    percentage: 10,
    color: '#3b82f6',
    icon: '💰',
    description: 'Investments, passive income',
  },
  {
    name: 'Education',
    category: 'EDU' as const,
    percentage: 10,
    color: '#8b5cf6',
    icon: '📚',
    description: 'Books, courses, skills',
  },
  {
    name: 'Long-term Savings',
    category: 'LTSS' as const,
    percentage: 10,
    color: '#f59e0b',
    icon: '🏦',
    description: 'Emergency fund, big purchases',
  },
  {
    name: 'Play',
    category: 'PLAY' as const,
    percentage: 10,
    color: '#ef4444',
    icon: '🎮',
    description: 'Fun, hobbies, entertainment',
  },
  {
    name: 'Give',
    category: 'GIVE' as const,
    percentage: 5,
    color: '#ec4899',
    icon: '🎁',
    description: 'Charity, gifts, donations',
  },
];

// Theme Colors
export const COLORS = {
  primary: '#3b82f6',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
  
  // Gray scale - accessible via COLORS.gray[50], COLORS.gray[100], etc.
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  } as const,
};

// Animation Durations (ms)
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// Network Delays (ms) - for dummy mode
export const NETWORK_DELAYS = {
  fetch: 800,
  save: 400,
  sync: 600,
  login: 1000,
};
