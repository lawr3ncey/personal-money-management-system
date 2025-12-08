import React from 'react';
import { MOCK_BANK_ACCOUNTS } from '../../data/mockBankData.ts';

interface BankOverviewWidgetProps {
  onViewDetails?: () => void;
}

const BankOverviewWidget: React.FC<BankOverviewWidgetProps> = ({ onViewDetails }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(Math.abs(amount));
  };

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
    return date.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' });
  };

  const linkedAccounts = MOCK_BANK_ACCOUNTS.filter(acc => acc.isLinked);
  
  const totalBalance = linkedAccounts
    .filter(acc => acc.accountType !== 'credit')
    .reduce((sum, acc) => sum + acc.balance, 0);

  const creditCardDebt = linkedAccounts
    .filter(acc => acc.accountType === 'credit')
    .reduce((sum, acc) => sum + Math.abs(acc.balance), 0);

  const lastSyncTime = linkedAccounts.length > 0 
    ? linkedAccounts[0].lastSynced || new Date().toISOString()
    : new Date().toISOString();

  const accountsByType = {
    banks: linkedAccounts.filter(acc => ['savings', 'checking'].includes(acc.accountType)).length,
    ewallets: linkedAccounts.filter(acc => acc.accountType === 'ewallet').length,
    credit: linkedAccounts.filter(acc => acc.accountType === 'credit').length
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏦</span>
            <div>
              <h3 className="text-xl font-bold">Bank Accounts</h3>
              <p className="text-sm opacity-90">Connected financial accounts</p>
            </div>
          </div>
          {linkedAccounts.length > 0 && (
            <button
              onClick={onViewDetails}
              className="text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              View All →
            </button>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <div className="text-xs opacity-75 mb-1">Total Balance</div>
            <div className="text-lg font-bold">{formatCurrency(totalBalance)}</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <div className="text-xs opacity-75 mb-1">Linked Accounts</div>
            <div className="text-lg font-bold">{linkedAccounts.length}</div>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <div className="text-xs opacity-75 mb-1">Last Synced</div>
            <div className="text-lg font-bold">{formatTimestamp(lastSyncTime)}</div>
          </div>
        </div>
      </div>

      {/* Account List */}
      <div className="p-6">
        {linkedAccounts.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-3">💳</div>
            <p className="text-gray-600 font-semibold mb-2">No Banks Linked</p>
            <p className="text-sm text-gray-500 mb-4">
              Connect your bank accounts to track all finances in one place
            </p>
            <button
              onClick={onViewDetails}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              + Link Bank Account
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-4">
              {linkedAccounts.slice(0, 3).map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                  onClick={onViewDetails}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {account.accountType === 'savings' && '🏦'}
                      {account.accountType === 'checking' && '💼'}
                      {account.accountType === 'credit' && '💳'}
                      {account.accountType === 'ewallet' && '📱'}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">
                        {account.accountName}
                      </div>
                      <div className="text-xs text-gray-600">
                        {account.bankName} • {account.accountNumber}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold text-sm ${
                      account.accountType === 'credit' 
                        ? 'text-red-600' 
                        : account.balance > 10000 
                          ? 'text-green-600' 
                          : 'text-gray-800'
                    }`}>
                      {account.accountType === 'credit' && '-'}
                      {formatCurrency(account.balance)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {linkedAccounts.length > 3 && (
              <button
                onClick={onViewDetails}
                className="w-full text-center text-purple-600 hover:text-purple-700 text-sm font-semibold py-2"
              >
                View {linkedAccounts.length - 3} more account{linkedAccounts.length - 3 !== 1 ? 's' : ''} →
              </button>
            )}

            {/* Account Type Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl mb-1">🏦</div>
                  <div className="text-xs text-gray-600">Banks</div>
                  <div className="font-bold text-gray-800">{accountsByType.banks}</div>
                </div>
                <div>
                  <div className="text-2xl mb-1">📱</div>
                  <div className="text-xs text-gray-600">E-Wallets</div>
                  <div className="font-bold text-gray-800">{accountsByType.ewallets}</div>
                </div>
                <div>
                  <div className="text-2xl mb-1">💳</div>
                  <div className="text-xs text-gray-600">Credit Cards</div>
                  <div className="font-bold text-gray-800">{accountsByType.credit}</div>
                </div>
              </div>
            </div>

            {/* Credit Card Warning */}
            {creditCardDebt > 0 && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <span className="text-red-600">⚠️</span>
                  <div className="text-sm">
                    <span className="font-semibold text-red-800">Credit Card Debt:</span>
                    <span className="text-red-600 ml-2 font-bold">
                      {formatCurrency(creditCardDebt)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Sync Status */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>Auto-sync enabled • Last sync: {formatTimestamp(lastSyncTime)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BankOverviewWidget;

// 🔴 IMPLEMENTATION NOTES:
// - Add real-time balance updates
// - Implement manual sync button
// - Add account health indicators (low balance warnings)
// - Show recent transactions preview
// - Add spending insights from bank data
// - Integrate with jar system for allocation suggestions
