import { useState, useEffect } from 'react';
import { jarService } from '../services';
import { useNotification } from '../contexts/NotificationContext';

export const useJars = () => {
  const [jars, setJars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showError, showSuccess } = useNotification();

  const fetchJars = async () => {
    try {
      setLoading(true);
      const data = await jarService.getJars();
      console.log('🏺 Fetched jars:', data);
      setJars(data);
      setError(null);
    } catch (err) {
      console.error('❌ Jar fetch error:', err);
      setError(err.message);
      showError('Failed to load jars');
    } finally {
      setLoading(false);
    }
  };

  const adjustJar = async (jarId, adjustData) => {
    try {
      const updated = await jarService.adjustJar(jarId, adjustData);
      setJars((prev) =>
        prev.map((jar) => (jar._id === jarId ? updated : jar))
      );
      showSuccess(`Jar ${adjustData.type} successful`);
      return updated;
    } catch (err) {
      showError(err.message);
      throw err;
    }
  };

  const createJar = async (jarData) => {
    try {
      const newJar = await jarService.createJar(jarData);
      setJars((prev) => [...prev, newJar]);
      showSuccess('Jar created successfully');
      return newJar;
    } catch (err) {
      showError(err.message);
      throw err;
    }
  };

  const updateJar = async (jarId, jarData) => {
    try {
      const updated = await jarService.updateJar(jarId, jarData);
      setJars((prev) =>
        prev.map((jar) => (jar._id === jarId ? updated : jar))
      );
      showSuccess('Jar updated successfully');
      return updated;
    } catch (err) {
      showError(err.message);
      throw err;
    }
  };

  const deleteJar = async (jarId) => {
    try {
      await jarService.deleteJar(jarId);
      setJars((prev) => prev.filter((jar) => jar._id !== jarId));
      showSuccess('Jar deleted successfully');
    } catch (err) {
      showError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchJars();
  }, []);

  return {
    jars,
    loading,
    error,
    refetch: fetchJars,
    adjustJar,
    createJar,
    updateJar,
    deleteJar
  };
};
