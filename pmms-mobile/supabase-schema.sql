-- ============================================
-- 6 JARS MONEY MANAGER - SUPABASE SCHEMA
-- ============================================
-- This schema will be used when you set up Supabase
-- For now, the app uses dummy data stored in AsyncStorage

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE (Managed by Supabase Auth)
-- ============================================
-- Users are automatically created in auth.users
-- We'll extend with a profiles table

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  currency TEXT DEFAULT 'PHP',
  theme TEXT DEFAULT 'light',
  notifications BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- ============================================
-- JARS TABLE
-- ============================================
CREATE TABLE jars (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  balance DECIMAL(12, 2) DEFAULT 0 NOT NULL,
  percentage INTEGER NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
  color TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE jars ENABLE ROW LEVEL SECURITY;

-- Jars policies
CREATE POLICY "Users can view own jars" ON jars
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own jars" ON jars
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own jars" ON jars
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own jars" ON jars
  FOR DELETE USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_jars_user_id ON jars(user_id);
CREATE INDEX idx_jars_category ON jars(category);

-- ============================================
-- TRANSACTIONS TABLE
-- ============================================
CREATE TABLE transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  jar_id UUID REFERENCES jars(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('add', 'subtract', 'transfer')),
  amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
  description TEXT,
  category TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Transactions policies
CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions" ON transactions
  FOR DELETE USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_jar_id ON transactions(jar_id);
CREATE INDEX idx_transactions_date ON transactions(date DESC);
CREATE INDEX idx_transactions_type ON transactions(type);

-- ============================================
-- INCOME HISTORY TABLE
-- ============================================
CREATE TABLE income_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
  source TEXT,
  distributed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  distribution JSONB NOT NULL, -- Stores jar allocations
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE income_history ENABLE ROW LEVEL SECURITY;

-- Income history policies
CREATE POLICY "Users can view own income history" ON income_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own income history" ON income_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_income_history_user_id ON income_history(user_id);
CREATE INDEX idx_income_history_date ON income_history(distributed_at DESC);

-- ============================================
-- BUDGETS TABLE
-- ============================================
CREATE TABLE budgets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  year INTEGER NOT NULL,
  monthly_income DECIMAL(12, 2) DEFAULT 0,
  monthly_spending_goal DECIMAL(12, 2) DEFAULT 0,
  monthly_savings_goal DECIMAL(12, 2) DEFAULT 0,
  actual_income DECIMAL(12, 2) DEFAULT 0,
  actual_spending DECIMAL(12, 2) DEFAULT 0,
  actual_savings DECIMAL(12, 2) DEFAULT 0,
  spending_percentage DECIMAL(5, 2) DEFAULT 0,
  savings_percentage DECIMAL(5, 2) DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, month, year)
);

-- Enable RLS
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;

-- Budgets policies
CREATE POLICY "Users can view own budgets" ON budgets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own budgets" ON budgets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own budgets" ON budgets
  FOR UPDATE USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_budgets_user_id ON budgets(user_id);
CREATE INDEX idx_budgets_date ON budgets(year DESC, month DESC);

-- ============================================
-- MONTHLY REPORTS TABLE
-- ============================================
CREATE TABLE monthly_reports (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  year INTEGER NOT NULL,
  goals JSONB NOT NULL,
  actuals JSONB NOT NULL,
  percentages JSONB NOT NULL,
  alerts JSONB,
  budget_status TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, month, year)
);

-- Enable RLS
ALTER TABLE monthly_reports ENABLE ROW LEVEL SECURITY;

-- Monthly reports policies
CREATE POLICY "Users can view own reports" ON monthly_reports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reports" ON monthly_reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_monthly_reports_user_id ON monthly_reports(user_id);
CREATE INDEX idx_monthly_reports_date ON monthly_reports(year DESC, month DESC);

