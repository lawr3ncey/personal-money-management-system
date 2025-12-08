/**
 * Database Types
 * 
 * These types match the Supabase PostgreSQL schema.
 * When you set up Supabase, you can generate these automatically using:
 * npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.types.ts
 */

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
      };
      jars: {
        Row: Jar;
        Insert: JarInsert;
        Update: JarUpdate;
      };
      transactions: {
        Row: Transaction;
        Insert: TransactionInsert;
        Update: TransactionUpdate;
      };
      income_history: {
        Row: IncomeHistory;
        Insert: IncomeHistoryInsert;
        Update: IncomeHistoryUpdate;
      };
      budgets: {
        Row: Budget;
        Insert: BudgetInsert;
        Update: BudgetUpdate;
      };
      monthly_reports: {
        Row: MonthlyReport;
        Insert: MonthlyReportInsert;
        Update: MonthlyReportUpdate;
      };
      savings_goals: {
        Row: SavingsGoal;
        Insert: SavingsGoalInsert;
        Update: SavingsGoalUpdate;
      };
      recurring_items: {
        Row: RecurringItem;
        Insert: RecurringItemInsert;
        Update: RecurringItemUpdate;
      };
    };
  };
}

// ============================================
// PROFILE TYPES
// ============================================
export interface Profile {
  id: string;
  email: string;
  name: string;
  currency: string;
  theme: 'light' | 'dark';
  notifications: boolean;
  created_at: string;
  updated_at: string;
}

export type ProfileInsert = Omit<Profile, 'created_at' | 'updated_at'>;
export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'email' | 'created_at' | 'updated_at'>>;

