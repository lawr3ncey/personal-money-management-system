import React, { createContext, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationContext = createContext(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const showSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  const showError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 4000
    });
  };

  const showInfo = (message) => {
    toast.info(message, {
      position: "top-center",
      autoClose: 3000
    });
  };

  const notifyJarTransaction = (type, amount, jarName) => {
    const icon = type === 'add' ? '💰' : type === 'subtract' ? '💸' : '✏️';
    const action = type === 'add' ? 'added to' : type === 'subtract' ? 'removed from' : 'edited in';
    
    showSuccess(`${icon} ₱${amount.toFixed(2)} ${action} ${jarName} Jar`);
  };

  const value = {
    showSuccess,
    showError,
    showInfo,
    notifyJarTransaction
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <ToastContainer
        position="top-right"
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </NotificationContext.Provider>
  );
};
