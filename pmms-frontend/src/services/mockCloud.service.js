/**
 * Mock Cloud Sync Service
 * 
 * This service simulates cloud database and cross-device sync using localStorage.
 * 
 * TO REPLACE WITH REAL CLOUD LATER:
 * - Firebase Firestore: Replace with firestore collection/document methods
 * - MongoDB + Node API: Replace with actual API calls
 * - The interface remains the same, just swap the implementation
 */

// Simulated network delays (ms)
const SYNC_DELAY = 600;
const FETCH_DELAY = 1000;
const SAVE_DELAY = 400;

// Storage key prefix
const CLOUD_DATA_KEY_PREFIX = 'pmms_cloud_data_';

// Default initial data structure
const getDefaultCloudData = () => ({
  jars: [],
  transactions: [],
  incomeHistory: [],
  budgets: [],
  goals: [],
  recurringItems: [],
  preferences: {
    currency: 'PHP',
    theme: 'light',
    notifications: true
  },
  lastSyncedAt: null,
  version: 1
});

// Simulate async operation with delay
const simulateDelay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Event listeners for sync status updates
let syncListeners = [];

// Notify all listeners of sync status change
const notifySyncStatus = (status, message = '') => {
  syncListeners.forEach(listener => listener(status, message));
};

export const mockCloudService = {
  /**
   * Subscribe to sync status changes
   * @param {Function} listener - (status, message) => void
   * @returns {Function} - Unsubscribe function
   */
  onSyncStatusChange: (listener) => {
    syncListeners.push(listener);
    return () => {
      syncListeners = syncListeners.filter(l => l !== listener);
    };
  },

  /**
   * Get cloud storage key for user
   * @param {string} userId 
   * @returns {string}
   */
  getStorageKey: (userId) => {
    return `${CLOUD_DATA_KEY_PREFIX}${userId}`;
  },

  /**
   * Fetch all user data from "cloud" (localStorage)
   * Simulates fetching data when user logs in or switches device
   * @param {string} userId 
   * @returns {Promise<Object>}
   */
  fetchUserData: async (userId) => {
    notifySyncStatus('syncing', 'Fetching your data...');
    
    await simulateDelay(FETCH_DELAY);
    
    const key = mockCloudService.getStorageKey(userId);
    const data = localStorage.getItem(key);
    
    if (data) {
      const parsed = JSON.parse(data);
      notifySyncStatus('synced', 'Data loaded successfully');
      return parsed;
    }
    
    // Return default data if none exists
    const defaultData = getDefaultCloudData();
    notifySyncStatus('synced', 'Welcome! Starting fresh.');
    return defaultData;
  },

  /**
   * Save all user data to "cloud" (localStorage)
   * @param {string} userId 
   * @param {Object} data 
   * @returns {Promise<Object>}
   */
  saveUserData: async (userId, data) => {
    notifySyncStatus('syncing', 'Saving to cloud...');
    
    await simulateDelay(SAVE_DELAY);
    
    const key = mockCloudService.getStorageKey(userId);
    const dataToSave = {
      ...data,
      lastSyncedAt: new Date().toISOString(),
      version: (data.version || 0) + 1
    };
    
    localStorage.setItem(key, JSON.stringify(dataToSave));
    
    notifySyncStatus('synced', 'All changes saved');
    return dataToSave;
  },

  /**
   * Sync specific data type to cloud
   * @param {string} userId 
   * @param {string} dataType - 'jars', 'transactions', etc.
   * @param {Array|Object} data 
   * @returns {Promise<Object>}
   */
  syncData: async (userId, dataType, data) => {
    notifySyncStatus('syncing', `Syncing ${dataType}...`);
    
    await simulateDelay(SYNC_DELAY);
    
    const key = mockCloudService.getStorageKey(userId);
    const existingData = localStorage.getItem(key);
    const cloudData = existingData ? JSON.parse(existingData) : getDefaultCloudData();
    
    // Update specific data type
    cloudData[dataType] = data;
    cloudData.lastSyncedAt = new Date().toISOString();
    cloudData.version = (cloudData.version || 0) + 1;
    
    localStorage.setItem(key, JSON.stringify(cloudData));
    
    notifySyncStatus('synced', `${dataType} synced`);
    return cloudData;
  },

  /**
   * Get specific data type from cloud
   * @param {string} userId 
   * @param {string} dataType 
   * @returns {Promise<Array|Object>}
   */
  getData: async (userId, dataType) => {
    await simulateDelay(300);
    
    const key = mockCloudService.getStorageKey(userId);
    const data = localStorage.getItem(key);
    
    if (data) {
      const parsed = JSON.parse(data);
      return parsed[dataType] || (Array.isArray(getDefaultCloudData()[dataType]) ? [] : {});
    }
    
    return Array.isArray(getDefaultCloudData()[dataType]) ? [] : {};
  },

  /**
   * Add item to a collection
   * @param {string} userId 
   * @param {string} collection - 'jars', 'transactions', etc.
   * @param {Object} item 
   * @returns {Promise<Object>}
   */
  addItem: async (userId, collection, item) => {
    notifySyncStatus('syncing', 'Saving...');
    
    await simulateDelay(SAVE_DELAY);
    
    const key = mockCloudService.getStorageKey(userId);
    const existingData = localStorage.getItem(key);
    const cloudData = existingData ? JSON.parse(existingData) : getDefaultCloudData();
    
    if (!cloudData[collection]) {
      cloudData[collection] = [];
    }
    
    // Add item with ID if not present
    const newItem = {
      ...item,
      _id: item._id || `${collection}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: item.createdAt || new Date().toISOString()
    };
    
    cloudData[collection].push(newItem);
    cloudData.lastSyncedAt = new Date().toISOString();
    
    localStorage.setItem(key, JSON.stringify(cloudData));
    
    notifySyncStatus('synced', 'Saved');
    return newItem;
  },

  /**
   * Update item in a collection
   * @param {string} userId 
   * @param {string} collection 
   * @param {string} itemId 
   * @param {Object} updates 
   * @returns {Promise<Object>}
   */
  updateItem: async (userId, collection, itemId, updates) => {
    notifySyncStatus('syncing', 'Updating...');
    
    await simulateDelay(SAVE_DELAY);
    
    const key = mockCloudService.getStorageKey(userId);
    const existingData = localStorage.getItem(key);
    const cloudData = existingData ? JSON.parse(existingData) : getDefaultCloudData();
    
    if (!cloudData[collection]) {
      throw new Error(`Collection ${collection} not found`);
    }
    
    const itemIndex = cloudData[collection].findIndex(item => item._id === itemId);
    if (itemIndex === -1) {
      throw new Error('Item not found');
    }
    
    cloudData[collection][itemIndex] = {
      ...cloudData[collection][itemIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    cloudData.lastSyncedAt = new Date().toISOString();
    localStorage.setItem(key, JSON.stringify(cloudData));
    
    notifySyncStatus('synced', 'Updated');
    return cloudData[collection][itemIndex];
  },

  /**
   * Delete item from a collection
   * @param {string} userId 
   * @param {string} collection 
   * @param {string} itemId 
   * @returns {Promise<boolean>}
   */
  deleteItem: async (userId, collection, itemId) => {
    notifySyncStatus('syncing', 'Deleting...');
    
    await simulateDelay(SAVE_DELAY);
    
    const key = mockCloudService.getStorageKey(userId);
    const existingData = localStorage.getItem(key);
    const cloudData = existingData ? JSON.parse(existingData) : getDefaultCloudData();
    
    if (!cloudData[collection]) {
      return false;
    }
    
    cloudData[collection] = cloudData[collection].filter(item => item._id !== itemId);
    cloudData.lastSyncedAt = new Date().toISOString();
    
    localStorage.setItem(key, JSON.stringify(cloudData));
    
    notifySyncStatus('synced', 'Deleted');
    return true;
  },

  /**
   * Get last sync timestamp
   * @param {string} userId 
   * @returns {Promise<string|null>}
   */
  getLastSyncTime: async (userId) => {
    const key = mockCloudService.getStorageKey(userId);
    const data = localStorage.getItem(key);
    
    if (data) {
      const parsed = JSON.parse(data);
      return parsed.lastSyncedAt;
    }
    
    return null;
  },

  /**
   * Force full sync (simulates pulling latest from cloud)
   * @param {string} userId 
   * @returns {Promise<Object>}
   */
  forceSync: async (userId) => {
    notifySyncStatus('syncing', 'Syncing with cloud...');
    
    // Longer delay to simulate full sync
    await simulateDelay(1500);
    
    const data = await mockCloudService.fetchUserData(userId);
    
    notifySyncStatus('synced', 'All data synced');
    return data;
  },

  /**
   * Clear all cloud data for user (for reset functionality)
   * @param {string} userId 
   * @returns {Promise<boolean>}
   */
  clearUserData: async (userId) => {
    notifySyncStatus('syncing', 'Clearing data...');
    
    await simulateDelay(SAVE_DELAY);
    
    const key = mockCloudService.getStorageKey(userId);
    localStorage.removeItem(key);
    
    notifySyncStatus('synced', 'Data cleared');
    return true;
  },

  /**
   * Export user data (for backup)
   * @param {string} userId 
   * @returns {Promise<Object>}
   */
  exportData: async (userId) => {
    await simulateDelay(500);
    
    const key = mockCloudService.getStorageKey(userId);
    const data = localStorage.getItem(key);
    
    return data ? JSON.parse(data) : getDefaultCloudData();
  },

  /**
   * Import user data (for restore)
   * @param {string} userId 
   * @param {Object} data 
   * @returns {Promise<Object>}
   */
  importData: async (userId, data) => {
    notifySyncStatus('syncing', 'Importing data...');
    
    await simulateDelay(1000);
    
    const key = mockCloudService.getStorageKey(userId);
    const dataToSave = {
      ...data,
      lastSyncedAt: new Date().toISOString(),
      importedAt: new Date().toISOString()
    };
    
    localStorage.setItem(key, JSON.stringify(dataToSave));
    
    notifySyncStatus('synced', 'Data imported successfully');
    return dataToSave;
  }
};

export default mockCloudService;
