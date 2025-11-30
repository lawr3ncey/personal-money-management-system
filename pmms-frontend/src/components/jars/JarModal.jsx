import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { formatCurrency, getJarImagePath } from '../../utils/formatters';

const JarModal = ({ 
  isOpen, 
  onClose, 
  jar, 
  onAdjust,
  loading = false
}) => {
  const [mode, setMode] = useState(''); // '', 'add', 'subtract', 'edit'
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleReset = () => {
    setMode('');
    setAmount('');
    setReason('');
  };

  const handleSubmit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    await onAdjust({
      type: mode,
      amount: parseFloat(amount),
      reason
    });

    handleReset();
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  if (!jar) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      title={jar.name}
      size="md"
    >
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
              placeholder={`Enter amount to ${mode}`}
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
    </Modal>
  );
};

export default JarModal;
