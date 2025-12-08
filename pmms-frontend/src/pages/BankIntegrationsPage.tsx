import React, { useState } from 'react';
import BankLinking from '../components/banking/BankLinking.tsx';
import BankAccountsDisplay from '../components/banking/BankAccountsDisplay.tsx';
import TransactionSync from '../components/banking/TransactionSync.tsx';
import JarAllocationPreview from '../components/banking/JarAllocationPreview.tsx';
import { BankTransaction } from '../data/mockBankData.ts';

const BankIntegrationsPage: React.FC = () => {
  const [linkedBankIds, setLinkedBankIds] = useState<string[]>(['bpi', 'bdo', 'gcash', 'maya']);
  const [activeTab, setActiveTab] = useState<'accounts' | 'link' | 'transactions' | 'allocations'>('accounts');
  const [selectedTransactions, setSelectedTransactions] = useState<BankTransaction[]>([]);

  const handleLinkSuccess = (bankId: string, token: string) => {
    if (!linkedBankIds.includes(bankId)) {
      setLinkedBankIds([...linkedBankIds, bankId]);
    }
    setActiveTab('accounts');
  };

  const handleTransactionImport = (transactions: BankTransaction[]) => {
    setSelectedTransactions(transactions);
    setActiveTab('allocations');
  };

  const tabs = [
    { id: 'accounts' as const, label: 'My Accounts', icon: '🏦' },
    { id: 'transactions' as const, label: 'Transactions', icon: '💳' },
    { id: 'allocations' as const, label: 'Smart Allocation', icon: '🎯' },
    { id: 'link' as const, label: 'Link New Bank', icon: '➕' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">🏦 Bank Integrations</h1>
            <p className="text-lg opacity-90">
              Connect your banks and e-wallets for automatic transaction syncing
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-75 mb-1">Connected Accounts</div>
            <div className="text-4xl font-bold">{linkedBankIds.length}</div>
          </div>
        </div>

        {/* Demo Warning */}
        <div className="mt-6 bg-yellow-500 bg-opacity-20 border border-yellow-300 border-opacity-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="font-bold mb-1">Demo Mode Active</h3>
              <p className="text-sm opacity-90">
                This is using dummy data for demonstration. Real bank integration via Brankas/Plaid will be implemented later. No actual banking credentials are required or stored.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow p-2">
        <div className="flex gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div>
        {activeTab === 'accounts' && (
          <BankAccountsDisplay linkedBankIds={linkedBankIds} />
        )}

        {activeTab === 'link' && (
          <BankLinking onLinkSuccess={handleLinkSuccess} />
        )}

        {activeTab === 'transactions' && (
          <TransactionSync 
            linkedBankIds={linkedBankIds}
            onTransactionImport={handleTransactionImport}
          />
        )}

        {activeTab === 'allocations' && (
          <>
            {selectedTransactions.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  No Transactions Selected
                </h3>
                <p className="text-gray-600 mb-6">
                  Go to the Transactions tab and import transactions to see smart jar allocation
                </p>
                <button
                  onClick={() => setActiveTab('transactions')}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
                >
                  View Transactions
                </button>
              </div>
            ) : (
              <JarAllocationPreview 
                transactions={selectedTransactions}
                onConfirmAllocation={(allocations) => {
                  console.log('Allocations confirmed:', allocations);
                  // 🔴 TODO: Save allocations to Supabase
                }}
              />
            )}
          </>
        )}
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <div className="text-4xl mb-3">🔒</div>
          <h3 className="font-bold text-gray-800 mb-2">Bank-Level Security</h3>
          <p className="text-sm text-gray-700">
            All connections are encrypted with 256-bit SSL. We never store your banking passwords.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
          <div className="text-4xl mb-3">🤖</div>
          <h3 className="font-bold text-gray-800 mb-2">AI-Powered Categorization</h3>
          <p className="text-sm text-gray-700">
            Automatically categorize transactions and suggest jar allocations with 90%+ accuracy.
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
          <div className="text-4xl mb-3">⚡</div>
          <h3 className="font-bold text-gray-800 mb-2">Real-Time Sync</h3>
          <p className="text-sm text-gray-700">
            Transactions are synced automatically every hour. Manual sync available anytime.
          </p>
        </div>
      </div>

      {/* Supported Banks Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          🏦 Supported Financial Institutions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: 'BPI', status: 'active' },
            { name: 'BDO', status: 'active' },
            { name: 'GCash', status: 'active' },
            { name: 'Maya', status: 'active' },
            { name: 'Metrobank', status: 'active' },
            { name: 'UnionBank', status: 'coming' },
            { name: 'Security Bank', status: 'coming' },
            { name: 'Landbank', status: 'coming' },
            { name: 'PNB', status: 'coming' },
            { name: 'Chinabank', status: 'coming' }
          ].map(bank => (
            <div
              key={bank.name}
              className={`p-4 rounded-lg border-2 text-center ${
                bank.status === 'active'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="font-semibold text-gray-800 mb-1">{bank.name}</div>
              <div className={`text-xs font-semibold ${
                bank.status === 'active' ? 'text-green-600' : 'text-gray-500'
              }`}>
                {bank.status === 'active' ? '✓ Active' : 'Coming Soon'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="text-4xl">💡</div>
          <div>
            <h3 className="font-bold text-blue-800 mb-2">Need Help?</h3>
            <div className="space-y-2 text-sm text-blue-700">
              <p>
                <strong>Q: Is it safe to link my bank account?</strong><br />
                A: Yes! We use Brankas/Plaid, trusted by millions. We never see or store your passwords.
              </p>
              <p>
                <strong>Q: How often do transactions sync?</strong><br />
                A: Automatically every hour, or you can manually sync anytime.
              </p>
              <p>
                <strong>Q: Can I unlink a bank account?</strong><br />
                A: Yes, you can unlink any account from the account details page.
              </p>
              <p>
                <strong>Q: What if a transaction is miscategorized?</strong><br />
                A: You can manually edit any transaction category, and the AI learns from your corrections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankIntegrationsPage;

// 🔴 IMPLEMENTATION NOTES:
// - Replace all mock data with real Brankas/Plaid API integration
// - Implement secure token storage in Supabase (encrypted)
// - Add webhook handlers for real-time transaction notifications
// - Implement transaction deduplication logic
// - Add multi-currency support
// - Create admin dashboard for monitoring bank connections
// - Add error handling for failed syncs and expired tokens
// - Implement rate limiting to comply with API quotas
