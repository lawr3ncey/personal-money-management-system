/**
 * Transaction Service (DUMMY MODE)
 * Manages transaction operations using AsyncStorage
 * Replace with real Supabase queries when USE_DUMMY_DATA = false
 */

import { Transaction, TransactionInsert } from '@/types/database.types';
import { STORAGE_KEYS, NETWORK_DELAYS, USE_DUMMY_DATA } from '@/constants/config';
import storageService from './storage.service';
import jarService from './jar.service';
import { supabase } from './supabase.service';

class TransactionService {
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
    return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get all transactions for current user
   */
  async getTransactions(filters?: {
    jarId?: string;
    type?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
  }): Promise<{ transactions: Transaction[]; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.fetch);

      try {
        let transactions = await storageService.getItem<Transaction[]>(STORAGE_KEYS.TRANSACTIONS) || [];

        // Apply filters
        if (filters?.jarId) {
          transactions = transactions.filter(t => 
            t.jar_id === filters.jarId || t.to_jar_id === filters.jarId
          );
        }

        if (filters?.type) {
          transactions = transactions.filter(t => t.type === filters.type);
        }

        if (filters?.startDate) {
          transactions = transactions.filter(t => t.transaction_date >= filters.startDate!);
        }

        if (filters?.endDate) {
          transactions = transactions.filter(t => t.transaction_date <= filters.endDate!);
        }

        // Sort by date descending
        transactions.sort((a, b) => 
          new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime()
        );

        // Apply limit
        if (filters?.limit) {
          transactions = transactions.slice(0, filters.limit);
        }

        return { transactions, error: null };
      } catch (error) {
        return { transactions: [], error: 'Failed to fetch transactions' };
      }
    } else {
      let query = supabase
        .from('transactions')
        .select('*')
        .order('transaction_date', { ascending: false });

      if (filters?.jarId) {
        query = query.or(`jar_id.eq.${filters.jarId},to_jar_id.eq.${filters.jarId}`);
      }

      if (filters?.type) {
        query = query.eq('type', filters.type);
      }

      if (filters?.startDate) {
        query = query.gte('transaction_date', filters.startDate);
      }

      if (filters?.endDate) {
        query = query.lte('transaction_date', filters.endDate);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;

      return {
        transactions: data || [],
        error: error?.message || null,
      };
    }
  }

  /**
   * Add money to jar
   */
  async addMoney(
    jarId: string,
    amount: number,
    category: string,
    notes?: string
  ): Promise<{ transaction: Transaction | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        // Adjust jar balance
        const { error: jarError } = await jarService.adjustBalance(jarId, amount);
        if (jarError) {
          return { transaction: null, error: jarError };
        }

        // Create transaction
        const transaction: Transaction = {
          id: this.generateId(),
          user_id: 'dummy_user', // Will be replaced with actual user ID
          jar_id: jarId,
          type: 'add',
          amount,
          category,
          notes,
          transaction_date: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        const transactions = await storageService.getItem<Transaction[]>(STORAGE_KEYS.TRANSACTIONS) || [];
        transactions.push(transaction);
        await storageService.setItem(STORAGE_KEYS.TRANSACTIONS, transactions);

        return { transaction, error: null };
      } catch (error) {
        return { transaction: null, error: 'Failed to add money' };
      }
    } else {
      // Adjust jar balance first
      const { error: jarError } = await jarService.adjustBalance(jarId, amount);
      if (jarError) {
        return { transaction: null, error: jarError };
      }

      // Create transaction
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          jar_id: jarId,
          type: 'add',
          amount,
          category,
          notes,
          transaction_date: new Date().toISOString(),
        })
        .select()
        .single();

      return {
        transaction: data,
        error: error?.message || null,
      };
    }
  }

  /**
   * Subtract money from jar
   */
  async subtractMoney(
    jarId: string,
    amount: number,
    category: string,
    notes?: string
  ): Promise<{ transaction: Transaction | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        // Adjust jar balance
        const { error: jarError } = await jarService.adjustBalance(jarId, -amount);
        if (jarError) {
          return { transaction: null, error: jarError };
        }

        // Create transaction
        const transaction: Transaction = {
          id: this.generateId(),
          user_id: 'dummy_user',
          jar_id: jarId,
          type: 'subtract',
          amount,
          category,
          notes,
          transaction_date: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        const transactions = await storageService.getItem<Transaction[]>(STORAGE_KEYS.TRANSACTIONS) || [];
        transactions.push(transaction);
        await storageService.setItem(STORAGE_KEYS.TRANSACTIONS, transactions);

        return { transaction, error: null };
      } catch (error) {
        return { transaction: null, error: 'Failed to subtract money' };
      }
    } else {
      // Adjust jar balance first
      const { error: jarError } = await jarService.adjustBalance(jarId, -amount);
      if (jarError) {
        return { transaction: null, error: jarError };
      }

      // Create transaction
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          jar_id: jarId,
          type: 'subtract',
          amount,
          category,
          notes,
          transaction_date: new Date().toISOString(),
        })
        .select()
        .single();

      return {
        transaction: data,
        error: error?.message || null,
      };
    }
  }

  /**
   * Transfer money between jars
   */
  async transferMoney(
    fromJarId: string,
    toJarId: string,
    amount: number,
    notes?: string
  ): Promise<{ transaction: Transaction | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        // Subtract from source jar
        const { error: fromError } = await jarService.adjustBalance(fromJarId, -amount);
        if (fromError) {
          return { transaction: null, error: fromError };
        }

        // Add to destination jar
        const { error: toError } = await jarService.adjustBalance(toJarId, amount);
        if (toError) {
          // Rollback source jar
          await jarService.adjustBalance(fromJarId, amount);
          return { transaction: null, error: toError };
        }

        // Create transaction
        const transaction: Transaction = {
          id: this.generateId(),
          user_id: 'dummy_user',
          jar_id: fromJarId,
          to_jar_id: toJarId,
          type: 'transfer',
          amount,
          category: 'transfer',
          notes,
          transaction_date: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        const transactions = await storageService.getItem<Transaction[]>(STORAGE_KEYS.TRANSACTIONS) || [];
        transactions.push(transaction);
        await storageService.setItem(STORAGE_KEYS.TRANSACTIONS, transactions);

        return { transaction, error: null };
      } catch (error) {
        return { transaction: null, error: 'Failed to transfer money' };
      }
    } else {
      // Subtract from source jar
      const { error: fromError } = await jarService.adjustBalance(fromJarId, -amount);
      if (fromError) {
        return { transaction: null, error: fromError };
      }

      // Add to destination jar
      const { error: toError } = await jarService.adjustBalance(toJarId, amount);
      if (toError) {
        // Rollback
        await jarService.adjustBalance(fromJarId, amount);
        return { transaction: null, error: toError };
      }

      // Create transaction
      const { data, error } = await supabase
        .from('transactions')
        .insert({
          jar_id: fromJarId,
          to_jar_id: toJarId,
          type: 'transfer',
          amount,
          category: 'transfer',
          notes,
          transaction_date: new Date().toISOString(),
        })
        .select()
        .single();

      return {
        transaction: data,
        error: error?.message || null,
      };
    }
  }

  /**
   * Delete transaction
   */
  async deleteTransaction(transactionId: string): Promise<{ error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        const transactions = await storageService.getItem<Transaction[]>(STORAGE_KEYS.TRANSACTIONS) || [];
        const transaction = transactions.find(t => t.id === transactionId);

        if (!transaction) {
          return { error: 'Transaction not found' };
        }

        // Reverse the transaction effect on jar balance
        if (transaction.type === 'add') {
          await jarService.adjustBalance(transaction.jar_id, -transaction.amount);
        } else if (transaction.type === 'subtract') {
          await jarService.adjustBalance(transaction.jar_id, transaction.amount);
        } else if (transaction.type === 'transfer' && transaction.to_jar_id) {
          await jarService.adjustBalance(transaction.jar_id, transaction.amount);
          await jarService.adjustBalance(transaction.to_jar_id, -transaction.amount);
        }

        // Remove transaction
        const filtered = transactions.filter(t => t.id !== transactionId);
        await storageService.setItem(STORAGE_KEYS.TRANSACTIONS, filtered);

        return { error: null };
      } catch (error) {
        return { error: 'Failed to delete transaction' };
      }
    } else {
      // Get transaction first to reverse jar balances
      const { data: transaction, error: fetchError } = await supabase
        .from('transactions')
        .select('*')
        .eq('id', transactionId)
        .single();

      if (fetchError || !transaction) {
        return { error: 'Transaction not found' };
      }

      // Reverse jar balances
      if (transaction.type === 'add') {
        await jarService.adjustBalance(transaction.jar_id, -transaction.amount);
      } else if (transaction.type === 'subtract') {
        await jarService.adjustBalance(transaction.jar_id, transaction.amount);
      } else if (transaction.type === 'transfer' && transaction.to_jar_id) {
        await jarService.adjustBalance(transaction.jar_id, transaction.amount);
        await jarService.adjustBalance(transaction.to_jar_id, -transaction.amount);
      }

      // Delete transaction
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', transactionId);

      return { error: error?.message || null };
    }
  }

  /**
   * Get transaction statistics
   */
  async getStatistics(startDate?: string, endDate?: string): Promise<{
    totalIncome: number;
    totalExpense: number;
    totalTransfers: number;
    transactionCount: number;
    error: string | null;
  }> {
    const { transactions, error } = await this.getTransactions({ startDate, endDate });

    if (error) {
      return {
        totalIncome: 0,
        totalExpense: 0,
        totalTransfers: 0,
        transactionCount: 0,
        error,
      };
    }

    const totalIncome = transactions
      .filter(t => t.type === 'add')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter(t => t.type === 'subtract')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalTransfers = transactions
      .filter(t => t.type === 'transfer')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpense,
      totalTransfers,
      transactionCount: transactions.length,
      error: null,
    };
  }
}

export default new TransactionService();
