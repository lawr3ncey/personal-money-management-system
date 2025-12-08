import React, { useState } from 'react';
import { useJars } from '../hooks/useJars';
import JarGrid from '../components/jars/JarGrid';
import JarModal from '../components/jars/JarModal';
import CreateJarModal from '../components/jars/CreateJarModal';
import Button from '../components/ui/Button';
import { useNotification } from '../contexts/NotificationContext';

const JarsPage = () => {
  const { jars, loading, adjustJar, createJar, refetch } = useJars();
  const { showSuccess, showError } = useNotification();
  const [selectedJar, setSelectedJar] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [adjusting, setAdjusting] = useState(false);

  const handleJarClick = (jar) => {
    setSelectedJar(jar);
    setModalOpen(true);
  };

  const handleAdjust = async (adjustData) => {
    try {
      setAdjusting(true);
      await adjustJar(selectedJar._id, adjustData);
      showSuccess(`${adjustData.type === 'add' ? 'Added to' : 'Subtracted from'} ${selectedJar.name}`);
      setModalOpen(false);
      setSelectedJar(null);
    } catch (error) {
      showError('Failed to adjust jar');
    } finally {
      setAdjusting(false);
    }
  };

  const handleCreateJar = async (jarData) => {
    try {
      await createJar(jarData);
      showSuccess('Custom jar created successfully!');
      refetch();
      setCreateModalOpen(false);
    } catch (error) {
      showError(error.message || 'Failed to create jar');
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Jars</h1>
        <Button 
          variant="primary"
          onClick={() => setCreateModalOpen(true)}
        >
          + Create Custom Jar
        </Button>
      </div>

      <JarGrid 
        jars={jars} 
        loading={loading} 
        onJarClick={handleJarClick} 
      />

      <JarModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedJar(null);
        }}
        jar={selectedJar}
        onAdjust={handleAdjust}
        loading={adjusting}
      />

      <CreateJarModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreateJar={handleCreateJar}
        existingJars={jars}
      />
    </div>
  );
};

export default JarsPage;
