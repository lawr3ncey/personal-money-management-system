import React, { useState } from 'react';
import { MOCK_BANK_PROVIDERS, BankProvider } from '../../data/mockBankData.ts';

interface BankLinkingProps {
  onLinkSuccess: (bankId: string, mockToken: string) => void;
}

const BankLinking: React.FC<BankLinkingProps> = ({ onLinkSuccess }) => {
  const [selectedBank, setSelectedBank] = useState<BankProvider | null>(null);
  const [isLinking, setIsLinking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mockCredentials, setMockCredentials] = useState({ username: '', password: '' });

  const handleBankSelect = (bank: BankProvider) => {
    if (!bank.supported) {
      alert('This bank is not yet supported. Coming soon!');
      return;
    }
    setSelectedBank(bank);
  };

  const handleLinkBank = () => {
    if (!mockCredentials.username || !mockCredentials.password) {
      alert('Please enter demo credentials');
      return;
    }

    setIsLinking(true);

    // Simulate API call delay
    setTimeout(() => {
      const mockToken = `mock_token_${selectedBank?.id}_${Date.now()}`;
      setIsLinking(false);
      setShowSuccess(true);

      // 🔴 TODO: Replace with real Brankas/Plaid API call
      // const response = await brankasAPI.linkBank(bankId, credentials);

      setTimeout(() => {
        if (selectedBank) {
          onLinkSuccess(selectedBank.id, mockToken);
        }
        setShowSuccess(false);
        setSelectedBank(null);
        setMockCredentials({ username: '', password: '' });
      }, 2000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">🏦 Link Your Bank Account</h2>
        <p className="opacity-90">
          Connect your bank securely to automatically sync transactions
        </p>
        <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-yellow-300">⚠️</span>
            <span>
              <strong>DEMO MODE:</strong> This is using dummy data. No real banking credentials required.
            </span>
          </div>
        </div>
      </div>

      {/* Bank Selection Grid */}
      {!selectedBank && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Select Your Bank
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {MOCK_BANK_PROVIDERS.map((bank) => (
              <button
                key={bank.id}
                onClick={() => handleBankSelect(bank)}
                disabled={!bank.supported}
                className={`p-6 rounded-lg border-2 transition hover:scale-105 ${
                  bank.supported
                    ? 'bg-white border-gray-200 hover:border-purple-500 cursor-pointer'
                    : 'bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="text-center">
                  <div className="text-5xl mb-3">{bank.logo}</div>
                  <h4 className="font-bold text-gray-800 mb-1">{bank.name}</h4>
                  {!bank.supported && (
                    <span className="text-xs text-gray-500">Coming Soon</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bank Login Form */}
      {selectedBank && !showSuccess && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedBank.logo}</span>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{selectedBank.name}</h3>
                <p className="text-sm text-gray-600">Mock Login - Demo Only</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedBank(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username / Email
              </label>
              <input
                type="text"
                value={mockCredentials.username}
                onChange={(e) => setMockCredentials({ ...mockCredentials, username: e.target.value })}
                placeholder="demo@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={mockCredentials.password}
                onChange={(e) => setMockCredentials({ ...mockCredentials, password: e.target.value })}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-blue-600">ℹ️</span>
                <div className="text-sm text-blue-800">
                  <strong>Demo Credentials:</strong> Use any username and password.
                  This won't connect to real banking systems.
                </div>
              </div>
            </div>

            <button
              onClick={handleLinkBank}
              disabled={isLinking}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isLinking ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⚙️</span>
                  Linking Account...
                </span>
              ) : (
                'Link Bank Account'
              )}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>🔒</span>
              <span>Your data is encrypted and secure (Demo mode - no real data transmitted)</span>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-2xl font-bold text-green-600 mb-2">
            Successfully Linked!
          </h3>
          <p className="text-gray-600 mb-4">
            Your {selectedBank?.name} account has been connected
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
            <div className="text-sm text-green-800">
              Mock Token: <code className="font-mono">mock_token_{selectedBank?.id}_***</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankLinking;

// 🔴 IMPLEMENTATION NOTES:
// - Replace mock login with real Brankas/Plaid OAuth flow
// - Add proper error handling for failed connections
// - Store tokens securely in Supabase (encrypted)
// - Implement token refresh mechanism
// - Add multi-factor authentication support
