// 🔴 DUMMY DATA - Replace with real Brankas/Plaid API later

export interface BankProvider {
  id: string;
  name: string;
  logo: string;
  color: string;
  supported: boolean;
}

export interface BankAccount {
  id: string;
  bankId: string;
  bankName: string;
  accountType: 'savings' | 'checking' | 'credit' | 'ewallet';
  accountNumber: string;
  accountName: string;
  balance: number;
  currency: string;
  isLinked: boolean;
  linkedDate?: string;
  lastSynced?: string;
}

export interface BankTransaction {
  id: string;
  bankId: string;
  bankName: string;
  accountId: string;
  date: string;
  merchant: string;
  description: string;
  amount: number;
  category: string;
  status: 'completed' | 'pending' | 'cancelled';
  suggestedJar?: string;
  autoCategorizationConfidence?: number;
}

// Mock Bank Providers
export const MOCK_BANK_PROVIDERS: BankProvider[] = [
  {
    id: 'bpi',
    name: 'BPI',
    logo: '🏦',
    color: '#D32027',
    supported: true
  },
  {
    id: 'bdo',
    name: 'BDO',
    logo: '🏦',
    color: '#003DA5',
    supported: true
  },
  {
    id: 'gcash',
    name: 'GCash',
    logo: '💳',
    color: '#007DFF',
    supported: true
  },
  {
    id: 'maya',
    name: 'Maya',
    logo: '💳',
    color: '#00D632',
    supported: true
  },
  {
    id: 'metrobank',
    name: 'Metrobank',
    logo: '🏦',
    color: '#FF6B00',
    supported: true
  },
  {
    id: 'unionbank',
    name: 'UnionBank',
    logo: '🏦',
    color: '#009639',
    supported: false
  }
];

// Mock Bank Accounts
export const MOCK_BANK_ACCOUNTS: BankAccount[] = [
  {
    id: 'acc_001',
    bankId: 'bpi',
    bankName: 'BPI',
    accountType: 'savings',
    accountNumber: '****1234',
    accountName: 'Main Savings',
    balance: 52300.25,
    currency: 'PHP',
    isLinked: true,
    linkedDate: '2025-01-01T10:00:00Z',
    lastSynced: '2025-12-05T08:30:00Z'
  },
  {
    id: 'acc_002',
    bankId: 'bdo',
    bankName: 'BDO',
    accountType: 'checking',
    accountNumber: '****5678',
    accountName: 'Payroll Account',
    balance: 18420.00,
    currency: 'PHP',
    isLinked: true,
    linkedDate: '2025-01-15T14:20:00Z',
    lastSynced: '2025-12-05T08:30:00Z'
  },
  {
    id: 'acc_003',
    bankId: 'bpi',
    bankName: 'BPI',
    accountType: 'credit',
    accountNumber: '****9012',
    accountName: 'Credit Card',
    balance: -12450.00,
    currency: 'PHP',
    isLinked: true,
    linkedDate: '2025-02-01T09:15:00Z',
    lastSynced: '2025-12-05T08:30:00Z'
  },
  {
    id: 'acc_004',
    bankId: 'gcash',
    bankName: 'GCash',
    accountType: 'ewallet',
    accountNumber: '09171234567',
    accountName: 'GCash Wallet',
    balance: 3250.50,
    currency: 'PHP',
    isLinked: true,
    linkedDate: '2025-01-20T16:45:00Z',
    lastSynced: '2025-12-05T08:30:00Z'
  },
  {
    id: 'acc_005',
    bankId: 'maya',
    bankName: 'Maya',
    accountType: 'ewallet',
    accountNumber: '09181234567',
    accountName: 'Maya Wallet',
    balance: 1580.75,
    currency: 'PHP',
    isLinked: true,
    linkedDate: '2025-02-10T11:30:00Z',
    lastSynced: '2025-12-05T08:30:00Z'
  }
];

