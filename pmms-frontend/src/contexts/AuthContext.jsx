import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockAuthService } from '../services/mockAuth.service';

/**
 * Authentication Context
 * 
 * Currently using mockAuthService for dummy authentication.
 * 
 * TO REPLACE WITH REAL AUTH LATER:
 * - Firebase: Import firebase auth and replace mockAuthService calls
 * - JWT + Node: Import real authService and replace mockAuthService calls
 */

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = mockAuthService.getCurrentUser();
      if (storedUser && mockAuthService.isAuthenticated()) {
        setUser(storedUser);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Clear error after 5 seconds
  useEffect(() => {
    if (authError) {
      const timer = setTimeout(() => setAuthError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [authError]);

  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      setAuthError(null);
      const response = await mockAuthService.register(userData);
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      setAuthError(null);
      const response = await mockAuthService.login(credentials);
      setUser(response.data.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    mockAuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setAuthError(null);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    try {
      setLoading(true);
      const response = await mockAuthService.updateProfile(updates);
      setUser(response.data.user);
      return response;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (passwordData) => {
    try {
      setLoading(true);
      const response = await mockAuthService.changePassword(passwordData);
      return response;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAccount = useCallback(async (password) => {
    try {
      setLoading(true);
      const response = await mockAuthService.deleteAccount(password);
      setUser(null);
      setIsAuthenticated(false);
      return response;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setAuthError(null);
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    authError,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    deleteAccount,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
