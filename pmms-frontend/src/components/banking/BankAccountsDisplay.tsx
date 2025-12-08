import React, { useState } from 'react';
import { MOCK_BANK_ACCOUNTS, BankAccount } from '../../data/mockBankData.ts';

interface BankAccountsDisplayProps {
  linkedBankIds?: string[];
}

const BankAccountsDisplay: React.FC<BankAccountsDisplayProps> = ({ linkedBankIds = [] }) => {
  const [accounts] = useState<BankAccount[]>(
    MOCK_BANK_ACCOUNTS.filter(acc => linkedBankIds.length === 0 || linkedBankIds.includes(acc.bankId))
  );
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(Math.abs(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-PH', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTotalBalance = () => {
    return accounts.reduce((sum, acc) => {
      // Don't include credit card debt in total
      if (acc.accountType === 'credit') return sum;
      return sum + acc.balance;
    }, 0);
  };

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'savings': return '🏦';
      case 'checking': return '💼';
      case 'credit': return '💳';
      case 'ewallet': return '📱';
      default: return '🏦';
    }
  };

  const getAccountTypeLabel = (type: string) => {
    switch (type) {
      case 'savings': return 'Savings Account';
      case 'checking': return 'Checking Account';
      case 'credit': return 'Credit Card';
      case 'ewallet': return 'E-Wallet';
      default: return 'Account';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="text-sm opacity-90 mb-1">Total Balance</div>
          <div className="text-3xl font-bold">{formatCurrency(getTotalBalance())}</div>
          <div className="text-xs opacity-75 mt-2">Across {accounts.filter(a => a.accountType !== 'credit').length} accounts</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="text-sm opacity-90 mb-1">Linked Accounts</div>
          <div className="text-3xl font-bold">{accounts.length}</div>
          <div className="text-xs opacity-75 mt-2">Active connections</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="text-sm opacity-90 mb-1">Last Synced</div>
          <div className="text-lg font-bold">Just now</div>
          <div className="text-xs opacity-75 mt-2">Auto-sync enabled</div>
        </div>
      </div>

      {/* Accounts List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Your Linked Accounts</h3>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-semibold">
            🔄 Sync All
          </button>
        </div>

        {accounts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-5xl mb-3">🏦</div>
            <p className="text-gray-600">No bank accounts linked yet</p>
            <p className="text-sm text-gray-500 mt-2">Link your first bank account to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                onClick={() => setSelectedAccount(account)}
                className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{getAccountIcon(account.accountType)}</div>
                    <div>
                      <h4 className="font-bold text-gray-800">{account.accountName}</h4>
                      <p className="text-sm text-gray-600">{account.bankName} • {account.accountNumber}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    Active
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">
                      {account.accountType === 'credit' ? 'Outstanding Balance' : 'Available Balance'}
                    </div>
                    <div className={`text-2xl font-bold ${
                      account.accountType === 'credit' 
                        ? 'text-red-600' 
                        : account.balance > 10000 
                          ? 'text-green-600' 
                          : 'text-gray-800'
                    }`}>
                      {account.accountType === 'credit' && '-'}{formatCurrency(account.balance)}
                    </div>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700">
                    →
                  </button>
                </div>

                {account.accountType === 'credit' && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Credit Limit</span>
                      <span className="font-semibold text-gray-800">{formatCurrency(50000)}</span>
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${(Math.abs(account.balance) / 50000) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {((Math.abs(account.balance) / 50000) * 100).toFixed(1)}% utilized
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                  Last synced: {formatDate(account.lastSynced || new Date().toISOString())}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Account Detail Modal */}
      {selectedAccount && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedAccount(null)}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{getAccountIcon(selectedAccount.accountType)}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedAccount.accountName}</h3>
                  <p className="text-sm text-gray-600">{getAccountTypeLabel(selectedAccount.accountType)}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAccount(null)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Balance</div>
                <div className="text-3xl font-bold text-gray-800">
                  {formatCurrency(selectedAccount.balance)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-600 mb-1">Bank</div>
                  <div className="font-semibold text-gray-800">{selectedAccount.bankName}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Account Number</div>
                  <div className="font-semibold text-gray-800">{selectedAccount.accountNumber}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Type</div>
                  <div className="font-semibold text-gray-800">{getAccountTypeLabel(selectedAccount.accountType)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-600 mb-1">Currency</div>
                  <div className="font-semibold text-gray-800">{selectedAccount.currency}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-600 mb-2">Connection Details</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Linked on</span>
                    <span className="font-semibold text-gray-800">
                      {formatDate(selectedAccount.linkedDate || new Date().toISOString())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last synced</span>
                    <span className="font-semibold text-gray-800">
                      {formatDate(selectedAccount.lastSynced || new Date().toISOString())}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700">
                  🔄 Sync Now
                </button>
                <button className="px-6 py-3 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200">
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankAccountsDisplay;

// 🔴 IMPLEMENTATION NOTES:
// - Add real-time balance updates via Brankas webhooks
// - Implement account unlinking functionality
// - Add transaction history per account
// - Store account data in Supabase bank_accounts table
// - Add account refresh/re-authentication flow
