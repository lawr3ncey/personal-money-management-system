import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { TRANSACTION_TYPES } from '../../utils/constants';

const TransactionFilter = ({ jars = [], onFilter }) => {
  const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    jarId: '',
    type: ''
  });

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      startDate: '',
      endDate: '',
      jarId: '',
      type: ''
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          🔍 Filter Transactions
        </h3>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          className="text-gray-600"
        >
          ▼
        </motion.span>
      </button>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="mt-4 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Start Date"
              value={filters.startDate}
              onChange={(e) => handleChange('startDate', e.target.value)}
            />

            <Input
              type="date"
              label="End Date"
              value={filters.endDate}
              onChange={(e) => handleChange('endDate', e.target.value)}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jar
              </label>
              <select
                value={filters.jarId}
                onChange={(e) => handleChange('jarId', e.target.value)}
                className="input-field"
              >
                <option value="">All Jars</option>
                {jars.map((jar) => (
                  <option key={jar._id} value={jar._id}>
                    {jar.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleChange('type', e.target.value)}
                className="input-field"
              >
                <option value="">All Types</option>
                {Object.entries(TRANSACTION_TYPES).map(([key, value]) => (
                  <option key={value} value={value}>
                    {key.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleApply} variant="primary">
              Apply Filters
            </Button>
            <Button onClick={handleReset} variant="ghost">
              Reset
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TransactionFilter;
