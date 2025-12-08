import React, { useState, useEffect } from 'react';
import { MOCK_BANK_TRANSACTIONS, BankTransaction, autoCategorizeTransaction } from '../../data/mockBankData.ts';

interface TransactionSyncProps {
  linkedBankIds?: string[];
  onTransactionImport?: (transactions: BankTransaction[]) => void;
}

const TransactionSync: React.FC<TransactionSyncProps> = ({ linkedBankIds = [], onTransactionImport }) => {
  const [transactions, setTransactions] = useState<BankTransaction[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [selectedBank, setSelectedBank] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  useEffect(() => {
    loadTransactions();
  }, [linkedBankIds]);

  const loadTransactions = () => {
    // 🔴 TODO: Replace with real API call to Brankas/Plaid
    const filtered = linkedBankIds.length === 0 
      ? MOCK_BANK_TRANSACTIONS 
      : MOCK_BANK_TRANSACTIONS.filter(t => linkedBankIds.includes(t.bankId));
    
    setTransactions(filtered);
  };

  const handleSync = () => {
    setIsSyncing(true);
    
    // Simulate API sync
    setTimeout(() => {
      loadTransactions();
      setIsSyncing(false);
      // Show success message
      alert(`✅ Synced ${transactions.length} transactions successfully!`);
    }, 2000);
  };

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
      year: 'numeric'
    });
  };

  const filteredTransactions = transactions
    .filter(t => {
      if (filter === 'income') return t.amount > 0;
      if (filter === 'expense') return t.amount < 0;
      return true;
    })
    .filter(t => selectedBank === 'all' || t.bankId === selectedBank)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return Math.abs(b.amount) - Math.abs(a.amount);
    });

  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const uniqueBanks = Array.from(new Set(transactions.map(t => ({ id: t.bankId, name: t.bankName }))));

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Income': 'bg-green-100 text-green-700',
      'Food': 'bg-orange-100 text-orange-700',
      'Bills': 'bg-blue-100 text-blue-700',
      'Transport': 'bg-purple-100 text-purple-700',
      'Entertainment': 'bg-pink-100 text-pink-700',
      'Education': 'bg-indigo-100 text-indigo-700',
      'Charity': 'bg-yellow-100 text-yellow-700',
      'Investment': 'bg-teal-100 text-teal-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header with Sync Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800">💳 Bank Transactions</h3>
          <p className="text-sm text-gray-600">{filteredTransactions.length} transactions found</p>
        </div>
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 transition"
        >
          {isSyncing ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⚙️</span>
              Syncing...
            </span>
          ) : (
            '🔄 Sync Now'
          )}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 mb-1">Total Income</div>
          <div className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 mb-1">Total Expenses</div>
          <div className="text-2xl font-bold text-red-600">{formatCurrency(totalExpense)}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 mb-1">Net Flow</div>
          <div className={`text-2xl font-bold ${totalIncome - totalExpense >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(totalIncome - totalExpense)}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Transactions</option>
              <option value="income">Income Only</option>
              <option value="expense">Expenses Only</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Bank</label>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Banks</option>
              {uniqueBanks.map((bank) => (
                <option key={bank.id} value={bank.id}>{bank.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="date">Date (Newest First)</option>
              <option value="amount">Amount (Highest First)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-5xl mb-3">💳</div>
            <p className="text-gray-600">No transactions found</p>
            <p className="text-sm text-gray-500 mt-2">Try syncing your bank accounts</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Bank</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Merchant</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Suggested Jar</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Amount</th>
                  <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-800">{transaction.bankName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-800">{transaction.merchant}</div>
                      <div className="text-xs text-gray-500">{transaction.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(transaction.category)}`}>
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-purple-600 font-semibold">
                        {transaction.suggestedJar}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className={`text-sm font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.amount > 0 ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center">
                        <div className={`w-16 h-2 rounded-full ${
                          (transaction.autoCategorizationConfidence || 0) >= 90 ? 'bg-green-500' :
                          (transaction.autoCategorizationConfidence || 0) >= 70 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} />
                        <span className="ml-2 text-xs text-gray-600">{transaction.autoCategorizationConfidence}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Import Actions */}
      {filteredTransactions.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-2xl">💡</span>
              <div>
                <h4 className="font-semibold text-blue-800 mb-1">Ready to Import?</h4>
                <p className="text-sm text-blue-700">
                  These transactions can be automatically added to your jars based on AI categorization
                </p>
              </div>
            </div>
            <button
              onClick={() => onTransactionImport && onTransactionImport(filteredTransactions)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 whitespace-nowrap"
            >
              Import {filteredTransactions.length} Transactions
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionSync;

// 🔴 IMPLEMENTATION NOTES:
// - Replace with real Brankas/Plaid transaction sync API
// - Add date range filtering
// - Implement transaction deduplication logic
// - Store synced transactions in Supabase
// - Add manual transaction editing/recategorization
// - Implement webhooks for real-time transaction updates
