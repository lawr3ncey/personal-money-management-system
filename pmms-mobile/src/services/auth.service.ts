/**
 * Authentication Service (DUMMY MODE)
 * Simulates authentication using AsyncStorage
 * Replace with real Supabase auth when USE_DUMMY_DATA = false
 */

import { User, LoginCredentials, RegisterData, AuthSession } from '@/types/database.types';
import { STORAGE_KEYS, NETWORK_DELAYS, USE_DUMMY_DATA } from '@/constants/config';
import storageService from './storage.service';
import { supabase } from './supabase.service';

class AuthService {
  /**
   * Simulate network delay
   */
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Register new user (DUMMY)
   */
  async register(data: RegisterData): Promise<{ user: User | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.login);

      try {
        // Check if user already exists
        const users = await storageService.getItem<User[]>(STORAGE_KEYS.USERS) || [];
        const existingUser = users.find(u => u.email === data.email);

        if (existingUser) {
          return { user: null, error: 'User already exists' };
        }

        // Create new user
        const newUser: User = {
          id: this.generateId(),
          email: data.email,
          name: data.name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Save user
        users.push(newUser);
        await storageService.setItem(STORAGE_KEYS.USERS, users);
        await storageService.setItem(STORAGE_KEYS.USER, newUser);

        // Store password separately (in real app, this would be hashed)
        const passwords = await storageService.getItem<Record<string, string>>(STORAGE_KEYS.PASSWORDS) || {};
        passwords[newUser.id] = data.password;
        await storageService.setItem(STORAGE_KEYS.PASSWORDS, passwords);

        return { user: newUser, error: null };
      } catch (error) {
        return { user: null, error: 'Registration failed' };
      }
    } else {
      // Real Supabase auth
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
        },
      });

      if (error) return { user: null, error: error.message };
      if (!authData.user) return { user: null, error: 'Registration failed' };

      const user: User = {
        id: authData.user.id,
        email: authData.user.email!,
        name: data.name,
        created_at: authData.user.created_at,
        updated_at: authData.user.updated_at || authData.user.created_at,
      };

      return { user, error: null };
    }
  }

  /**
   * Login user (DUMMY)
   */
  async login(credentials: LoginCredentials): Promise<{ user: User | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.login);

      try {
        const users = await storageService.getItem<User[]>(STORAGE_KEYS.USERS) || [];
        const passwords = await storageService.getItem<Record<string, string>>(STORAGE_KEYS.PASSWORDS) || {};

        const user = users.find(u => u.email === credentials.email);

        if (!user || passwords[user.id] !== credentials.password) {
          return { user: null, error: 'Invalid email or password' };
        }

        await storageService.setItem(STORAGE_KEYS.USER, user);
        return { user, error: null };
      } catch (error) {
        return { user: null, error: 'Login failed' };
      }
    } else {
      // Real Supabase auth
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) return { user: null, error: error.message };
      if (!authData.user) return { user: null, error: 'Login failed' };

      const user: User = {
        id: authData.user.id,
        email: authData.user.email!,
        name: authData.user.user_metadata?.name || '',
        created_at: authData.user.created_at,
        updated_at: authData.user.updated_at || authData.user.created_at,
      };

      return { user, error: null };
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<{ error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);
      await storageService.removeItem(STORAGE_KEYS.USER);
      return { error: null };
    } else {
      const { error } = await supabase.auth.signOut();
      return { error: error?.message || null };
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User | null> {
    if (USE_DUMMY_DATA) {
      return await storageService.getItem<User>(STORAGE_KEYS.USER);
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      return {
        id: user.id,
        email: user.email!,
        name: user.user_metadata?.name || '',
        created_at: user.created_at,
        updated_at: user.updated_at || user.created_at,
      };
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<User>): Promise<{ user: User | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        const currentUser = await storageService.getItem<User>(STORAGE_KEYS.USER);
        if (!currentUser) {
          return { user: null, error: 'User not found' };
        }

        const updatedUser: User = {
          ...currentUser,
          ...updates,
          updated_at: new Date().toISOString(),
        };

        // Update in users list
        const users = await storageService.getItem<User[]>(STORAGE_KEYS.USERS) || [];
        const index = users.findIndex(u => u.id === currentUser.id);
        if (index !== -1) {
          users[index] = updatedUser;
          await storageService.setItem(STORAGE_KEYS.USERS, users);
        }

        await storageService.setItem(STORAGE_KEYS.USER, updatedUser);
        return { user: updatedUser, error: null };
      } catch (error) {
        return { user: null, error: 'Update failed' };
      }
    } else {
      const { data: { user }, error } = await supabase.auth.updateUser({
        data: updates,
      });

      if (error) return { user: null, error: error.message };
      if (!user) return { user: null, error: 'Update failed' };

      const updatedUser: User = {
        id: user.id,
        email: user.email!,
        name: user.user_metadata?.name || '',
        created_at: user.created_at,
        updated_at: user.updated_at || user.created_at,
      };

      return { user: updatedUser, error: null };
    }
  }

  /**
   * Change password
   */
  async changePassword(currentPassword: string, newPassword: string): Promise<{ error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        const currentUser = await storageService.getItem<User>(STORAGE_KEYS.USER);
        if (!currentUser) {
          return { error: 'User not found' };
        }

        const passwords = await storageService.getItem<Record<string, string>>(STORAGE_KEYS.PASSWORDS) || {};

        if (passwords[currentUser.id] !== currentPassword) {
          return { error: 'Current password is incorrect' };
        }

        passwords[currentUser.id] = newPassword;
        await storageService.setItem(STORAGE_KEYS.PASSWORDS, passwords);

        return { error: null };
      } catch (error) {
        return { error: 'Password change failed' };
      }
    } else {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      return { error: error?.message || null };
    }
  }

  /**
   * Demo login (quick access with pre-filled credentials)
   */
  async demoLogin(): Promise<{ user: User | null; error: string | null }> {
    const demoCredentials: LoginCredentials = {
      email: 'demo@6jars.com',
      password: 'demo123',
    };

    // Check if demo user exists, create if not
    if (USE_DUMMY_DATA) {
      const users = await storageService.getItem<User[]>(STORAGE_KEYS.USERS) || [];
      const demoUser = users.find(u => u.email === demoCredentials.email);

      if (!demoUser) {
        // Create demo user
        const registerResult = await this.register({
          email: demoCredentials.email,
          password: demoCredentials.password,
          name: 'Demo User',
        });

        if (registerResult.error) {
          return registerResult;
        }
      }
    }

    return this.login(demoCredentials);
  }
}

export default new AuthService();
