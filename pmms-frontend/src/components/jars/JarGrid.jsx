import React from 'react';
import JarCard from './JarCard';
import Spinner from '../ui/Spinner';
import EmptyState from '../ui/EmptyState';

const JarGrid = ({ jars, loading, onJarClick }) => {
  if (loading) {
    return <Spinner size="lg" className="my-12" />;
  }

  if (!jars || jars.length === 0) {
    return (
      <EmptyState
        icon="🏺"
        title="No Jars Found"
        description="Start by distributing your income to create your jars"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {jars.map((jar) => (
        <JarCard key={jar._id} jar={jar} onClick={onJarClick} />
      ))}
    </div>
  );
};

export default JarGrid;
