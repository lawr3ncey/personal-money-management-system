import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNotification } from '../contexts/NotificationContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Spinner from '../components/ui/Spinner';
import { formatCurrency, formatDate } from '../utils/formatters';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/v1';

const RecurringPage = () => {
  const [recurringItems, setRecurringItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { showSuccess, showError } = useNotification();

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    type: 'income',
    frequency: 'monthly',
    startDate: new Date().toISOString().split('T')[0],
    description: ''
  });

  useEffect(() => {
    fetchRecurringItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRecurringItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/recurring`);
      const data = response.data.data?.items || response.data.data?.recurringItems || response.data.items || [];
      setRecurringItems(data);
    } catch (error) {
      showError('Failed to load recurring items');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecurring = async (e) => {
    e.preventDefault();
    
    try {
      const recurringData = {
        name: formData.name,
        amount: parseFloat(formData.amount),
        type: formData.type,
        frequency: formData.frequency,
        startDate: formData.startDate,
        description: formData.description || undefined
      };

      await axios.post(`${API_BASE_URL}/recurring`, recurringData);
      showSuccess('Recurring item created successfully!');
      setShowCreateModal(false);
      setFormData({
        name: '',
        amount: '',
        type: 'income',
        frequency: 'monthly',
        startDate: new Date().toISOString().split('T')[0],
        description: ''
      });
      fetchRecurringItems();
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to create recurring item');
    }
  };

  const handleToggle = async (itemId, currentStatus) => {
    try {
      await axios.patch(`${API_BASE_URL}/recurring/${itemId}/toggle`);
      showSuccess(`Recurring item ${currentStatus ? 'deactivated' : 'activated'}`);
      fetchRecurringItems();
    } catch (error) {
      showError('Failed to toggle recurring item');
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this recurring item?')) return;
    
    try {
      await axios.delete(`${API_BASE_URL}/recurring/${itemId}`);
      showSuccess('Recurring item deleted successfully');
      fetchRecurringItems();
    } catch (error) {
      showError('Failed to delete recurring item');
    }
  };

  const getFrequencyLabel = (frequency) => {
    return {
      daily: 'Daily',
      weekly: 'Weekly',
      biweekly: 'Every 15 Days',
      monthly: 'Monthly',
      yearly: 'Yearly'
    }[frequency] || frequency;
  };

  const getTypeColor = (type) => {
    return type === 'income' ? 'text-green-600' : 'text-red-600';
  };

  const getTypeBadgeColor = (type) => {
    return type === 'income' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Recurring Items</h1>
        <Button variant="primary" onClick={() => setShowCreateModal(true)}>
          + Add Recurring Item
        </Button>
      </div>

      {/* Info Card */}
      <Card className="bg-blue-50 border-blue-200">
        <p className="text-blue-800">
          ℹ️ Recurring items are automatically processed every hour. Set up your regular income and bills here.
        </p>
      </Card>

      {/* Recurring Items List */}
      {recurringItems.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">
              🔄 No recurring items yet
            </p>
            <p className="text-gray-500 mb-6">
              Add recurring income or expenses to automate your money management
            </p>
            <Button variant="primary" onClick={() => setShowCreateModal(true)}>
              Add Your First Recurring Item
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recurringItems.map((item) => (
            <Card key={item._id} className={!item.isActive ? 'opacity-60' : ''}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeBadgeColor(item.type)}`}>
                      {item.type}
                    </span>
                    {!item.isActive && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        Inactive
                      </span>
                    )}
                  </div>
                  
                  <p className={`text-2xl font-bold ${getTypeColor(item.type)}`}>
                    {item.type === 'income' ? '+' : '-'}{formatCurrency(item.amount)}
                  </p>
                </div>
              </div>

              {item.description && (
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
              )}

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Frequency:</span>
                  <span>{getFrequencyLabel(item.frequency)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Next execution:</span>
                  <span>{formatDate(item.nextExecutionDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Started:</span>
                  <span>{formatDate(item.startDate)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant={item.isActive ? 'secondary' : 'success'}
                  size="sm"
                  onClick={() => handleToggle(item._id, item.isActive)}
                  className="flex-1"
                >
                  {item.isActive ? 'Deactivate' : 'Activate'}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setFormData({
            name: '',
            amount: '',
            type: 'income',
            frequency: 'monthly',
            startDate: new Date().toISOString().split('T')[0],
            description: ''
          });
        }}
        title="Add Recurring Item"
        size="md"
      >
        <form onSubmit={handleCreateRecurring} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Monthly Salary, Rent, Netflix"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount *
            </label>
            <Input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="e.g., 5000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type *
            </label>
            <select
              className="input-field"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frequency *
            </label>
            <select
              className="input-field"
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              required
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Every 15 Days</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date *
            </label>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              className="input-field min-h-[80px]"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add a note about this recurring item"
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" variant="primary">
              Add Recurring Item
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setShowCreateModal(false);
                setFormData({
                  name: '',
                  amount: '',
                  type: 'income',
                  frequency: 'monthly',
                  startDate: new Date().toISOString().split('T')[0],
                  description: ''
                });
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RecurringPage;
