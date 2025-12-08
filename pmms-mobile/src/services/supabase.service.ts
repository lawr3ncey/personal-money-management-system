/**
 * Supabase Service
 * Initializes Supabase client for real backend operations
 * Only used when USE_DUMMY_DATA = false
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/constants/config';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * Check if Supabase is properly configured
 */
export const isSupabaseConfigured = (): boolean => {
  return SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY';
};
