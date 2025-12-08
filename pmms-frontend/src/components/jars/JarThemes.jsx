import React, { useState } from 'react';

// 🔴 DUMMY DATA - Predefined theme presets
const THEME_PRESETS = {
  material: {
    name: 'Material',
    colors: ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3']
  },
  pastel: {
    name: 'Pastel',
    colors: ['#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFC9', '#BAE1FF', '#D4BAFF']
  },
  vibrant: {
    name: 'Vibrant',
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F']
  },
  professional: {
    name: 'Professional',
    colors: ['#2C3E50', '#34495E', '#7F8C8D', '#95A5A6', '#BDC3C7', '#ECF0F1']
  },
  nature: {
    name: 'Nature',
    colors: ['#27AE60', '#16A085', '#2ECC71', '#1ABC9C', '#3498DB', '#9B59B6']
  }
};

const ICON_LIBRARY = [
  '💰', '🏦', '💵', '💴', '💶', '💷', '💳', '🏠', '🚗', '✈️',
  '🎓', '📚', '🎮', '🎬', '🍔', '☕', '🛍️', '💊', '⚽', '🎵',
  '🌟', '💎', '🎯', '🔥', '⚡', '🌈', '🎨', '🔮', '💝', '🎁'
];

const JarThemes = ({ jarId, currentTheme, onSave }) => {
  const [selectedPreset, setSelectedPreset] = useState('material');
  const [customColor, setCustomColor] = useState(currentTheme?.color || '#8B5CF6');
  const [selectedIcon, setSelectedIcon] = useState(currentTheme?.icon || '💰');
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const handleSaveTheme = () => {
    const theme = {
      jarId,
      preset: selectedPreset,
      color: customColor,
      icon: selectedIcon,
      updatedAt: new Date().toISOString()
    };
    
    // 🔴 TODO: Save to Supabase jar_themes table
    localStorage.setItem(`jar_theme_${jarId}`, JSON.stringify(theme));
    if (onSave) onSave(theme);
  };

  const applyPresetColor = (color) => {
    setCustomColor(color);
    setPreviewMode(true);
    setTimeout(() => setPreviewMode(false), 1000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-4">🎨 Customize Jar Theme</h3>

      {/* Icon Selector */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Jar Icon
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowIconPicker(!showIconPicker)}
            className="w-16 h-16 bg-gray-100 rounded-lg text-3xl flex items-center justify-center hover:bg-gray-200 transition"
          >
            {selectedIcon}
          </button>
          <div className="flex-1">
            <p className="text-sm text-gray-600">Click to change icon</p>
            <p className="text-xs text-gray-500">{ICON_LIBRARY.length} icons available</p>
          </div>
        </div>

        {showIconPicker && (
          <div className="mt-3 p-4 bg-gray-50 rounded-lg grid grid-cols-10 gap-2">
            {ICON_LIBRARY.map((icon, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedIcon(icon);
                  setShowIconPicker(false);
                }}
                className={`w-10 h-10 text-2xl hover:bg-white rounded transition ${
                  selectedIcon === icon ? 'bg-white shadow' : ''
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Theme Presets */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Color Presets
        </label>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(THEME_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => setSelectedPreset(key)}
              className={`p-3 rounded-lg border-2 transition ${
                selectedPreset === key
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-sm font-semibold text-gray-800 mb-2">
                {preset.name}
              </div>
              <div className="flex gap-1">
                {preset.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      applyPresetColor(color);
                    }}
                    className="w-6 h-6 rounded hover:scale-110 transition"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Color */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Custom Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="w-20 h-12 rounded cursor-pointer"
          />
          <input
            type="text"
            value={customColor}
            onChange={(e) => setCustomColor(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="#8B5CF6"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Preview
        </label>
        <div
          className={`p-6 rounded-lg transition-all ${
            previewMode ? 'scale-105' : ''
          }`}
          style={{ backgroundColor: customColor + '20' }}
        >
          <div
            className="inline-flex items-center gap-3 px-6 py-4 rounded-lg text-white"
            style={{ backgroundColor: customColor }}
          >
            <span className="text-3xl">{selectedIcon}</span>
            <div>
              <div className="font-bold text-lg">Sample Jar</div>
              <div className="text-sm opacity-90">₱25,000</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSaveTheme}
          className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          💾 Save Theme
        </button>
        <button
          onClick={() => {
            setCustomColor('#8B5CF6');
            setSelectedIcon('💰');
            setSelectedPreset('material');
          }}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default JarThemes;

// 🔴 IMPLEMENTATION NOTES:
// - Create jar_themes table in Supabase
// - Save user preferences per jar
// - Apply themes dynamically across all jar displays
// - Add animation when theme changes
