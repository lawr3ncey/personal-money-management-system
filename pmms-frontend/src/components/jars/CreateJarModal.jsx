import React, { useState } from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';

const CreateJarModal = ({ isOpen, onClose, onCreateJar, existingJars = [] }) => {
  const [formData, setFormData] = useState({
    name: '',
    percentage: 10,
    color: '#3b82f6',
    icon: 'jar'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const colors = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#9333ea' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Green', value: '#22c55e' },
    { name: 'Teal', value: '#14b8a6' }
  ];

  const icons = [
    'jar',
    'necessities',
    'education',
    'play',
    'savings',
    'give',
    'investments'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'percentage' ? parseFloat(value) : value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Jar name is required');
      return false;
    }

    if (formData.percentage <= 0 || formData.percentage > 100) {
      setError('Percentage must be between 1 and 100');
      return false;
    }

    // Calculate total percentage
    const totalPercentage = existingJars.reduce((sum, jar) => sum + jar.percentage, 0);
    if (totalPercentage + formData.percentage > 100) {
      setError(`Total percentage cannot exceed 100%. Available: ${100 - totalPercentage}%`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError('');
      
      await onCreateJar({
        ...formData,
        isCustom: true,
        isDefault: false
      });

      // Reset form
      setFormData({
        name: '',
        percentage: 10,
        color: '#3b82f6',
        icon: 'jar'
      });
      
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create jar');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      percentage: 10,
      color: '#3b82f6',
      icon: 'jar'
    });
    setError('');
    onClose();
  };

  const totalPercentage = existingJars.reduce((sum, jar) => sum + jar.percentage, 0);
  const availablePercentage = 100 - totalPercentage;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Custom Jar"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Available Percentage Info */}
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
          Available percentage: <strong>{availablePercentage}%</strong>
        </div>

        {/* Jar Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jar Name *
          </label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Emergency Fund, Vacation, Car"
            required
          />
        </div>

        {/* Percentage Slider */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Percentage: {formData.percentage}%
          </label>
          <input
            type="range"
            name="percentage"
            min="1"
            max={Math.min(100, availablePercentage)}
            value={formData.percentage}
            onChange={handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1%</span>
            <span>{availablePercentage}%</span>
          </div>
        </div>

        {/* Color Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Color
          </label>
          <div className="grid grid-cols-4 gap-3">
            {colors.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                className={`h-12 rounded-lg transition-all ${
                  formData.color === color.value
                    ? 'ring-4 ring-offset-2 ring-blue-500 scale-110'
                    : 'hover:scale-105'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Icon Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Icon
          </label>
          <div className="grid grid-cols-4 gap-3">
            {icons.map((iconName) => (
              <button
                key={iconName}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, icon: iconName }))}
                className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                  formData.icon === iconName
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <img
                  src={`/images/${iconName}.png`}
                  alt={iconName}
                  className="w-full h-16 object-contain"
                  onError={(e) => {
                    e.target.src = '/images/jar.png';
                  }}
                />
                <p className="text-xs text-center mt-2 capitalize">{iconName}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            onClick={handleClose}
            variant="ghost"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
          >
            Create Jar
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateJarModal;
