import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockCloudService } from '../services/mockCloud.service';
import { useAuth } from './AuthContext';

/**
 * Sync Context
 * 
 * Manages cloud sync state and provides sync functions.
 * Currently using mockCloudService for dummy sync.
 * 
 * TO REPLACE WITH REAL CLOUD SYNC LATER:
 * - Firebase: Import firestore and replace mockCloudService calls
 * - MongoDB + Node API: Import real API service and replace calls
 */

const SyncContext = createContext(null);

export const useSync = () => {
  const context = useContext(SyncContext);
  if (!context) {
    throw new Error('useSync must be used within a SyncProvider');
  }
  return context;
};

// Sync status types
export const SYNC_STATUS = {
  IDLE: 'idle',
  SYNCING: 'syncing',
  SYNCED: 'synced',
  ERROR: 'error',
  OFFLINE: 'offline'
};

export const SyncProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [syncStatus, setSyncStatus] = useState(SYNC_STATUS.IDLE);
  const [syncMessage, setSyncMessage] = useState('');
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [cloudData, setCloudData] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(false);

  // Subscribe to sync status changes from the service
  useEffect(() => {
    const unsubscribe = mockCloudService.onSyncStatusChange((status, message) => {
      setSyncStatus(status === 'syncing' ? SYNC_STATUS.SYNCING : SYNC_STATUS.SYNCED);
      setSyncMessage(message);
      
      // Clear message after 3 seconds if synced
      if (status === 'synced') {
        setTimeout(() => setSyncMessage(''), 3000);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch user data when authenticated
  useEffect(() => {
    const loadUserData = async () => {
      if (isAuthenticated && user?.id) {
        setIsInitialLoading(true);
        try {
          const data = await mockCloudService.fetchUserData(user.id);
          setCloudData(data);
          setLastSyncTime(data.lastSyncedAt);
          setSyncStatus(SYNC_STATUS.SYNCED);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          setSyncStatus(SYNC_STATUS.ERROR);
          setSyncMessage('Failed to load data');
        } finally {
          setIsInitialLoading(false);
        }
      } else {
        setCloudData(null);
        setLastSyncTime(null);
        setSyncStatus(SYNC_STATUS.IDLE);
      }
    };

    loadUserData();
  }, [isAuthenticated, user?.id]);

  // Sync specific data type
  const syncData = useCallback(async (dataType, data) => {
    if (!isAuthenticated || !user?.id) {
      console.warn('Cannot sync: User not authenticated');
      return null;
    }

    try {
      const result = await mockCloudService.syncData(user.id, dataType, data);
      setCloudData(result);
      setLastSyncTime(result.lastSyncedAt);
      return result;
    } catch (error) {
      console.error(`Failed to sync ${dataType}:`, error);
      setSyncStatus(SYNC_STATUS.ERROR);
      setSyncMessage(`Failed to sync ${dataType}`);
      throw error;
    }
  }, [isAuthenticated, user?.id]);

  // Add item to collection
  const addItem = useCallback(async (collection, item) => {
    if (!isAuthenticated || !user?.id) {
      console.warn('Cannot add item: User not authenticated');
      return null;
    }

    try {
      const newItem = await mockCloudService.addItem(user.id, collection, item);
      // Update local state
      setCloudData(prev => ({
        ...prev,
        [collection]: [...(prev?.[collection] || []), newItem]
      }));
      return newItem;
    } catch (error) {
      console.error(`Failed to add item to ${collection}:`, error);
      setSyncStatus(SYNC_STATUS.ERROR);
      throw error;
    }
  }, [isAuthenticated, user?.id]);

  // Update item in collection
  const updateItem = useCallback(async (collection, itemId, updates) => {
    if (!isAuthenticated || !user?.id) {
      console.warn('Cannot update item: User not authenticated');
      return null;
    }

    try {
      const updatedItem = await mockCloudService.updateItem(user.id, collection, itemId, updates);
      // Update local state
      setCloudData(prev => ({
        ...prev,
        [collection]: prev?.[collection]?.map(item => 
          item._id === itemId ? updatedItem : item
        ) || []
      }));
      return updatedItem;
    } catch (error) {
      console.error(`Failed to update item in ${collection}:`, error);
      setSyncStatus(SYNC_STATUS.ERROR);
      throw error;
    }
  }, [isAuthenticated, user?.id]);

  // Delete item from collection
  const deleteItem = useCallback(async (collection, itemId) => {
    if (!isAuthenticated || !user?.id) {
      console.warn('Cannot delete item: User not authenticated');
      return false;
    }

    try {
      await mockCloudService.deleteItem(user.id, collection, itemId);
      // Update local state
      setCloudData(prev => ({
        ...prev,
        [collection]: prev?.[collection]?.filter(item => item._id !== itemId) || []
      }));
      return true;
    } catch (error) {
      console.error(`Failed to delete item from ${collection}:`, error);
      setSyncStatus(SYNC_STATUS.ERROR);
      throw error;
    }
  }, [isAuthenticated, user?.id]);

  // Force full sync
  const forceSync = useCallback(async () => {
    if (!isAuthenticated || !user?.id) {
      console.warn('Cannot force sync: User not authenticated');
      return null;
    }

    try {
      const data = await mockCloudService.forceSync(user.id);
      setCloudData(data);
      setLastSyncTime(data.lastSyncedAt);
      return data;
    } catch (error) {
      console.error('Failed to force sync:', error);
      setSyncStatus(SYNC_STATUS.ERROR);
      setSyncMessage('Sync failed');
      throw error;
    }
  }, [isAuthenticated, user?.id]);

  // Save all data
  const saveAllData = useCallback(async (data) => {
    if (!isAuthenticated || !user?.id) {
      console.warn('Cannot save data: User not authenticated');
      return null;
    }

    try {
      const result = await mockCloudService.saveUserData(user.id, data);
      setCloudData(result);
      setLastSyncTime(result.lastSyncedAt);
      return result;
    } catch (error) {
      console.error('Failed to save all data:', error);
      setSyncStatus(SYNC_STATUS.ERROR);
      throw error;
    }
  }, [isAuthenticated, user?.id]);

  // Get specific data type
  const getData = useCallback((dataType) => {
    return cloudData?.[dataType] || (Array.isArray(cloudData?.[dataType]) ? [] : null);
  }, [cloudData]);

  // Clear all data
  const clearAllData = useCallback(async () => {
    if (!isAuthenticated || !user?.id) {
      console.warn('Cannot clear data: User not authenticated');
      return false;
    }

    try {
      await mockCloudService.clearUserData(user.id);
      setCloudData(null);
      setLastSyncTime(null);
      return true;
    } catch (error) {
      console.error('Failed to clear data:', error);
      setSyncStatus(SYNC_STATUS.ERROR);
      throw error;
    }
  }, [isAuthenticated, user?.id]);

  // Format last sync time for display
  const getLastSyncDisplay = useCallback(() => {
    if (!lastSyncTime) return 'Never synced';
    
    const date = new Date(lastSyncTime);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }, [lastSyncTime]);

  const value = {
    // State
    syncStatus,
    syncMessage,
    lastSyncTime,
    cloudData,
    isInitialLoading,
    isSyncing: syncStatus === SYNC_STATUS.SYNCING,
    
    // Methods
    syncData,
    addItem,
    updateItem,
    deleteItem,
    forceSync,
    saveAllData,
    getData,
    clearAllData,
    getLastSyncDisplay
  };

  return <SyncContext.Provider value={value}>{children}</SyncContext.Provider>;
};

export default SyncContext;
