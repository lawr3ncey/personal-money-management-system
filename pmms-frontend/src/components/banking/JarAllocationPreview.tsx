import React, { useState } from 'react';
import { BankTransaction } from '../../data/mockBankData.ts';

interface JarAllocationPreviewProps {
  transactions: BankTransaction[];
  onConfirmAllocation?: (allocations: any[]) => void;
}

const JarAllocationPreview: React.FC<JarAllocationPreviewProps> = ({ transactions, onConfirmAllocation }) => {
  const [showDetails, setShowDetails] = useState(false);

  // 6 Jars allocation percentages
  const JAR_ALLOCATIONS = {
    'Necessities (55%)': { percentage: 55, color: 'bg-blue-500', icon: '🏠' },
    'Financial Freedom (10%)': { percentage: 10, color: 'bg-green-500', icon: '💰' },
    'Education (10%)': { percentage: 10, color: 'bg-purple-500', icon: '📚' },
    'Long-term Savings (10%)': { percentage: 10, color: 'bg-indigo-500', icon: '🏦' },
    'Play (10%)': { percentage: 10, color: 'bg-pink-500', icon: '🎮' },
    'Give (5%)': { percentage: 5, color: 'bg-yellow-500', icon: '❤️' }
  };

  const calculateJarAllocations = () => {
    const allocations: Record<string, { transactions: BankTransaction[], total: number }> = {};
    
    // Initialize jars
    Object.keys(JAR_ALLOCATIONS).forEach(jar => {
      allocations[jar] = { transactions: [], total: 0 };
    });

    // Group transactions by suggested jar
    transactions.forEach(transaction => {
      const jar = transaction.suggestedJar || 'Necessities (55%)';
      if (allocations[jar]) {
        allocations[jar].transactions.push(transaction);
        allocations[jar].total += Math.abs(transaction.amount);
      }
    });

    return allocations;
  };

  const calculateIncomeDistribution = () => {
    const incomeTransactions = transactions.filter(t => t.amount > 0);
    const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    if (totalIncome === 0) return null;

    const distribution: Record<string, number> = {};
    Object.entries(JAR_ALLOCATIONS).forEach(([jar, config]) => {
      distribution[jar] = (totalIncome * config.percentage) / 100;
    });

    return { totalIncome, distribution };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(Math.abs(amount));
  };

  const allocations = calculateJarAllocations();
  const incomeDistribution = calculateIncomeDistribution();
  const totalExpenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <h3 className="text-2xl font-bold mb-2">🎯 Smart Jar Allocation Preview</h3>
        <p className="opacity-90">
          See how your transactions would be distributed across your 6 jars
        </p>
      </div>

      {/* Income Distribution (if there's income) */}
      {incomeDistribution && (
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">
            💵 Income Distribution: {formatCurrency(incomeDistribution.totalIncome)}
          </h4>
          <div className="space-y-3">
            {Object.entries(incomeDistribution.distribution).map(([jar, amount]) => {
              const config = JAR_ALLOCATIONS[jar as keyof typeof JAR_ALLOCATIONS];
              return (
                <div key={jar} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{config.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-800">{jar}</div>
                      <div className="text-xs text-gray-600">Auto-allocated from income</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">+{formatCurrency(amount)}</div>
                    <div className="text-xs text-gray-500">{config.percentage}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Expense Allocations by Category */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-gray-800">
              💸 Expense Allocation: {formatCurrency(totalExpenses)}
            </h4>
            <p className="text-sm text-gray-600">Based on transaction categories</p>
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-purple-600 hover:text-purple-700 text-sm font-semibold"
          >
            {showDetails ? '▼ Hide' : '▶ Show'} Details
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(allocations).map(([jar, data]) => {
            const config = JAR_ALLOCATIONS[jar as keyof typeof JAR_ALLOCATIONS];
            const expenseCount = data.transactions.filter(t => t.amount < 0).length;
            
            if (expenseCount === 0) return null;

            return (
              <div key={jar} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{config.icon}</span>
                  <div className="font-semibold text-gray-800 text-sm">{jar.split(' (')[0]}</div>
                </div>
                <div className="text-xl font-bold text-red-600">
                  -{formatCurrency(data.total)}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {expenseCount} expense{expenseCount !== 1 ? 's' : ''}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Transaction List */}
        {showDetails && (
          <div className="mt-6 space-y-4">
            {Object.entries(allocations).map(([jar, data]) => {
              const config = JAR_ALLOCATIONS[jar as keyof typeof JAR_ALLOCATIONS];
              if (data.transactions.length === 0) return null;

              return (
                <div key={jar} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{config.icon}</span>
                    <h5 className="font-bold text-gray-800">{jar}</h5>
                    <span className="ml-auto text-sm text-gray-600">
                      {data.transactions.length} transaction{data.transactions.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {data.transactions.map(transaction => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
                      >
                        <div>
                          <div className="font-semibold text-gray-800">{transaction.merchant}</div>
                          <div className="text-xs text-gray-600">{transaction.category}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500">
                            {transaction.autoCategorizationConfidence}% confidence
                          </span>
                          <span className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.amount > 0 ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="text-4xl">📊</div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800 mb-2">Allocation Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-600">Total Transactions</div>
                <div className="font-bold text-gray-800">{transactions.length}</div>
              </div>
              <div>
                <div className="text-gray-600">Income</div>
                <div className="font-bold text-green-600">
                  {incomeDistribution ? formatCurrency(incomeDistribution.totalIncome) : '₱0.00'}
                </div>
              </div>
              <div>
                <div className="text-gray-600">Expenses</div>
                <div className="font-bold text-red-600">{formatCurrency(totalExpenses)}</div>
              </div>
              <div>
                <div className="text-gray-600">Net Flow</div>
                <div className={`font-bold ${
                  (incomeDistribution?.totalIncome || 0) - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatCurrency((incomeDistribution?.totalIncome || 0) - totalExpenses)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-gray-800 mb-1">Ready to Apply?</h4>
            <p className="text-sm text-gray-600">
              This will distribute transactions to your jars automatically
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                alert('💡 This is a preview only. Actual allocation not implemented yet.');
              }}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (onConfirmAllocation) {
                  onConfirmAllocation(Object.entries(allocations).map(([jar, data]) => ({
                    jar,
                    transactions: data.transactions,
                    total: data.total
                  })));
                }
                alert('✅ Allocations confirmed! (Demo mode - not saved)');
              }}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700"
            >
              ✓ Confirm Allocation
            </button>
          </div>
        </div>
      </div>

      {/* Important Note */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-yellow-600 text-xl">⚠️</span>
          <div className="text-sm text-yellow-800">
            <strong>Preview Mode:</strong> These allocations are suggestions only and won't be saved to your actual jars until you connect the backend. The AI categorization is based on simple keyword matching for demo purposes.
          </div>
        </div>
      </div>
    </div>
  );
};

export default JarAllocationPreview;

// 🔴 IMPLEMENTATION NOTES:
// - Add user confirmation before actual allocation
// - Allow manual adjustment of jar assignments
// - Store allocation history in Supabase
// - Add allocation rules customization
// - Implement ML-based categorization improvement over time
// - Add undo/rollback functionality
