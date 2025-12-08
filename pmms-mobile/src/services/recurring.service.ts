/**
 * Recurring Service (DUMMY MODE)
 * Manages recurring income/expense items using AsyncStorage
 * Replace with real Supabase queries when USE_DUMMY_DATA = false
 */

import { RecurringItem, RecurringItemInsert, RecurringItemUpdate } from '@/types/database.types';
import { STORAGE_KEYS, NETWORK_DELAYS, USE_DUMMY_DATA } from '@/constants/config';
import storageService from './storage.service';
import transactionService from './transaction.service';
import { supabase } from './supabase.service';

class RecurringService {
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
    return `recurring_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get all recurring items for current user
   */
  async getRecurringItems(): Promise<{ items: RecurringItem[]; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.fetch);

      try {
        const items = await storageService.getItem<RecurringItem[]>(STORAGE_KEYS.RECURRING) || [];
        
        // Sort by next execution date
        items.sort((a, b) => 
          new Date(a.next_execution).getTime() - new Date(b.next_execution).getTime()
        );

        return { items, error: null };
      } catch (error) {
        return { items: [], error: 'Failed to fetch recurring items' };
      }
    } else {
      const { data, error } = await supabase
        .from('recurring_items')
        .select('*')
        .order('next_execution', { ascending: true });

      return {
        items: data || [],
        error: error?.message || null,
      };
    }
  }

  /**
   * Get single recurring item by ID
   */
  async getRecurringItem(itemId: string): Promise<{ item: RecurringItem | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.fetch);

      try {
        const items = await storageService.getItem<RecurringItem[]>(STORAGE_KEYS.RECURRING) || [];
        const item = items.find(i => i.id === itemId);
        return { item: item || null, error: item ? null : 'Item not found' };
      } catch (error) {
        return { item: null, error: 'Failed to fetch recurring item' };
      }
    } else {
      const { data, error } = await supabase
        .from('recurring_items')
        .select('*')
        .eq('id', itemId)
        .single();

      return {
        item: data,
        error: error?.message || null,
      };
    }
  }

  /**
   * Create recurring item
   */
  async createRecurringItem(
    itemData: RecurringItemInsert
  ): Promise<{ item: RecurringItem | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        const items = await storageService.getItem<RecurringItem[]>(STORAGE_KEYS.RECURRING) || [];

        const newItem: RecurringItem = {
          id: this.generateId(),
          user_id: itemData.user_id,
          jar_id: itemData.jar_id,
          name: itemData.name,
          amount: itemData.amount,
          type: itemData.type,
          frequency: itemData.frequency,
          next_execution: itemData.next_execution,
          category: itemData.category,
          notes: itemData.notes,
          is_active: itemData.is_active !== false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        items.push(newItem);
        await storageService.setItem(STORAGE_KEYS.RECURRING, items);

        return { item: newItem, error: null };
      } catch (error) {
        return { item: null, error: 'Failed to create recurring item' };
      }
    } else {
      const { data, error } = await supabase
        .from('recurring_items')
        .insert(itemData)
        .select()
        .single();

      return {
        item: data,
        error: error?.message || null,
      };
    }
  }

  /**
   * Update recurring item
   */
  async updateRecurringItem(
    itemId: string,
    updates: RecurringItemUpdate
  ): Promise<{ item: RecurringItem | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        const items = await storageService.getItem<RecurringItem[]>(STORAGE_KEYS.RECURRING) || [];
        const index = items.findIndex(i => i.id === itemId);

        if (index === -1) {
          return { item: null, error: 'Item not found' };
        }

        const updatedItem: RecurringItem = {
          ...items[index],
          ...updates,
          updated_at: new Date().toISOString(),
        };

        items[index] = updatedItem;
        await storageService.setItem(STORAGE_KEYS.RECURRING, items);

        return { item: updatedItem, error: null };
      } catch (error) {
        return { item: null, error: 'Failed to update recurring item' };
      }
    } else {
      const { data, error } = await supabase
        .from('recurring_items')
        .update(updates)
        .eq('id', itemId)
        .select()
        .single();

      return {
        item: data,
        error: error?.message || null,
      };
    }
  }

  /**
   * Delete recurring item
   */
  async deleteRecurringItem(itemId: string): Promise<{ error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        const items = await storageService.getItem<RecurringItem[]>(STORAGE_KEYS.RECURRING) || [];
        const filtered = items.filter(i => i.id !== itemId);

        if (filtered.length === items.length) {
          return { error: 'Item not found' };
        }

        await storageService.setItem(STORAGE_KEYS.RECURRING, filtered);
        return { error: null };
      } catch (error) {
        return { error: 'Failed to delete recurring item' };
      }
    } else {
      const { error } = await supabase
        .from('recurring_items')
        .delete()
        .eq('id', itemId);

      return { error: error?.message || null };
    }
  }

  /**
   * Execute recurring item (create transaction and update next execution)
   */
  async executeRecurringItem(itemId: string): Promise<{ error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        const { item, error } = await this.getRecurringItem(itemId);

        if (error || !item) {
          return { error: error || 'Item not found' };
        }

        if (!item.is_active) {
          return { error: 'Item is not active' };
        }

        // Create transaction
        if (item.type === 'income') {
          const { error: txnError } = await transactionService.addMoney(
            item.jar_id,
            item.amount,
            item.category || 'recurring',
            `${item.name} (Recurring)`
          );

          if (txnError) {
            return { error: txnError };
          }
        } else {
          const { error: txnError } = await transactionService.subtractMoney(
            item.jar_id,
            item.amount,
            item.category || 'recurring',
            `${item.name} (Recurring)`
          );

          if (txnError) {
            return { error: txnError };
          }
        }

        // Calculate next execution date
        const nextExecution = this.calculateNextExecution(item.next_execution, item.frequency);

        // Update recurring item
        await this.updateRecurringItem(itemId, {
          next_execution: nextExecution,
        });

        return { error: null };
      } catch (error) {
        return { error: 'Failed to execute recurring item' };
      }
    } else {
      // Get item
      const { data: item, error: fetchError } = await supabase
        .from('recurring_items')
        .select('*')
        .eq('id', itemId)
        .single();

      if (fetchError || !item) {
        return { error: 'Item not found' };
      }

      if (!item.is_active) {
        return { error: 'Item is not active' };
      }

      // Create transaction
      if (item.type === 'income') {
        const { error: txnError } = await transactionService.addMoney(
          item.jar_id,
          item.amount,
          item.category || 'recurring',
          `${item.name} (Recurring)`
        );

        if (txnError) {
          return { error: txnError };
        }
      } else {
        const { error: txnError } = await transactionService.subtractMoney(
          item.jar_id,
          item.amount,
          item.category || 'recurring',
          `${item.name} (Recurring)`
        );

        if (txnError) {
          return { error: txnError };
        }
      }

      // Calculate next execution
      const nextExecution = this.calculateNextExecution(item.next_execution, item.frequency);

      // Update recurring item
      const { error: updateError } = await supabase
        .from('recurring_items')
        .update({ next_execution: nextExecution })
        .eq('id', itemId);

      return { error: updateError?.message || null };
    }
  }

  /**
   * Calculate next execution date based on frequency
   */
  private calculateNextExecution(currentDate: string, frequency: string): string {
    const date = new Date(currentDate);

    switch (frequency) {
      case 'daily':
        date.setDate(date.getDate() + 1);
        break;
      case 'weekly':
        date.setDate(date.getDate() + 7);
        break;
      case 'monthly':
        date.setMonth(date.getMonth() + 1);
        break;
      case 'yearly':
        date.setFullYear(date.getFullYear() + 1);
        break;
    }

    return date.toISOString();
  }

  /**
   * Check and execute all due recurring items
   */
  async executeDueItems(): Promise<{ executed: number; error: string | null }> {
    const { items, error } = await this.getRecurringItems();

    if (error) {
      return { executed: 0, error };
    }

    const now = new Date();
    let executed = 0;

    for (const item of items) {
      if (item.is_active && new Date(item.next_execution) <= now) {
        const { error: execError } = await this.executeRecurringItem(item.id);
        if (!execError) {
          executed++;
        }
      }
    }

    return { executed, error: null };
  }

  /**
   * Toggle recurring item active status
   */
  async toggleActive(itemId: string): Promise<{ item: RecurringItem | null; error: string | null }> {
    const { item, error } = await this.getRecurringItem(itemId);

    if (error || !item) {
      return { item: null, error: error || 'Item not found' };
    }

    return this.updateRecurringItem(itemId, { is_active: !item.is_active });
  }
}

export default new RecurringService();
