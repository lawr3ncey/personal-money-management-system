import React, { useState } from 'react';
import { useJars } from '../hooks/useJars';
import JarGrid from '../components/jars/JarGrid';
import JarModal from '../components/jars/JarModal';
import Button from '../components/ui/Button';

const JarsPage = () => {
  const { jars, loading, adjustJar } = useJars();
  const [selectedJar, setSelectedJar] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [adjusting, setAdjusting] = useState(false);

  const handleJarClick = (jar) => {
    setSelectedJar(jar);
    setModalOpen(true);
  };

  const handleAdjust = async (adjustData) => {
    try {
      setAdjusting(true);
      await adjustJar(selectedJar._id, adjustData);
      setModalOpen(false);
      setSelectedJar(null);
    } finally {
      setAdjusting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Jars</h1>
        <Button variant="primary">
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
    </div>
  );
};

export default JarsPage;
