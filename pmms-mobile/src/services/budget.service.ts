/**
 * Budget Service (DUMMY MODE)
 * Manages monthly budget operations using AsyncStorage
 * Replace with real Supabase queries when USE_DUMMY_DATA = false
 */

import { Budget, BudgetInsert, BudgetUpdate, MonthlyReport } from '@/types/database.types';
import { STORAGE_KEYS, NETWORK_DELAYS, USE_DUMMY_DATA } from '@/constants/config';
import storageService from './storage.service';
import { supabase } from './supabase.service';

class BudgetService {
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
    return `budget_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get current month's budget
   */
  async getCurrentBudget(): Promise<{ budget: Budget | null; error: string | null }> {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    return this.getBudgetByMonth(month, year);
  }

  /**
   * Get budget by month and year
   */
  async getBudgetByMonth(month: number, year: number): Promise<{ budget: Budget | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.fetch);

      try {
        const budgets = await storageService.getItem<Budget[]>(STORAGE_KEYS.BUDGETS) || [];
        const budget = budgets.find(b => b.month === month && b.year === year);
        return { budget: budget || null, error: null };
      } catch (error) {
        return { budget: null, error: 'Failed to fetch budget' };
      }
    } else {
      const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .eq('month', month)
        .eq('year', year)
        .single();

      return {
        budget: data,
        error: error?.message || null,
      };
    }
  }

  /**
   * Create or update budget
   */
  async saveBudget(budgetData: BudgetInsert): Promise<{ budget: Budget | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        const budgets = await storageService.getItem<Budget[]>(STORAGE_KEYS.BUDGETS) || [];
        const existingIndex = budgets.findIndex(
          b => b.month === budgetData.month && b.year === budgetData.year
        );

        let savedBudget: Budget;

        if (existingIndex !== -1) {
          // Update existing
          savedBudget = {
            ...budgets[existingIndex],
            ...budgetData,
            updated_at: new Date().toISOString(),
          };
          budgets[existingIndex] = savedBudget;
        } else {
          // Create new
          savedBudget = {
            id: this.generateId(),
            user_id: budgetData.user_id,
            month: budgetData.month,
            year: budgetData.year,
            income_goal: budgetData.income_goal,
            spending_goal: budgetData.spending_goal,
            savings_goal: budgetData.savings_goal,
            actual_income: budgetData.actual_income || 0,
            actual_spending: budgetData.actual_spending || 0,
            actual_savings: budgetData.actual_savings || 0,
            income_percentage: budgetData.income_percentage || 0,
            spending_percentage: budgetData.spending_percentage || 0,
            savings_percentage: budgetData.savings_percentage || 0,
            alerts: budgetData.alerts || [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          budgets.push(savedBudget);
        }

        await storageService.setItem(STORAGE_KEYS.BUDGETS, budgets);
        return { budget: savedBudget, error: null };
      } catch (error) {
        return { budget: null, error: 'Failed to save budget' };
      }
    } else {
      // Check if budget exists
      const { data: existing } = await supabase
        .from('budgets')
        .select('id')
        .eq('month', budgetData.month)
        .eq('year', budgetData.year)
        .single();

      if (existing) {
        // Update
        const { data, error } = await supabase
          .from('budgets')
          .update(budgetData)
          .eq('id', existing.id)
          .select()
          .single();

        return {
          budget: data,
          error: error?.message || null,
        };
      } else {
        // Insert
        const { data, error } = await supabase
          .from('budgets')
          .insert(budgetData)
          .select()
          .single();

        return {
          budget: data,
          error: error?.message || null,
        };
      }
    }
  }

  /**
   * Update budget actuals (income, spending, savings)
   */
  async updateActuals(
    month: number,
    year: number,
    actuals: {
      actual_income?: number;
      actual_spending?: number;
      actual_savings?: number;
    }
  ): Promise<{ budget: Budget | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        const budgets = await storageService.getItem<Budget[]>(STORAGE_KEYS.BUDGETS) || [];
        const index = budgets.findIndex(b => b.month === month && b.year === year);

        if (index === -1) {
          return { budget: null, error: 'Budget not found' };
        }

        const budget = budgets[index];

        // Calculate percentages
        const income_percentage = budget.income_goal > 0
          ? ((actuals.actual_income || budget.actual_income) / budget.income_goal) * 100
          : 0;

        const spending_percentage = budget.spending_goal > 0
          ? ((actuals.actual_spending || budget.actual_spending) / budget.spending_goal) * 100
          : 0;

        const savings_percentage = budget.savings_goal > 0
          ? ((actuals.actual_savings || budget.actual_savings) / budget.savings_goal) * 100
          : 0;

        // Generate alerts
        const alerts = this.generateAlerts(
          spending_percentage,
          income_percentage,
          savings_percentage
        );

        budgets[index] = {
          ...budget,
          ...actuals,
          income_percentage,
          spending_percentage,
          savings_percentage,
          alerts,
          updated_at: new Date().toISOString(),
        };

        await storageService.setItem(STORAGE_KEYS.BUDGETS, budgets);
        return { budget: budgets[index], error: null };
      } catch (error) {
        return { budget: null, error: 'Failed to update actuals' };
      }
    } else {
      // Get current budget first
      const { data: budget, error: fetchError } = await supabase
        .from('budgets')
        .select('*')
        .eq('month', month)
        .eq('year', year)
        .single();

      if (fetchError || !budget) {
        return { budget: null, error: 'Budget not found' };
      }

      // Calculate percentages
      const income_percentage = budget.income_goal > 0
        ? ((actuals.actual_income || budget.actual_income) / budget.income_goal) * 100
        : 0;

      const spending_percentage = budget.spending_goal > 0
        ? ((actuals.actual_spending || budget.actual_spending) / budget.spending_goal) * 100
        : 0;

      const savings_percentage = budget.savings_goal > 0
        ? ((actuals.actual_savings || budget.actual_savings) / budget.savings_goal) * 100
        : 0;

      // Generate alerts
      const alerts = this.generateAlerts(
        spending_percentage,
        income_percentage,
        savings_percentage
      );

      // Update
      const { data, error } = await supabase
        .from('budgets')
        .update({
          ...actuals,
          income_percentage,
          spending_percentage,
          savings_percentage,
          alerts,
        })
        .eq('id', budget.id)
        .select()
        .single();

      return {
        budget: data,
        error: error?.message || null,
      };
    }
  }

  /**
   * Generate budget alerts based on percentages
   */
  private generateAlerts(
    spendingPercentage: number,
    incomePercentage: number,
    savingsPercentage: number
  ): Array<{ type: string; category: string; message: string; percentage: number }> {
    const alerts: Array<{ type: string; category: string; message: string; percentage: number }> = [];

    // Spending alerts
    if (spendingPercentage >= 100) {
      alerts.push({
        type: 'danger',
        category: 'spending',
        message: 'You have exceeded your spending budget!',
        percentage: spendingPercentage,
      });
    } else if (spendingPercentage >= 90) {
      alerts.push({
        type: 'warning',
        category: 'spending',
        message: 'You are approaching your spending limit (90%)',
        percentage: spendingPercentage,
      });
    } else if (spendingPercentage >= 70) {
      alerts.push({
        type: 'info',
        category: 'spending',
        message: 'You have used 70% of your spending budget',
        percentage: spendingPercentage,
      });
    }

    // Income alerts
    if (incomePercentage < 50 && new Date().getDate() > 15) {
      alerts.push({
        type: 'warning',
        category: 'income',
        message: 'Income is below 50% of goal mid-month',
        percentage: incomePercentage,
      });
    }

    // Savings alerts
    if (savingsPercentage < 30 && new Date().getDate() > 20) {
      alerts.push({
        type: 'info',
        category: 'savings',
        message: 'Savings goal progress is low for this month',
        percentage: savingsPercentage,
      });
    }

    return alerts;
  }

  /**
   * Get budget history
   */
  async getBudgetHistory(limit: number = 12): Promise<{ budgets: Budget[]; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.fetch);

      try {
        let budgets = await storageService.getItem<Budget[]>(STORAGE_KEYS.BUDGETS) || [];
        
        // Sort by year and month descending
        budgets.sort((a, b) => {
          if (a.year !== b.year) return b.year - a.year;
          return b.month - a.month;
        });

        budgets = budgets.slice(0, limit);

        return { budgets, error: null };
      } catch (error) {
        return { budgets: [], error: 'Failed to fetch budget history' };
      }
    } else {
      const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .order('year', { ascending: false })
        .order('month', { ascending: false })
        .limit(limit);

      return {
        budgets: data || [],
        error: error?.message || null,
      };
    }
  }

  /**
   * Archive current month to monthly reports
   */
  async archiveMonth(month: number, year: number): Promise<{ error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        const { budget, error } = await this.getBudgetByMonth(month, year);

        if (error || !budget) {
          return { error: error || 'Budget not found' };
        }

        const reports = await storageService.getItem<MonthlyReport[]>(STORAGE_KEYS.MONTHLY_REPORTS) || [];

        const report: MonthlyReport = {
          id: `report_${Date.now()}`,
          user_id: budget.user_id,
          month: budget.month,
          year: budget.year,
          total_income: budget.actual_income,
          total_spending: budget.actual_spending,
          total_savings: budget.actual_savings,
          budget_data: budget,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        reports.push(report);
        await storageService.setItem(STORAGE_KEYS.MONTHLY_REPORTS, reports);

        return { error: null };
      } catch (error) {
        return { error: 'Failed to archive month' };
      }
    } else {
      const { data: budget, error: fetchError } = await supabase
        .from('budgets')
        .select('*')
        .eq('month', month)
        .eq('year', year)
        .single();

      if (fetchError || !budget) {
        return { error: 'Budget not found' };
      }

      const { error } = await supabase
        .from('monthly_reports')
        .insert({
          month: budget.month,
          year: budget.year,
          total_income: budget.actual_income,
          total_spending: budget.actual_spending,
          total_savings: budget.actual_savings,
          budget_data: budget,
        });

      return { error: error?.message || null };
    }
  }

  /**
   * Reset current month budget (for new month)
   */
  async resetCurrentMonth(): Promise<{ error: string | null }> {
    const now = new Date();
    const lastMonth = now.getMonth() === 0 ? 12 : now.getMonth();
    const lastYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

    // Archive last month
    await this.archiveMonth(lastMonth, lastYear);

    // Budget for current month will be created when user sets it
    return { error: null };
  }
}

export default new BudgetService();
