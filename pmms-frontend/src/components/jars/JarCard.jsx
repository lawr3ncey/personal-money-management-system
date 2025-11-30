import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency, getJarImagePath } from '../../utils/formatters';

const JarCard = ({ jar, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(jar)}
      className="jar-card"
    >
      {/* 3D Jar Image - PROMINENT */}
      <div className="relative w-full aspect-square mb-4">
        <img
          src={getJarImagePath(jar.name)}
          alt={jar.name}
          className="w-full h-full object-contain drop-shadow-2xl group-hover:drop-shadow-jar transition-all duration-300"
          onError={(e) => {
            e.target.src = '/images/jar.png'; // Fallback image
          }}
        />
        
        {/* Floating balance badge */}
        <div className="absolute -top-2 -right-2 bg-primary-500 text-white rounded-full px-3 py-1 text-sm font-bold shadow-lg group-hover:scale-110 transition-transform">
          {formatCurrency(jar.amount)}
        </div>
      </div>

      {/* Jar name */}
      <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
        {jar.name}
      </h3>

      {/* Mini progress indicator */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
          style={{ 
            width: `${Math.min((jar.amount / 100000) * 100, 100)}%`,
            backgroundColor: jar.color || '#34c759'
          }}
        />
      </div>

      {/* Percentage allocation */}
      <p className="text-xs text-gray-500 text-center mt-2">
        {jar.percentage}% allocation
      </p>
    </motion.div>
  );
};

export default JarCard;
