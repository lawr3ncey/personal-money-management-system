/**
 * Export/Import Service (DUMMY MODE)
 * Manages data export, import, and reset operations
 * Works with AsyncStorage in dummy mode, Supabase in real mode
 */

import { ExportData, ImportResult } from '@/types/database.types';
import { STORAGE_KEYS, NETWORK_DELAYS, USE_DUMMY_DATA } from '@/constants/config';
import storageService from './storage.service';
import jarService from './jar.service';
import transactionService from './transaction.service';
import budgetService from './budget.service';
import goalService from './goal.service';
import recurringService from './recurring.service';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

class ExportService {
  /**
   * Simulate network delay
   */
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Export all data to JSON
   */
  async exportJSON(): Promise<{ data: ExportData | null; error: string | null }> {
    await this.delay(NETWORK_DELAYS.fetch);

    try {
      const { jars } = await jarService.getJars();
      const { transactions } = await transactionService.getTransactions();
      const { budgets } = await budgetService.getBudgetHistory(100);
      const { goals } = await goalService.getGoals();
      const { items: recurring } = await recurringService.getRecurringItems();

      const exportData: ExportData = {
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        counts: {
          jars: jars.length,
          transactions: transactions.length,
          budgets: budgets.length,
          goals: goals.length,
          recurring: recurring.length,
        },
        data: {
          jars,
          transactions,
          budgets,
          goals,
          recurring,
        },
      };

      return { data: exportData, error: null };
    } catch (error) {
      return { data: null, error: 'Failed to export data' };
    }
  }

  /**
   * Export to CSV (sectioned by data type)
   */
  async exportCSV(): Promise<{ csv: string | null; error: string | null }> {
    await this.delay(NETWORK_DELAYS.fetch);

    try {
      const { jars } = await jarService.getJars();
      const { transactions } = await transactionService.getTransactions();
      const { budgets } = await budgetService.getBudgetHistory(100);
      const { goals } = await goalService.getGoals();
      const { items: recurring } = await recurringService.getRecurringItems();

      let csv = '';

      // Export Jars
      csv += '=== JARS ===\n';
      csv += 'ID,Name,Category,Balance,Percentage,Color,Icon,Is Default\n';
      jars.forEach(jar => {
        csv += `${jar.id},${jar.name},${jar.category},${jar.balance},${jar.percentage},${jar.color},${jar.icon},${jar.is_default}\n`;
      });

      // Export Transactions
      csv += '\n=== TRANSACTIONS ===\n';
      csv += 'ID,Type,Amount,Category,Jar ID,To Jar ID,Date,Notes\n';
      transactions.forEach(txn => {
        csv += `${txn.id},${txn.type},${txn.amount},${txn.category || ''},${txn.jar_id},${txn.to_jar_id || ''},${txn.transaction_date},${txn.notes || ''}\n`;
      });

      // Export Budgets
      csv += '\n=== BUDGETS ===\n';
      csv += 'Month,Year,Income Goal,Spending Goal,Savings Goal,Actual Income,Actual Spending,Actual Savings\n';
      budgets.forEach(budget => {
        csv += `${budget.month},${budget.year},${budget.income_goal},${budget.spending_goal},${budget.savings_goal},${budget.actual_income},${budget.actual_spending},${budget.actual_savings}\n`;
      });

      // Export Goals
      csv += '\n=== SAVINGS GOALS ===\n';
      csv += 'ID,Name,Target Amount,Current Amount,Deadline,Priority,Is Completed\n';
      goals.forEach(goal => {
        csv += `${goal.id},${goal.name},${goal.target_amount},${goal.current_amount},${goal.deadline || ''},${goal.priority},${goal.is_completed}\n`;
      });

      // Export Recurring Items
      csv += '\n=== RECURRING ITEMS ===\n';
      csv += 'ID,Name,Type,Amount,Frequency,Next Execution,Jar ID,Category,Is Active\n';
      recurring.forEach(item => {
        csv += `${item.id},${item.name},${item.type},${item.amount},${item.frequency},${item.next_execution},${item.jar_id},${item.category || ''},${item.is_active}\n`;
      });

      return { csv, error: null };
    } catch (error) {
      return { csv: null, error: 'Failed to export CSV' };
    }
  }

  /**
   * Download export file (JSON or CSV)
   */
  async downloadExport(format: 'json' | 'csv'): Promise<{ success: boolean; error: string | null }> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `6jars_export_${timestamp}.${format}`;
      const filePath = `${FileSystem.documentDirectory}${fileName}`;

      let content: string;

