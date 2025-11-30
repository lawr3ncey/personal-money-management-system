import { useState, useEffect } from 'react';
import { transactionService } from '../services';
import { useNotification } from '../contexts/NotificationContext';
import { PAGINATION_LIMIT } from '../utils/constants';

export const useTransactions = (filters = {}) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { showError } = useNotification();

  const fetchTransactions = async (pageNum = 1, resetData = false) => {
    try {
      setLoading(true);
      const data = await transactionService.getTransactions({
        page: pageNum,
        limit: PAGINATION_LIMIT,
        ...filters
      });
      console.log('📝 Fetched transactions:', data);

      if (resetData || pageNum === 1) {
        setTransactions(data);
      } else {
        setTransactions((prev) => [...prev, ...data]);
      }

      setHasMore(data.length === PAGINATION_LIMIT);
      setError(null);
    } catch (err) {
      console.error('❌ Transaction fetch error:', err);
      setError(err.message);
      showError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTransactions(nextPage, false);
  };

  useEffect(() => {
    setPage(1);
    fetchTransactions(1, true);
  }, [JSON.stringify(filters)]);

  return {
    transactions,
    loading,
    error,
    hasMore,
    loadMore,
    refetch: () => fetchTransactions(1, true)
  };
};