// Mock Bank Transactions
export const MOCK_BANK_TRANSACTIONS: BankTransaction[] = [
  {
    id: 'trx_001',
    bankId: 'bpi',
    bankName: 'BPI',
    accountId: 'acc_001',
    date: '2025-12-05',
    merchant: 'Jollibee',
    description: 'Jollibee Katipunan Branch',
    amount: -185,
    category: 'Food',
    status: 'completed',
    suggestedJar: 'Necessities (55%)',
    autoCategorizationConfidence: 95
  },
  {
    id: 'trx_002',
    bankId: 'bdo',
    bankName: 'BDO',
    accountId: 'acc_002',
    date: '2025-12-04',
    merchant: 'Meralco',
    description: 'Electric Bill Payment',
    amount: -1420,
    category: 'Bills',
    status: 'completed',
    suggestedJar: 'Necessities (55%)',
    autoCategorizationConfidence: 98
  },
  {
    id: 'trx_003',
    bankId: 'gcash',
    bankName: 'GCash',
    accountId: 'acc_004',
    date: '2025-12-04',
    merchant: 'Grab',
    description: 'Grab Ride - Makati to BGC',
    amount: -220,
    category: 'Transport',
    status: 'completed',
    suggestedJar: 'Necessities (55%)',
    autoCategorizationConfidence: 92
  },
  {
    id: 'trx_004',
    bankId: 'bdo',
    bankName: 'BDO',
    accountId: 'acc_002',
    date: '2025-12-03',
    merchant: 'Salary Credit',
    description: 'Monthly Payroll',
    amount: 18000,
    category: 'Income',
    status: 'completed',
    suggestedJar: 'Income Distribution',
    autoCategorizationConfidence: 100
  },
  {
    id: 'trx_005',
    bankId: 'bpi',
    bankName: 'BPI',
    accountId: 'acc_003',
    date: '2025-12-03',
    merchant: 'Netflix',
    description: 'Netflix Subscription',
    amount: -549,
    category: 'Entertainment',
    status: 'completed',
    suggestedJar: 'Play (10%)',
    autoCategorizationConfidence: 96
  },
  {
    id: 'trx_006',
    bankId: 'gcash',
    bankName: 'GCash',
    accountId: 'acc_004',
    date: '2025-12-02',
    merchant: 'SM Supermarket',
    description: 'Grocery Shopping',
    amount: -2150,
    category: 'Food',
    status: 'completed',
    suggestedJar: 'Necessities (55%)',
    autoCategorizationConfidence: 90
  },
  {
    id: 'trx_007',
    bankId: 'maya',
    bankName: 'Maya',
    accountId: 'acc_005',
    date: '2025-12-02',
    merchant: 'Starbucks',
    description: 'Coffee Purchase',
    amount: -195,
    category: 'Food',
    status: 'completed',
    suggestedJar: 'Play (10%)',
    autoCategorizationConfidence: 85
  },
  {
    id: 'trx_008',
    bankId: 'bpi',
    bankName: 'BPI',
    accountId: 'acc_001',
    date: '2025-12-01',
    merchant: 'Shell',
    description: 'Gasoline',
    amount: -1850,
    category: 'Transport',
    status: 'completed',
    suggestedJar: 'Necessities (55%)',
    autoCategorizationConfidence: 88
  },
  {
    id: 'trx_009',
    bankId: 'bdo',
    bankName: 'BDO',
    accountId: 'acc_002',
    date: '2025-12-01',
    merchant: 'National Bookstore',
    description: 'Books and Supplies',
    amount: -750,
    category: 'Education',
    status: 'completed',
    suggestedJar: 'Education (10%)',
    autoCategorizationConfidence: 94
  },
  {
    id: 'trx_010',
    bankId: 'gcash',
    bankName: 'GCash',
    accountId: 'acc_004',
    date: '2025-11-30',
    merchant: 'PhilHealth',
    description: 'Health Insurance Payment',
    amount: -850,
    category: 'Bills',
    status: 'completed',
    suggestedJar: 'Necessities (55%)',
    autoCategorizationConfidence: 97
  }
];

// Auto-categorization rules
export const CATEGORIZATION_RULES = [
  { keywords: ['jollibee', 'mcdo', 'kfc', 'restaurant', 'food'], category: 'Food', jar: 'Necessities (55%)' },
  { keywords: ['meralco', 'maynilad', 'manila water', 'pldt', 'bill'], category: 'Bills', jar: 'Necessities (55%)' },
  { keywords: ['grab', 'uber', 'taxi', 'gasoline', 'shell', 'petron', 'transport'], category: 'Transport', jar: 'Necessities (55%)' },
  { keywords: ['netflix', 'spotify', 'steam', 'game', 'movie', 'entertainment'], category: 'Entertainment', jar: 'Play (10%)' },
  { keywords: ['bookstore', 'school', 'tuition', 'course', 'training'], category: 'Education', jar: 'Education (10%)' },
  { keywords: ['salary', 'payroll', 'income', 'bonus'], category: 'Income', jar: 'Income Distribution' },
  { keywords: ['donation', 'charity', 'church'], category: 'Charity', jar: 'Give (5%)' },
  { keywords: ['investment', 'stocks', 'crypto', 'mutual fund'], category: 'Investment', jar: 'Financial Freedom (10%)' }
];

// Helper function for auto-categorization
export const autoCategorizeTransaction = (merchant: string, description: string, amount: number): { category: string; jar: string; confidence: number } => {
  const searchText = `${merchant} ${description}`.toLowerCase();
  
  // Income detection
  if (amount > 0) {
    return { category: 'Income', jar: 'Income Distribution', confidence: 100 };
  }
  
  // Match against rules
  for (const rule of CATEGORIZATION_RULES) {
    for (const keyword of rule.keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        return { category: rule.category, jar: rule.jar, confidence: 90 + Math.floor(Math.random() * 10) };
      }
    }
  }
  
  // Default categorization
  return { category: 'Other', jar: 'Necessities (55%)', confidence: 50 };
};