      if (format === 'json') {
        const { data, error } = await this.exportJSON();
        if (error || !data) {
          return { success: false, error: error || 'Export failed' };
        }
        content = JSON.stringify(data, null, 2);
      } else {
        const { csv, error } = await this.exportCSV();
        if (error || !csv) {
          return { success: false, error: error || 'Export failed' };
        }
        content = csv;
      }

      // Write file
      await FileSystem.writeAsStringAsync(filePath, content, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      // Share file
      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(filePath);
      }

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: 'Failed to download export' };
    }
  }

  /**
   * Import data from JSON
   */
  async importData(importData: ExportData): Promise<{ result: ImportResult; error: string | null }> {
    await this.delay(NETWORK_DELAYS.save);

    try {
      // Validate version
      if (importData.version !== '1.0.0') {
        return {
          result: {
            success: false,
            imported: 0,
            skipped: 0,
            errors: ['Unsupported export version'],
          },
          error: 'Unsupported export version',
        };
      }

      const result: ImportResult = {
        success: true,
        imported: 0,
        skipped: 0,
        errors: [],
      };

      // Import jars
      if (importData.data.jars) {
        await storageService.setItem(STORAGE_KEYS.JARS, importData.data.jars);
        result.imported += importData.data.jars.length;
      }

      // Import transactions
      if (importData.data.transactions) {
        await storageService.setItem(STORAGE_KEYS.TRANSACTIONS, importData.data.transactions);
        result.imported += importData.data.transactions.length;
      }

      // Import budgets
      if (importData.data.budgets) {
        await storageService.setItem(STORAGE_KEYS.BUDGETS, importData.data.budgets);
        result.imported += importData.data.budgets.length;
      }

      // Import goals
      if (importData.data.goals) {
        await storageService.setItem(STORAGE_KEYS.GOALS, importData.data.goals);
        result.imported += importData.data.goals.length;
      }

      // Import recurring items
      if (importData.data.recurring) {
        await storageService.setItem(STORAGE_KEYS.RECURRING, importData.data.recurring);
        result.imported += importData.data.recurring.length;
      }

      return { result, error: null };
    } catch (error) {
      return {
        result: {
          success: false,
          imported: 0,
          skipped: 0,
          errors: ['Import failed'],
        },
        error: 'Import failed',
      };
    }
  }

  /**
   * Reset all data (clear everything)
   */
  async resetAllData(): Promise<{ success: boolean; error: string | null }> {
    await this.delay(NETWORK_DELAYS.save);

    try {
      if (USE_DUMMY_DATA) {
        // Clear all storage except user and auth data
        await storageService.removeItem(STORAGE_KEYS.JARS);
        await storageService.removeItem(STORAGE_KEYS.TRANSACTIONS);
        await storageService.removeItem(STORAGE_KEYS.BUDGETS);
        await storageService.removeItem(STORAGE_KEYS.GOALS);
        await storageService.removeItem(STORAGE_KEYS.RECURRING);
        await storageService.removeItem(STORAGE_KEYS.INCOME_HISTORY);
        await storageService.removeItem(STORAGE_KEYS.MONTHLY_REPORTS);

        // Reinitialize default jars
        const user = await storageService.getItem(STORAGE_KEYS.USER);
        if (user && user.id) {
          await jarService.initializeDefaultJars(user.id);
        }
      } else {
        // Real Supabase - delete all user data
        await supabase.from('transactions').delete().neq('id', '');
        await supabase.from('budgets').delete().neq('id', '');
        await supabase.from('savings_goals').delete().neq('id', '');
        await supabase.from('recurring_items').delete().neq('id', '');
        await supabase.from('income_history').delete().neq('id', '');
        await supabase.from('monthly_reports').delete().neq('id', '');
        await supabase.from('jars').delete().neq('id', '');

        // Default jars will be recreated by trigger
      }

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: 'Failed to reset data' };
    }
  }

  /**
   * Get export summary (counts)
   */
  async getExportSummary(): Promise<{
    jars: number;
    transactions: number;
    budgets: number;
    goals: number;
    recurring: number;
    error: string | null;
  }> {
    try {
      const { jars } = await jarService.getJars();
      const { transactions } = await transactionService.getTransactions();
      const { budgets } = await budgetService.getBudgetHistory(100);
      const { goals } = await goalService.getGoals();
      const { items: recurring } = await recurringService.getRecurringItems();

      return {
        jars: jars.length,
        transactions: transactions.length,
        budgets: budgets.length,
        goals: goals.length,
        recurring: recurring.length,
        error: null,
      };
    } catch (error) {
      return {
        jars: 0,
        transactions: 0,
        budgets: 0,
        goals: 0,
        recurring: 0,
        error: 'Failed to get export summary',
      };
    }
  }
}

export default new ExportService();
