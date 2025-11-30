import React from 'react';
import TransactionItem from './TransactionItem';
import Spinner from '../ui/Spinner';
import EmptyState from '../ui/EmptyState';
import Button from '../ui/Button';

const TransactionList = ({ 
  transactions, 
  jars = [],
  loading, 
  hasMore, 
  onLoadMore 
}) => {
  if (loading && (!transactions || transactions.length === 0)) {
    return <Spinner size="lg" className="my-12" />;
  }

  if (!transactions || transactions.length === 0) {
    return (
      <EmptyState
        icon="📝"
        title="No Transactions"
        description="Your transactions will appear here"
      />
    );
  }

  // Map jar IDs to jar objects for quick lookup
  const jarMap = jars.reduce((acc, jar) => {
    acc[jar._id] = jar;
    return acc;
  }, {});

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction._id}
            transaction={transaction}
            jar={jarMap[transaction.jarId]}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button 
            onClick={onLoadMore} 
            variant="outline" 
            loading={loading}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
