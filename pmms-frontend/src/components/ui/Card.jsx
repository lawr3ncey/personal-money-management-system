import React from 'react';

const Card = ({ children, className = '', onClick, hoverable = false }) => {
  return (
    <div
      onClick={onClick}
      className={`glass-card ${hoverable ? 'cursor-pointer hover:shadow-jar hover:scale-105 transition-all duration-300' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
