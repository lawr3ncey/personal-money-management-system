import React, { useState } from 'react';
import { useJars } from '../hooks/useJars';
import { useTransactions } from '../hooks/useTransactions';
import TransactionList from '../components/transactions/TransactionList';
import TransactionFilter from '../components/transactions/TransactionFilter';

const TransactionsPage = () => {
  const { jars } = useJars();
  const [filters, setFilters] = useState({});
  const { transactions, loading, hasMore, loadMore } = useTransactions(filters);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>

      <TransactionFilter jars={jars} onFilter={handleFilter} />

      <TransactionList
        transactions={transactions}
        jars={jars}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />
    </div>
  );
};

export default TransactionsPage;
