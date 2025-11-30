import { useState, useEffect } from 'react';
import { analyticsService } from '../services';
import { useNotification } from '../contexts/NotificationContext';

export const useAnalytics = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showError } = useNotification();

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const data = await analyticsService.getOverview();
      setOverview(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      showError('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const getJarTrend = async (jarId, months = 6) => {
    try {
      return await analyticsService.getJarTrend(jarId, months);
    } catch (err) {
      showError('Failed to load jar trend');
      throw err;
    }
  };

  const getSpendingBreakdown = async (startDate, endDate) => {
    try {
      return await analyticsService.getSpendingBreakdown(startDate, endDate);
    } catch (err) {
      showError('Failed to load spending breakdown');
      throw err;
    }
  };

  const getMonthlyComparison = async () => {
    try {
      return await analyticsService.getMonthlyComparison();
    } catch (err) {
      showError('Failed to load monthly comparison');
      throw err;
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  return {
    overview,
    loading,
    error,
    refetch: fetchOverview,
    getJarTrend,
    getSpendingBreakdown,
    getMonthlyComparison
  };
};
