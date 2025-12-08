/**
 * Sync Context
 * Manages cloud synchronization state and provides sync methods
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SyncStatus } from '@/types/database.types';
import { syncService } from '@/services';
import { useAuth } from './AuthContext';

interface SyncContextType {
  syncStatus: SyncStatus;
  lastSyncedAt: string | null;
  isAutoSyncEnabled: boolean;
  syncNow: () => Promise<{ error: string | null }>;
  enableAutoSync: () => void;
  disableAutoSync: () => void;
  resetSync: () => Promise<void>;
}

const SyncContext = createContext<SyncContextType | undefined>(undefined);

interface SyncProviderProps {
  children: ReactNode;
}

export const SyncProvider: React.FC<SyncProviderProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [isAutoSyncEnabled, setIsAutoSyncEnabled] = useState(false);

  // Subscribe to sync status changes
  useEffect(() => {
    const unsubscribe = syncService.onSyncStatusChange((status) => {
      setSyncStatus(status);
    });

    // Load last sync time
    loadLastSyncTime();

    return () => {
      unsubscribe();
    };
  }, []);

  // Start/stop auto sync based on auth state
  useEffect(() => {
    if (isAuthenticated && isAutoSyncEnabled) {
      syncService.startAutoSync();
    } else {
      syncService.stopAutoSync();
    }

    return () => {
      syncService.stopAutoSync();
    };
  }, [isAuthenticated, isAutoSyncEnabled]);

  // Update last synced time when sync completes
  useEffect(() => {
    if (syncStatus === 'synced') {
      loadLastSyncTime();
    }
  }, [syncStatus]);

  const loadLastSyncTime = async () => {
    const lastSync = await syncService.getLastSyncTime();
    setLastSyncedAt(lastSync);
  };

  const syncNow = async (): Promise<{ error: string | null }> => {
    if (!isAuthenticated) {
      return { error: 'Not authenticated' };
    }

    const { success, error } = await syncService.forceSyncNow();

    if (success) {
      await loadLastSyncTime();
    }

    return { error };
  };

  const enableAutoSync = () => {
    setIsAutoSyncEnabled(true);
    if (isAuthenticated) {
      syncService.startAutoSync();
    }
  };

  const disableAutoSync = () => {
    setIsAutoSyncEnabled(false);
    syncService.stopAutoSync();
  };

  const resetSync = async () => {
    await syncService.resetSync();
    setLastSyncedAt(null);
    setSyncStatus('idle');
  };

  const value: SyncContextType = {
    syncStatus,
    lastSyncedAt,
    isAutoSyncEnabled,
    syncNow,
    enableAutoSync,
    disableAutoSync,
    resetSync,
  };

  return <SyncContext.Provider value={value}>{children}</SyncContext.Provider>;
};

export const useSync = (): SyncContextType => {
  const context = useContext(SyncContext);
  if (context === undefined) {
    throw new Error('useSync must be used within a SyncProvider');
  }
  return context;
};