// ============================================
// JAR TYPES
// ============================================
export interface Jar {
  id: string;
  user_id: string;
  name: string;
  category: JarCategory;
  balance: number;
  percentage: number;
  color: string;
  icon: string;
  description?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type JarCategory = 'NEC' | 'FFA' | 'EDU' | 'LTSS' | 'PLAY' | 'GIVE' | 'CUSTOM';

export type JarInsert = Omit<Jar, 'id' | 'created_at' | 'updated_at'>;
export type JarUpdate = Partial<Omit<Jar, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;

// ============================================
// TRANSACTION TYPES
// ============================================
export interface Transaction {
  id: string;
  user_id: string;
  jar_id: string;
  type: TransactionType;
  amount: number;
  description?: string | null;
  category?: string | null;
  date: string;
  created_at: string;
}

export type TransactionType = 'add' | 'subtract' | 'transfer';

export type TransactionInsert = Omit<Transaction, 'id' | 'created_at'>;
export type TransactionUpdate = Partial<Omit<Transaction, 'id' | 'user_id' | 'created_at'>>;

// ============================================
// INCOME HISTORY TYPES
// ============================================
export interface IncomeHistory {
  id: string;
  user_id: string;
  amount: number;
  source?: string | null;
  distributed_at: string;
  distribution: JarDistribution[];
  created_at: string;
}

export interface JarDistribution {
  jar_id: string;
  jar_name: string;
  amount: number;
  percentage: number;
}

export type IncomeHistoryInsert = Omit<IncomeHistory, 'id' | 'created_at'>;
export type IncomeHistoryUpdate = Partial<Omit<IncomeHistory, 'id' | 'user_id' | 'created_at'>>;

// ============================================
// BUDGET TYPES
// ============================================
export interface Budget {
  id: string;
  user_id: string;
  month: number;
  year: number;
  monthly_income: number;
  monthly_spending_goal: number;
  monthly_savings_goal: number;
  actual_income: number;
  actual_spending: number;
  actual_savings: number;
  spending_percentage: number;
  savings_percentage: number;
  status: 'active' | 'archived';
  created_at: string;
  updated_at: string;
}

export type BudgetInsert = Omit<Budget, 'id' | 'created_at' | 'updated_at'>;
export type BudgetUpdate = Partial<Omit<Budget, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;

// ============================================
// MONTHLY REPORT TYPES
// ============================================
export interface MonthlyReport {
  id: string;
  user_id: string;
  month: number;
  year: number;
  goals: BudgetGoals;
  actuals: BudgetActuals;
  percentages: BudgetPercentages;
  alerts?: BudgetAlert[] | null;
  budget_status?: string | null;
  created_at: string;
}

export interface BudgetGoals {
  income: number;
  spending: number;
  savings: number;
}

export interface BudgetActuals {
  income: number;
  spending: number;
  savings: number;
}

export interface BudgetPercentages {
  spending: number;
  savings: number;
}

export interface BudgetAlert {
  type: 'warning' | 'critical';
  category: 'spending' | 'savings';
  message: string;
  percentage: number;
}

export type MonthlyReportInsert = Omit<MonthlyReport, 'id' | 'created_at'>;
export type MonthlyReportUpdate = Partial<Omit<MonthlyReport, 'id' | 'user_id' | 'created_at'>>;

// ============================================
// SAVINGS GOAL TYPES
// ============================================
export interface SavingsGoal {
  id: string;
  user_id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline?: string | null;
  category?: string | null;
  priority: 'low' | 'medium' | 'high';
  notes?: string | null;
  is_completed: boolean;
  completed_at?: string | null;
  created_at: string;
  updated_at: string;
}

export type SavingsGoalInsert = Omit<SavingsGoal, 'id' | 'created_at' | 'updated_at'>;
export type SavingsGoalUpdate = Partial<Omit<SavingsGoal, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;

// ============================================
// RECURRING ITEM TYPES
// ============================================
export interface RecurringItem {
  id: string;
  user_id: string;
  jar_id: string;
  name: string;
  amount: number;
  type: 'income' | 'expense';
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  next_occurrence: string;
  is_active: boolean;
  auto_execute: boolean;
  notes?: string | null;
  created_at: string;
  updated_at: string;
}

export type RecurringItemInsert = Omit<RecurringItem, 'id' | 'created_at' | 'updated_at'>;
export type RecurringItemUpdate = Partial<Omit<RecurringItem, 'id' | 'user_id' | 'created_at' | 'updated_at'>>;

// ============================================
// AUTH TYPES
// ============================================
export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  updated_at?: string;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

// ============================================
// EXPORT/IMPORT TYPES
// ============================================
export interface ExportData {
  version: number;
  exported_at: string;
  user_email: string;
  data: {
    jars: Jar[];
    transactions: Transaction[];
    income_history: IncomeHistory[];
    budgets: Budget[];
    monthly_reports: MonthlyReport[];
    savings_goals: SavingsGoal[];
    recurring_items: RecurringItem[];
  };
  counts: {
    jars: number;
    transactions: number;
    income_history: number;
    budgets: number;
    monthly_reports: number;
    savings_goals: number;
    recurring_items: number;
  };
}

export interface ImportResult {
  success: boolean;
  imported: {
    jars: number;
    transactions: number;
    income_history: number;
    budgets: number;
    monthly_reports: number;
    savings_goals: number;
    recurring_items: number;
  };
  errors?: string[];
}

// ============================================
// ANALYTICS TYPES
// ============================================
export interface AnalyticsOverview {
  total_balance: number;
  monthly_income: number;
  monthly_spending: number;
  monthly_savings: number;
  budget_adherence: number;
  top_spending_categories: CategoryTotal[];
  jar_distribution: JarBalance[];
}

export interface CategoryTotal {
  category: string;
  total: number;
  percentage: number;
}

export interface JarBalance {
  jar_name: string;
  balance: number;
  percentage: number;
  color: string;
}

// ============================================
// SYNC STATUS TYPES
// ============================================
export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error' | 'offline';

export interface SyncState {
  status: SyncStatus;
  lastSyncedAt: string | null;
  message: string;
}
