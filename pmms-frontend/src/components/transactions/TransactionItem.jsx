import React from 'react';
import { formatCurrency, formatDateTime, truncateText } from '../../utils/formatters';
import { TRANSACTION_TYPES } from '../../utils/constants';

const TransactionItem = ({ transaction, jar }) => {
  const isIncome = 
    transaction.type === TRANSACTION_TYPES.INCOME || 
    transaction.type === TRANSACTION_TYPES.TRANSFER_IN ||
    transaction.type === TRANSACTION_TYPES.GOAL_CONTRIBUTION_RETURN;

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-0">
      {/* Icon */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xl ${
        isIncome ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
      }`}>
        {isIncome ? '↑' : '↓'}
      </div>

      {/* Transaction Details */}
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-semibold text-gray-800">
            {formatCurrency(transaction.amount)}
          </p>
          {jar && (
            <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs rounded-full">
              {jar.name}
            </span>
          )}
        </div>
        
        <p className="text-sm text-gray-600">
          {truncateText(transaction.reason || transaction.type.replace(/_/g, ' '), 50)}
        </p>
        
        <p className="text-xs text-gray-400 mt-1">
          {formatDateTime(transaction.date)}
        </p>
      </div>

      {/* Amount with sign */}
      <div className={`text-right font-bold ${
        isIncome ? 'text-green-600' : 'text-red-600'
      }`}>
        {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
      </div>
    </div>
  );
};

export default TransactionItem;
