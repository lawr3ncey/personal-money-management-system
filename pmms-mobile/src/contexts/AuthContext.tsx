/**
 * Auth Context
 * Manages authentication state and provides auth methods throughout the app
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, LoginCredentials, RegisterData } from '@/types/database.types';
import { authService } from '@/services';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<{ error: string | null }>;
  register: (data: RegisterData) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  demoLogin: () => Promise<{ error: string | null }>;
  updateProfile: (updates: Partial<User>) => Promise<{ error: string | null }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user session on mount
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<{ error: string | null }> => {
    setIsLoading(true);
    try {
      const { user: loggedInUser, error } = await authService.login(credentials);

      if (error) {
        return { error };
      }

      setUser(loggedInUser);
      return { error: null };
    } catch (error) {
      return { error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<{ error: string | null }> => {
    setIsLoading(true);
    try {
      const { user: newUser, error } = await authService.register(data);

      if (error) {
        return { error };
      }

      setUser(newUser);
      return { error: null };
    } catch (error) {
      return { error: 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = async (): Promise<{ error: string | null }> => {
    setIsLoading(true);
    try {
      const { user: demoUser, error } = await authService.demoLogin();

      if (error) {
        return { error };
      }

      setUser(demoUser);
      return { error: null };
    } catch (error) {
      return { error: 'Demo login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<{ error: string | null }> => {
    try {
      const { user: updatedUser, error } = await authService.updateProfile(updates);

      if (error) {
        return { error };
      }

      setUser(updatedUser);
      return { error: null };
    } catch (error) {
      return { error: 'Profile update failed' };
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ): Promise<{ error: string | null }> => {
    try {
      const { error } = await authService.changePassword(currentPassword, newPassword);
      return { error };
    } catch (error) {
      return { error: 'Password change failed' };
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    demoLogin,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