-- ============================================
-- SAVINGS GOALS TABLE
-- ============================================
CREATE TABLE savings_goals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  target_amount DECIMAL(12, 2) NOT NULL CHECK (target_amount > 0),
  current_amount DECIMAL(12, 2) DEFAULT 0 CHECK (current_amount >= 0),
  deadline DATE,
  category TEXT,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  notes TEXT,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE savings_goals ENABLE ROW LEVEL SECURITY;

-- Savings goals policies
CREATE POLICY "Users can view own goals" ON savings_goals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals" ON savings_goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals" ON savings_goals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own goals" ON savings_goals
  FOR DELETE USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_savings_goals_user_id ON savings_goals(user_id);
CREATE INDEX idx_savings_goals_completed ON savings_goals(is_completed);
CREATE INDEX idx_savings_goals_deadline ON savings_goals(deadline);

-- ============================================
-- RECURRING ITEMS TABLE
-- ============================================
CREATE TABLE recurring_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  jar_id UUID REFERENCES jars(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  frequency TEXT NOT NULL CHECK (frequency IN ('daily', 'weekly', 'monthly', 'yearly')),
  next_occurrence DATE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  auto_execute BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE recurring_items ENABLE ROW LEVEL SECURITY;

-- Recurring items policies
CREATE POLICY "Users can view own recurring items" ON recurring_items
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own recurring items" ON recurring_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own recurring items" ON recurring_items
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own recurring items" ON recurring_items
  FOR DELETE USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_recurring_items_user_id ON recurring_items(user_id);
CREATE INDEX idx_recurring_items_jar_id ON recurring_items(jar_id);
CREATE INDEX idx_recurring_items_next_occurrence ON recurring_items(next_occurrence);
CREATE INDEX idx_recurring_items_active ON recurring_items(is_active);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jars_updated_at BEFORE UPDATE ON jars
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_budgets_updated_at BEFORE UPDATE ON budgets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_savings_goals_updated_at BEFORE UPDATE ON savings_goals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recurring_items_updated_at BEFORE UPDATE ON recurring_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create default jars for new users
CREATE OR REPLACE FUNCTION create_default_jars()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO jars (user_id, name, category, balance, percentage, color, icon, description)
  VALUES
    (NEW.id, 'Necessities', 'NEC', 0, 55, '#10b981', '🏠', 'Bills, food, transportation'),
    (NEW.id, 'Financial Freedom', 'FFA', 0, 10, '#3b82f6', '💰', 'Investments, passive income'),
    (NEW.id, 'Education', 'EDU', 0, 10, '#8b5cf6', '📚', 'Books, courses, skills'),
    (NEW.id, 'Long-term Savings', 'LTSS', 0, 10, '#f59e0b', '🏦', 'Emergency fund, big purchases'),
    (NEW.id, 'Play', 'PLAY', 0, 10, '#ef4444', '🎮', 'Fun, hobbies, entertainment'),
    (NEW.id, 'Give', 'GIVE', 0, 5, '#ec4899', '🎁', 'Charity, gifts, donations');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create default jars when profile is created
CREATE TRIGGER create_default_jars_trigger
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_default_jars();

-- ============================================
-- STORAGE BUCKETS
-- ============================================
-- For export/import files
-- Run this in Supabase SQL Editor or Dashboard:

-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('exports', 'exports', false);

-- CREATE POLICY "Users can upload own exports"
-- ON storage.objects FOR INSERT
-- WITH CHECK (bucket_id = 'exports' AND auth.uid()::text = (storage.foldername(name))[1]);

-- CREATE POLICY "Users can view own exports"
-- ON storage.objects FOR SELECT
-- USING (bucket_id = 'exports' AND auth.uid()::text = (storage.foldername(name))[1]);

-- CREATE POLICY "Users can delete own exports"
-- ON storage.objects FOR DELETE
-- USING (bucket_id = 'exports' AND auth.uid()::text = (storage.foldername(name))[1]);
