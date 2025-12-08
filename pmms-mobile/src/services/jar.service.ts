/**
 * Jar Service (DUMMY MODE)
 * Manages jar operations using AsyncStorage
 * Replace with real Supabase queries when USE_DUMMY_DATA = false
 */

import { Jar, JarInsert, JarUpdate } from '@/types/database.types';
import { STORAGE_KEYS, NETWORK_DELAYS, USE_DUMMY_DATA, DEFAULT_JARS } from '@/constants/config';
import storageService from './storage.service';
import { supabase } from './supabase.service';

class JarService {
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
    return `jar_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Initialize default jars for new user
   */
  async initializeDefaultJars(userId: string): Promise<{ error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        const jars: Jar[] = DEFAULT_JARS.map(jar => ({
          id: this.generateId(),
          user_id: userId,
          name: jar.name,
          category: jar.category,
          balance: 0,
          percentage: jar.percentage,
          color: jar.color,
          icon: jar.icon,
          description: jar.description,
          is_default: true,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }));

        await storageService.setItem(STORAGE_KEYS.JARS, jars);
        return { error: null };
      } catch (error) {
        return { error: 'Failed to initialize jars' };
      }
    } else {
      // Real Supabase - default jars created by trigger
      return { error: null };
    }
  }

  /**
   * Get all jars for current user
   */
  async getJars(): Promise<{ jars: Jar[]; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.fetch);

      try {
        const jars = await storageService.getItem<Jar[]>(STORAGE_KEYS.JARS) || [];
        return { jars, error: null };
      } catch (error) {
        return { jars: [], error: 'Failed to fetch jars' };
      }
    } else {
      const { data, error } = await supabase
        .from('jars')
        .select('*')
        .order('created_at', { ascending: true });

      return {
        jars: data || [],
        error: error?.message || null,
      };
    }
  }

  /**
   * Get single jar by ID
   */
  async getJar(jarId: string): Promise<{ jar: Jar | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.fetch);

      try {
        const jars = await storageService.getItem<Jar[]>(STORAGE_KEYS.JARS) || [];
        const jar = jars.find(j => j.id === jarId);
        return { jar: jar || null, error: jar ? null : 'Jar not found' };
      } catch (error) {
        return { jar: null, error: 'Failed to fetch jar' };
      }
    } else {
      const { data, error } = await supabase
        .from('jars')
        .select('*')
        .eq('id', jarId)
        .single();

      return {
        jar: data,
        error: error?.message || null,
      };
    }
  }

  /**
   * Create custom jar
   */
  async createJar(jarData: JarInsert): Promise<{ jar: Jar | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        const jars = await storageService.getItem<Jar[]>(STORAGE_KEYS.JARS) || [];
        
        const newJar: Jar = {
          id: this.generateId(),
          user_id: jarData.user_id,
          name: jarData.name,
          category: jarData.category || 'CUSTOM',
          balance: jarData.balance || 0,
          percentage: jarData.percentage || 0,
          color: jarData.color || '#6B7280',
          icon: jarData.icon || 'jar',
          description: jarData.description,
          is_default: false,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        jars.push(newJar);
        await storageService.setItem(STORAGE_KEYS.JARS, jars);

        return { jar: newJar, error: null };
      } catch (error) {
        return { jar: null, error: 'Failed to create jar' };
      }
    } else {
      const { data, error } = await supabase
        .from('jars')
        .insert(jarData)
        .select()
        .single();

      return {
        jar: data,
        error: error?.message || null,
      };
    }
  }

  /**
   * Update jar
   */
  async updateJar(jarId: string, updates: JarUpdate): Promise<{ jar: Jar | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        const jars = await storageService.getItem<Jar[]>(STORAGE_KEYS.JARS) || [];
        const index = jars.findIndex(j => j.id === jarId);

        if (index === -1) {
          return { jar: null, error: 'Jar not found' };
        }

        const updatedJar: Jar = {
          ...jars[index],
          ...updates,
          updated_at: new Date().toISOString(),
        };

        jars[index] = updatedJar;
        await storageService.setItem(STORAGE_KEYS.JARS, jars);

        return { jar: updatedJar, error: null };
      } catch (error) {
        return { jar: null, error: 'Failed to update jar' };
      }
    } else {
      const { data, error } = await supabase
        .from('jars')
        .update(updates)
        .eq('id', jarId)
        .select()
        .single();

      return {
        jar: data,
        error: error?.message || null,
      };
    }
  }

  /**
   * Delete jar
   */
  async deleteJar(jarId: string): Promise<{ error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        const jars = await storageService.getItem<Jar[]>(STORAGE_KEYS.JARS) || [];
        const jar = jars.find(j => j.id === jarId);

        if (!jar) {
          return { error: 'Jar not found' };
        }

        if (jar.is_default) {
          return { error: 'Cannot delete default jar' };
        }

        const filtered = jars.filter(j => j.id !== jarId);
        await storageService.setItem(STORAGE_KEYS.JARS, filtered);

        return { error: null };
      } catch (error) {
        return { error: 'Failed to delete jar' };
      }
    } else {
      const { error } = await supabase
        .from('jars')
        .delete()
        .eq('id', jarId);

      return { error: error?.message || null };
    }
  }

  /**
   * Adjust jar balance (add or subtract)
   */
  async adjustBalance(jarId: string, amount: number): Promise<{ jar: Jar | null; error: string | null }> {
    if (USE_DUMMY_DATA) {
      await this.delay(NETWORK_DELAYS.save);

      try {
        const jars = await storageService.getItem<Jar[]>(STORAGE_KEYS.JARS) || [];
        const index = jars.findIndex(j => j.id === jarId);

        if (index === -1) {
          return { jar: null, error: 'Jar not found' };
        }

        const newBalance = jars[index].balance + amount;

        if (newBalance < 0) {
          return { jar: null, error: 'Insufficient balance' };
        }

        jars[index] = {
          ...jars[index],
          balance: newBalance,
          updated_at: new Date().toISOString(),
        };

        await storageService.setItem(STORAGE_KEYS.JARS, jars);

        return { jar: jars[index], error: null };
      } catch (error) {
        return { jar: null, error: 'Failed to adjust balance' };
      }
    } else {
      // First get current balance
      const { data: currentJar, error: fetchError } = await supabase
        .from('jars')
        .select('balance')
        .eq('id', jarId)
        .single();

      if (fetchError || !currentJar) {
        return { jar: null, error: 'Jar not found' };
      }

      const newBalance = currentJar.balance + amount;

      if (newBalance < 0) {
        return { jar: null, error: 'Insufficient balance' };
      }

      const { data, error } = await supabase
        .from('jars')
        .update({ balance: newBalance })
        .eq('id', jarId)
        .select()
        .single();

      return {
        jar: data,
        error: error?.message || null,
      };
    }
  }

  /**
   * Get total balance across all jars
   */
  async getTotalBalance(): Promise<{ total: number; error: string | null }> {
    const { jars, error } = await this.getJars();

    if (error) {
      return { total: 0, error };
    }

    const total = jars.reduce((sum, jar) => sum + jar.balance, 0);
    return { total, error: null };
  }
}

export default new JarService();
