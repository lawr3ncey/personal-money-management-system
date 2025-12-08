import React, { useState, useEffect } from 'react';

// 🔴 DUMMY DATA - Sample reminders
const DUMMY_REMINDERS = [
  {
    id: 1,
    type: 'bill',
    title: 'Internet Bill Due',
    description: 'Converge Internet - ₱1,699',
    time: '09:00',
    frequency: 'monthly',
    date: '2025-12-15',
    enabled: true,
    icon: '💳'
  },
  {
    id: 2,
    type: 'goal',
    title: 'Vacation Fund Check-in',
    description: 'Review progress on Vacation goal',
    time: '18:00',
    frequency: 'weekly',
    date: '2025-12-07',
    enabled: true,
    icon: '🏖️'
  },
  {
    id: 3,
    type: 'transaction',
    title: 'Log Daily Expenses',
    description: 'Remember to record today\'s transactions',
    time: '20:00',
    frequency: 'daily',
    date: '2025-12-05',
    enabled: true,
    icon: '📝'
  },
  {
    id: 4,
    type: 'savings',
    title: 'Monthly Savings Target',
    description: 'Check if you hit ₱10,000 savings goal',
    time: '17:00',
    frequency: 'monthly',
    date: '2025-12-31',
    enabled: false,
    icon: '💰'
  }
];

const REMINDER_TYPES = [
  { value: 'bill', label: 'Bill Payment', icon: '💳' },
  { value: 'goal', label: 'Goal Check-in', icon: '🎯' },
  { value: 'transaction', label: 'Transaction Log', icon: '📝' },
  { value: 'savings', label: 'Savings Reminder', icon: '💰' },
  { value: 'budget', label: 'Budget Review', icon: '📊' },
  { value: 'custom', label: 'Custom Reminder', icon: '⏰' }
];

const FREQUENCIES = ['daily', 'weekly', 'monthly', 'yearly', 'once'];

const DailyReminders = () => {
  const [reminders, setReminders] = useState(DUMMY_REMINDERS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReminder, setNewReminder] = useState({
    type: 'transaction',
    title: '',
    description: '',
    time: '09:00',
    frequency: 'daily',
    date: new Date().toISOString().split('T')[0],
    enabled: true
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    // 🔴 TODO: Load reminders from Supabase user_reminders
    const savedReminders = localStorage.getItem('reminders');
    if (savedReminders) {
      setReminders(JSON.parse(savedReminders));
    }

    // Check notification permission
    if ('Notification' in window) {
      setNotificationsEnabled(Notification.permission === 'granted');
    }
  }, []);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.permission;
      if (permission === 'default') {
        const result = await Notification.requestPermission();
        setNotificationsEnabled(result === 'granted');
      }
    }
  };

  const toggleReminder = (id) => {
    const updated = reminders.map(r =>
      r.id === id ? { ...r, enabled: !r.enabled } : r
    );
    setReminders(updated);
    localStorage.setItem('reminders', JSON.stringify(updated));
    // 🔴 TODO: Update in Supabase
  };

  const deleteReminder = (id) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    localStorage.setItem('reminders', JSON.stringify(updated));
    // 🔴 TODO: Delete from Supabase
  };

  const handleAddReminder = () => {
    const reminder = {
      ...newReminder,
      id: Date.now(),
      icon: REMINDER_TYPES.find(t => t.value === newReminder.type)?.icon || '⏰'
    };
    
    const updated = [...reminders, reminder];
    setReminders(updated);
    localStorage.setItem('reminders', JSON.stringify(updated));
    // 🔴 TODO: Save to Supabase
    
    setShowAddModal(false);
    setNewReminder({
      type: 'transaction',
      title: '',
      description: '',
      time: '09:00',
      frequency: 'daily',
      date: new Date().toISOString().split('T')[0],
      enabled: true
    });
  };

  const testNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('💰 Test Reminder', {
        body: 'This is how your reminders will look!',
        icon: '/logo192.png'
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">⏰ Daily Reminders</h3>
          <p className="text-sm text-gray-600">
            {reminders.filter(r => r.enabled).length} active reminders
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700"
        >
          + Add
        </button>
      </div>

      {/* Notification Permission */}
      {!notificationsEnabled && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔔</span>
              <div>
                <p className="font-semibold text-yellow-800">Enable Notifications</p>
                <p className="text-sm text-yellow-700">Get reminded on time</p>
              </div>
            </div>
            <button
              onClick={requestNotificationPermission}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-yellow-700"
            >
              Enable
            </button>
          </div>
        </div>
      )}

      {notificationsEnabled && (
        <button
          onClick={testNotification}
          className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg text-sm font-semibold mb-4 hover:bg-blue-100"
        >
          🧪 Test Notification
        </button>
      )}

      {/* Reminders List */}
      <div className="space-y-3">
        {reminders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-5xl mb-3">⏰</div>
            <p>No reminders yet. Add your first one!</p>
          </div>
        ) : (
          reminders.map(reminder => (
            <div
              key={reminder.id}
              className={`p-4 rounded-lg border-2 transition ${
                reminder.enabled
                  ? 'bg-white border-purple-200'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <span className="text-3xl">{reminder.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{reminder.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{reminder.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>⏰ {reminder.time}</span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                        {reminder.frequency}
                      </span>
                      {reminder.date && (
                        <span>📅 {new Date(reminder.date).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleReminder(reminder.id)}
                    className={`relative w-12 h-6 rounded-full transition ${
                      reminder.enabled ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        reminder.enabled ? 'transform translate-x-6' : ''
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Reminder Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">⏰ New Reminder</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={newReminder.type}
                  onChange={(e) => setNewReminder({ ...newReminder, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  {REMINDER_TYPES.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Pay electricity bill"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newReminder.description}
                  onChange={(e) => setNewReminder({ ...newReminder, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows="2"
                  placeholder="Additional details..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newReminder.time}
                    onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Frequency
                  </label>
                  <select
                    value={newReminder.frequency}
                    onChange={(e) => setNewReminder({ ...newReminder, frequency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    {FREQUENCIES.map(freq => (
                      <option key={freq} value={freq}>
                        {freq.charAt(0).toUpperCase() + freq.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={newReminder.date}
                  onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddReminder}
                disabled={!newReminder.title}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Reminder
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyReminders;

// 🔴 IMPLEMENTATION NOTES:
// - Create reminders table in Supabase with user_id, type, schedule
// - Implement background job to trigger notifications at scheduled times
// - For mobile: use expo-notifications for push notifications
// - Add snooze functionality (5min, 15min, 1hour)
// - Track reminder history and completion
// - Add recurring reminder logic with proper scheduling
