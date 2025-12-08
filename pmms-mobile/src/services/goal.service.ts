/**
 * Savings Goal Service (DUMMY MODE)
 * Manages savings goals using AsyncStorage
 * Replace with real Supabase queries when USE_DUMMY_DATA = false
 */

import { SavingsGoal, SavingsGoalInsert, SavingsGoalUpdate } from '@/types/database.types';
import { STORAGE_KEYS, NETWORK_DELAYS, USE_DUMMY_DATA } from '@/constants/config';
import storageService from './storage.service';
import { supabase } from './supabase.service';

class GoalService {
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
    return `goal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get all goals for current user
   */
  async getGoals(): Promise<{ goals: SavingsGoal[]; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.fetch);

      try {
        const goals = await storageService.getItem<SavingsGoal[]>(STORAGE_KEYS.GOALS) || [];
        
        // Sort by priority and deadline
        goals.sort((a, b) => {
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          if (a.priority !== b.priority) {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
          }
          if (a.deadline && b.deadline) {
            return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
          }
          return 0;
        });

        return { goals, error: null };
      } catch (error) {
        return { goals: [], error: 'Failed to fetch goals' };
      }
    } else {
      const { data, error } = await supabase
        .from('savings_goals')
        .select('*')
        .order('priority', { ascending: true })
        .order('deadline', { ascending: true });

      return {
        goals: data || [],
        error: error?.message || null,
      };
    }
  }

  /**
   * Get single goal by ID
   */
  async getGoal(goalId: string): Promise<{ goal: SavingsGoal | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.fetch);

      try {
        const goals = await storageService.getItem<SavingsGoal[]>(STORAGE_KEYS.GOALS) || [];
        const goal = goals.find(g => g.id === goalId);
        return { goal: goal || null, error: goal ? null : 'Goal not found' };
      } catch (error) {
        return { goal: null, error: 'Failed to fetch goal' };
      }
    } else {
      const { data, error } = await supabase
        .from('savings_goals')
        .select('*')
        .eq('id', goalId)
        .single();

      return {
        goal: data,
        error: error?.message || null,
      };
    }
  }

  /**
   * Create new goal
   */
  async createGoal(goalData: SavingsGoalInsert): Promise<{ goal: SavingsGoal | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        const goals = await storageService.getItem<SavingsGoal[]>(STORAGE_KEYS.GOALS) || [];

        const newGoal: SavingsGoal = {
          id: this.generateId(),
          user_id: goalData.user_id,
          name: goalData.name,
          target_amount: goalData.target_amount,
          current_amount: goalData.current_amount || 0,
          deadline: goalData.deadline,
          priority: goalData.priority || 'medium',
          description: goalData.description,
          is_completed: false,
          completed_at: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        goals.push(newGoal);
        await storageService.setItem(STORAGE_KEYS.GOALS, goals);

        return { goal: newGoal, error: null };
      } catch (error) {
        return { goal: null, error: 'Failed to create goal' };
      }
    } else {
      const { data, error } = await supabase
        .from('savings_goals')
        .insert(goalData)
        .select()
        .single();

      return {
        goal: data,
        error: error?.message || null,
      };
    }
  }

  /**
   * Update goal
   */
  async updateGoal(
    goalId: string,
    updates: SavingsGoalUpdate
  ): Promise<{ goal: SavingsGoal | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        const goals = await storageService.getItem<SavingsGoal[]>(STORAGE_KEYS.GOALS) || [];
        const index = goals.findIndex(g => g.id === goalId);

        if (index === -1) {
          return { goal: null, error: 'Goal not found' };
        }

        const updatedGoal: SavingsGoal = {
          ...goals[index],
          ...updates,
          updated_at: new Date().toISOString(),
        };

        // Check if goal is now completed
        if (updatedGoal.current_amount >= updatedGoal.target_amount && !updatedGoal.is_completed) {
          updatedGoal.is_completed = true;
          updatedGoal.completed_at = new Date().toISOString();
        }

        goals[index] = updatedGoal;
        await storageService.setItem(STORAGE_KEYS.GOALS, goals);

        return { goal: updatedGoal, error: null };
      } catch (error) {
        return { goal: null, error: 'Failed to update goal' };
      }
    } else {
      // Get current goal to check completion
      const { data: currentGoal } = await supabase
        .from('savings_goals')
        .select('*')
        .eq('id', goalId)
        .single();

      if (!currentGoal) {
        return { goal: null, error: 'Goal not found' };
      }

      // Check if goal is now completed
      const newAmount = updates.current_amount !== undefined ? updates.current_amount : currentGoal.current_amount;
      if (newAmount >= currentGoal.target_amount && !currentGoal.is_completed) {
        updates.is_completed = true;
        updates.completed_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('savings_goals')
        .update(updates)
        .eq('id', goalId)
        .select()
        .single();

      return {
        goal: data,
        error: error?.message || null,
      };
    }
  }

  /**
   * Delete goal
   */
  async deleteGoal(goalId: string): Promise<{ error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        const goals = await storageService.getItem<SavingsGoal[]>(STORAGE_KEYS.GOALS) || [];
        const filtered = goals.filter(g => g.id !== goalId);

        if (filtered.length === goals.length) {
          return { error: 'Goal not found' };
        }

        await storageService.setItem(STORAGE_KEYS.GOALS, filtered);
        return { error: null };
      } catch (error) {
        return { error: 'Failed to delete goal' };
      }
    } else {
      const { error } = await supabase
        .from('savings_goals')
        .delete()
        .eq('id', goalId);

      return { error: error?.message || null };
    }
  }

  /**
   * Contribute to goal
   */
  async contribute(goalId: string, amount: number): Promise<{ goal: SavingsGoal | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        const goals = await storageService.getItem<SavingsGoal[]>(STORAGE_KEYS.GOALS) || [];
        const index = goals.findIndex(g => g.id === goalId);

        if (index === -1) {
          return { goal: null, error: 'Goal not found' };
        }

        const newAmount = goals[index].current_amount + amount;
        const isCompleted = newAmount >= goals[index].target_amount;

        goals[index] = {
          ...goals[index],
          current_amount: newAmount,
          is_completed: isCompleted,
          completed_at: isCompleted && !goals[index].is_completed ? new Date().toISOString() : goals[index].completed_at,
          updated_at: new Date().toISOString(),
        };

        await storageService.setItem(STORAGE_KEYS.GOALS, goals);

        return { goal: goals[index], error: null };
      } catch (error) {
        return { goal: null, error: 'Failed to contribute to goal' };
      }
    } else {
      // Get current goal
      const { data: currentGoal } = await supabase
        .from('savings_goals')
        .select('*')
        .eq('id', goalId)
        .single();

      if (!currentGoal) {
        return { goal: null, error: 'Goal not found' };
      }

      const newAmount = currentGoal.current_amount + amount;
      const isCompleted = newAmount >= currentGoal.target_amount;

      const { data, error } = await supabase
        .from('savings_goals')
        .update({
          current_amount: newAmount,
          is_completed: isCompleted,
          completed_at: isCompleted && !currentGoal.is_completed ? new Date().toISOString() : currentGoal.completed_at,
        })
        .eq('id', goalId)
        .select()
        .single();

      return {
        goal: data,
        error: error?.message || null,
      };
    }
  }

  /**
   * Get goal progress statistics
   */
  async getStatistics(): Promise<{
    totalGoals: number;
    completedGoals: number;
    activeGoals: number;
    totalTargetAmount: number;
    totalCurrentAmount: number;
    overallProgress: number;
    error: string | null;
  }> {
    const { goals, error } = await this.getGoals();

    if (error) {
      return {
        totalGoals: 0,
        completedGoals: 0,
        activeGoals: 0,
        totalTargetAmount: 0,
        totalCurrentAmount: 0,
        overallProgress: 0,
        error,
      };
    }

    const totalGoals = goals.length;
    const completedGoals = goals.filter(g => g.is_completed).length;
    const activeGoals = totalGoals - completedGoals;
    const totalTargetAmount = goals.reduce((sum, g) => sum + g.target_amount, 0);
    const totalCurrentAmount = goals.reduce((sum, g) => sum + g.current_amount, 0);
    const overallProgress = totalTargetAmount > 0 ? (totalCurrentAmount / totalTargetAmount) * 100 : 0;

    return {
      totalGoals,
      completedGoals,
      activeGoals,
      totalTargetAmount,
      totalCurrentAmount,
      overallProgress,
      error: null,
    };
  }
}

export default new GoalService();
