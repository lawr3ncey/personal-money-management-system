import React, { useState, useEffect, createContext, useContext } from 'react';

// Dark Mode Context
const DarkModeContext = createContext();

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within DarkModeProvider');
  }
  return context;
};

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 🔴 TODO: Load preference from Supabase user_preferences
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // 🔴 TODO: Save to Supabase user_preferences
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{isDarkMode ? '🌙' : '☀️'}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {isDarkMode ? 'Dark Mode' : 'Light Mode'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isDarkMode ? 'Easy on the eyes at night' : 'Bright and clear'}
            </p>
          </div>
        </div>
        
        <button
          onClick={toggleDarkMode}
          className={`relative w-16 h-8 rounded-full transition-colors ${
            isDarkMode ? 'bg-purple-600' : 'bg-gray-300'
          }`}
        >
          <div
            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
              isDarkMode ? 'transform translate-x-8' : ''
            }`}
          />
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">🎨 Theme Preview</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded">
            <div className="text-xs text-gray-600 dark:text-gray-400">Background</div>
            <div className="text-sm font-semibold text-gray-800 dark:text-white">Cards & Panels</div>
          </div>
          <div className="p-3 bg-purple-100 dark:bg-purple-900 border border-purple-200 dark:border-purple-700 rounded">
            <div className="text-xs text-purple-600 dark:text-purple-400">Accents</div>
            <div className="text-sm font-semibold text-purple-800 dark:text-purple-200">Highlights</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkModeToggle;

// 🔴 IMPLEMENTATION NOTES:
// - Add 'dark' class support in tailwind.config.js
// - Store preference in Supabase user_preferences table
// - Apply theme to all components consistently
// - Add smooth transition animations
