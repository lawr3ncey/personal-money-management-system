/**
 * Cloud Sync Service (DUMMY MODE)
 * Simulates cloud synchronization using AsyncStorage
 * Replace with real Supabase realtime sync when USE_DUMMY_DATA = false
 */

import { SyncStatus } from '@/types/database.types';
import { STORAGE_KEYS, NETWORK_DELAYS, USE_DUMMY_DATA } from '@/constants/config';
import storageService from './storage.service';
import authService from './auth.service';
import jarService from './jar.service';
import transactionService from './transaction.service';
import budgetService from './budget.service';
import goalService from './goal.service';
import recurringService from './recurring.service';

type SyncListener = (status: SyncStatus) => void;

class SyncService {
  private listeners: SyncListener[] = [];
  private syncInterval: NodeJS.Timeout | null = null;
  private lastSyncTime: string | null = null;

  /**
   * Simulate network delay
   */
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Notify all listeners of sync status change
   */
  private notifyListeners(status: SyncStatus): void {
    this.listeners.forEach(listener => listener(status));
  }

  /**
   * Subscribe to sync status changes
   */
  onSyncStatusChange(listener: SyncListener): () => void {
    this.listeners.push(listener);

    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Get last sync time
   */
  async getLastSyncTime(): Promise<string | null> {
    if (USE_DUMMY_DATA) {
      return this.lastSyncTime || await storageService.getItem<string>(STORAGE_KEYS.LAST_SYNC);
    } else {
      // In real mode, this would check Supabase last update timestamps
      return this.lastSyncTime;
    }
  }

  /**
   * Set last sync time
   */
  private async setLastSyncTime(time: string): Promise<void> {
    this.lastSyncTime = time;
    if (USE_DUMMY_DATA) {
      await storageService.setItem(STORAGE_KEYS.LAST_SYNC, time);
    }
  }

  /**
   * Sync all data to cloud (DUMMY: just validates data exists)
   */
  async syncToCloud(): Promise<{ success: boolean; error: string | null }> {
    this.notifyListeners('syncing');
    await this.delay(NETWORK_DELAYS.sync);

    try {
      // Check if user is logged in
      const user = await authService.getCurrentUser();
      if (!user) {
        this.notifyListeners('error');
        return { success: false, error: 'User not logged in' };
      }

      if (USE_DUMMY_DATA) {
        // In dummy mode, just verify data exists in storage
        const { jars } = await jarService.getJars();
        const { transactions } = await transactionService.getTransactions({ limit: 10 });

        // Simulate sync success
        const syncTime = new Date().toISOString();
        await this.setLastSyncTime(syncTime);

        this.notifyListeners('synced');
        return { success: true, error: null };
      } else {
        // Real Supabase sync would happen here
        // Supabase automatically syncs on every operation, so this is mostly for UI feedback
        const syncTime = new Date().toISOString();
        await this.setLastSyncTime(syncTime);

        this.notifyListeners('synced');
        return { success: true, error: null };
      }
    } catch (error) {
      this.notifyListeners('error');
      return { success: false, error: 'Sync failed' };
    }
  }

  /**
   * Sync data from cloud (DUMMY: just reads from storage)
   */
  async syncFromCloud(): Promise<{ success: boolean; error: string | null }> {
    this.notifyListeners('syncing');
    await this.delay(NETWORK_DELAYS.sync);

    try {
      // Check if user is logged in
      const user = await authService.getCurrentUser();
      if (!user) {
        this.notifyListeners('error');
        return { success: false, error: 'User not logged in' };
      }

      if (USE_DUMMY_DATA) {
        // In dummy mode, data is already in AsyncStorage
        // Just verify it's accessible
        await jarService.getJars();
        await transactionService.getTransactions({ limit: 10 });

        const syncTime = new Date().toISOString();
        await this.setLastSyncTime(syncTime);

        this.notifyListeners('synced');
        return { success: true, error: null };
      } else {
        // Real Supabase sync - fetch all user data
        const [jarsResult, transactionsResult, budgetsResult, goalsResult, recurringResult] = await Promise.all([
          jarService.getJars(),
          transactionService.getTransactions({ limit: 100 }),
          budgetService.getBudgetHistory(12),
          goalService.getGoals(),
          recurringService.getRecurringItems(),
        ]);

        // Check for errors
        if (jarsResult.error || transactionsResult.error || budgetsResult.error || goalsResult.error || recurringResult.error) {
          this.notifyListeners('error');
          return { success: false, error: 'Sync failed' };
        }

        const syncTime = new Date().toISOString();
        await this.setLastSyncTime(syncTime);

        this.notifyListeners('synced');
        return { success: true, error: null };
      }
    } catch (error) {
      this.notifyListeners('error');
      return { success: false, error: 'Sync failed' };
    }
  }

  /**
   * Full sync (both directions)
   */
  async fullSync(): Promise<{ success: boolean; error: string | null }> {
    // In real mode, this would handle conflict resolution
    // For now, just sync from cloud (cloud is source of truth)
    return this.syncFromCloud();
  }

  /**
   * Start automatic sync (every 5 minutes)
   */
  startAutoSync(): void {
    if (this.syncInterval) {
      return; // Already running
    }

    // Sync immediately
    this.fullSync();

    // Then sync every 5 minutes
    this.syncInterval = setInterval(() => {
      this.fullSync();
    }, 5 * 60 * 1000);
  }

  /**
   * Stop automatic sync
   */
  stopAutoSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  /**
   * Check if auto sync is running
   */
  isAutoSyncRunning(): boolean {
    return this.syncInterval !== null;
  }

  /**
   * Force sync now
   */
  async forceSyncNow(): Promise<{ success: boolean; error: string | null }> {
    return this.fullSync();
  }

  /**
   * Get sync status
   */
  getSyncStatus(): SyncStatus {
    if (!this.lastSyncTime) {
      return 'idle';
    }

    // Check if last sync was recent (within 10 minutes)
    const lastSync = new Date(this.lastSyncTime);
    const now = new Date();
    const diffMinutes = (now.getTime() - lastSync.getTime()) / 1000 / 60;

    if (diffMinutes < 10) {
      return 'synced';
    }

    return 'idle';
  }

  /**
   * Reset sync state
   */
  async resetSync(): Promise<void> {
    this.stopAutoSync();
    this.lastSyncTime = null;
    if (USE_DUMMY_DATA) {
      await storageService.removeItem(STORAGE_KEYS.LAST_SYNC);
    }
    this.notifyListeners('idle');
  }
}

export default new SyncService();
