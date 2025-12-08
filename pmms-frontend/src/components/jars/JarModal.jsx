import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { formatCurrency, getJarImagePath, formatDate } from '../../utils/formatters';
import { transactionService } from '../../services';
import Spinner from '../ui/Spinner';

const JarModal = ({ 
  isOpen, 
  onClose, 
  jar, 
  onAdjust,
  loading = false
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [mode, setMode] = useState(''); // '', 'add', 'subtract', 'edit'
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  const fetchTransactions = async () => {
    if (!jar?._id) return;
    
    try {
      setLoadingTransactions(true);
      const data = await transactionService.getJarTransactions(jar._id);
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch jar transactions:', error);
    } finally {
      setLoadingTransactions(false);
    }
  };

  // Fetch transactions when history tab is active
  useEffect(() => {
    if (activeTab === 'history' && jar && isOpen) {
      fetchTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, jar, isOpen]);

  const handleReset = () => {
    setMode('');
    setAmount('');
    setReason('');
  };

  const handleSubmit = async () => {
    const amountValue = parseFloat(amount);
    
    // For edit mode, allow 0 or positive; for add/subtract, must be greater than 0
    if (mode === 'edit') {
      if (amount === '' || amountValue < 0 || isNaN(amountValue)) {
        alert('Please enter a valid amount (0 or greater)');
        return;
      }
    } else {
      if (!amount || amountValue <= 0) {
        alert('Please enter a valid amount greater than 0');
        return;
      }
    }

    await onAdjust({
      type: mode,
      amount: amountValue,
      reason
    });

    handleReset();
    
    // Refetch transactions after adjustment
    if (activeTab === 'history') {
      fetchTransactions();
    }
  };

  const handleClose = () => {
    handleReset();
    setActiveTab('overview');
    onClose();
  };

  if (!jar) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      title={jar.name}
      size="lg"
    >
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'overview'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === 'history'
              ? 'border-b-2 border-blue-500 text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Transaction History
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="text-center">
        {/* Jar Image */}
        <div className="mb-6">
          <img
            src={getJarImagePath(jar.name)}
            alt={jar.name}
            className="w-48 h-48 mx-auto object-contain drop-shadow-2xl"
            onError={(e) => {
              e.target.src = '/images/jar.png';
            }}
          />
        </div>

        {/* Current Balance */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {formatCurrency(jar.amount)}
        </h2>
        <p className="text-gray-600 mb-6">Current Balance</p>

        {/* Action Buttons */}
        {mode === '' && (
          <div className="flex justify-center gap-3 mt-6">
            <Button onClick={() => setMode('add')} variant="success">
              + Add Money
            </Button>
            <Button onClick={() => setMode('subtract')} variant="danger">
              - Subtract
            </Button>
            <Button onClick={() => setMode('edit')} variant="secondary">
              ✏️ Edit Amount
            </Button>
          </div>
        )}

        {/* Input Form */}
        {mode !== '' && (
          <div className="mt-6 space-y-4">
            <Input
              type="number"
              step="0.01"
              min={mode === 'edit' ? '0' : '0.01'}
              placeholder={`Enter amount to ${mode === 'edit' ? 'set' : mode}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <textarea
              className="input-field min-h-[100px]"
              placeholder="Reason (optional)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />

            <div className="flex justify-center gap-3">
              <Button 
                onClick={handleSubmit} 
                variant="primary"
                loading={loading}
              >
                ✅ Save
              </Button>
              <Button onClick={handleReset} variant="ghost">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {loadingTransactions ? (
            <div className="flex justify-center py-12">
              <Spinner />
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">📭 No transactions yet</p>
              <p className="text-sm">Start by adding or subtracting money from this jar</p>
            </div>
          ) : (
            <div className="max-h-[500px] overflow-y-auto space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="glass-card p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-lg font-semibold ${
                          transaction.type === 'add' || transaction.type === 'income'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}>
                          {transaction.type === 'add' || transaction.type === 'income' ? '+' : '-'}
                          {formatCurrency(Math.abs(transaction.amount))}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                          {transaction.type}
                        </span>
                      </div>
                      {transaction.reason && (
                        <p className="text-sm text-gray-600 mb-1">
                          {transaction.reason}
                        </p>
                      )}
                      {transaction.category && (
                        <span className="text-xs text-gray-500">
                          Category: {transaction.category}
                        </span>
                      )}
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <div>{formatDate(transaction.date)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default JarModal;
