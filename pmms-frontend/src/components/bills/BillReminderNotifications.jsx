import React, { useState, useEffect } from 'react';

// 🔴 DUMMY DATA - Replace with Supabase queries later
const DUMMY_BILLS = [
  {
    id: 1,
    name: 'Electric Bill',
    amount: 2500,
    dueDate: '2025-01-15',
    category: 'Utilities',
    status: 'pending',
    recurring: true,
    frequency: 'monthly',
    lastPaid: '2024-12-12',
    icon: '⚡',
    color: '#F59E0B',
    jarSource: 'Necessities'
  },
  {
    id: 2,
    name: 'Internet Bill',
    amount: 1699,
    dueDate: '2025-01-20',
    category: 'Utilities',
    status: 'pending',
    recurring: true,
    frequency: 'monthly',
    lastPaid: '2024-12-18',
    icon: '🌐',
    color: '#3B82F6',
    jarSource: 'Necessities'
  },
  {
    id: 3,
    name: 'Water Bill',
    amount: 850,
    dueDate: '2025-01-10',
    category: 'Utilities',
    status: 'overdue',
    recurring: true,
    frequency: 'monthly',
    lastPaid: '2024-11-09',
    icon: '💧',
    color: '#06B6D4',
    jarSource: 'Necessities'
  },
  {
    id: 4,
    name: 'Car Insurance',
    amount: 15000,
    dueDate: '2025-02-05',
    category: 'Insurance',
    status: 'upcoming',
    recurring: false,
    frequency: 'yearly',
    lastPaid: '2024-02-03',
    icon: '🚗',
    color: '#EF4444',
    jarSource: 'Necessities'
  },
  {
    id: 5,
    name: 'Netflix Subscription',
    amount: 549,
    dueDate: '2025-01-08',
    category: 'Entertainment',
    status: 'pending',
    recurring: true,
    frequency: 'monthly',
    lastPaid: '2024-12-08',
    icon: '🎬',
    color: '#E50914',
    jarSource: 'Play'
  },
  {
    id: 6,
    name: 'Spotify Premium',
    amount: 149,
    dueDate: '2025-01-12',
    category: 'Entertainment',
    status: 'pending',
    recurring: true,
    frequency: 'monthly',
    lastPaid: '2024-12-12',
    icon: '🎵',
    color: '#1DB954',
    jarSource: 'Play'
  },
  {
    id: 7,
    name: 'Gym Membership',
    amount: 2000,
    dueDate: '2025-01-25',
    category: 'Health',
    status: 'upcoming',
    recurring: true,
    frequency: 'monthly',
    lastPaid: '2024-12-25',
    icon: '💪',
    color: '#8B5CF6',
    jarSource: 'Play'
  },
  {
    id: 8,
    name: 'Credit Card Payment',
    amount: 8500,
    dueDate: '2025-01-18',
    category: 'Debt',
    status: 'pending',
    recurring: true,
    frequency: 'monthly',
    lastPaid: '2024-12-16',
    icon: '💳',
    color: '#6B7280',
    jarSource: 'Necessities'
  }
];

const BillReminderNotifications = () => {
  const [bills, setBills] = useState(DUMMY_BILLS);
  const [filter, setFilter] = useState('all'); // all, pending, upcoming, overdue, paid
  const [showAddModal, setShowAddModal] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // 🔴 TODO: Replace with actual Supabase query
  // const { data: bills } = useQuery('bills', fetchBills);
  // const { mutate: markAsPaid } = useMutation(markBillAsPaid);

  const calculateDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusInfo = (bill) => {
    const daysUntilDue = calculateDaysUntilDue(bill.dueDate);
    
    if (daysUntilDue < 0) {
      return { status: 'overdue', label: `${Math.abs(daysUntilDue)} days overdue`, color: 'red', bgColor: 'bg-red-50', textColor: 'text-red-700' };
    } else if (daysUntilDue === 0) {
      return { status: 'due-today', label: 'Due today!', color: 'orange', bgColor: 'bg-orange-50', textColor: 'text-orange-700' };
    } else if (daysUntilDue <= 3) {
      return { status: 'urgent', label: `Due in ${daysUntilDue} days`, color: 'orange', bgColor: 'bg-orange-50', textColor: 'text-orange-700' };
    } else if (daysUntilDue <= 7) {
      return { status: 'pending', label: `Due in ${daysUntilDue} days`, color: 'yellow', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700' };
    } else {
      return { status: 'upcoming', label: `Due in ${daysUntilDue} days`, color: 'blue', bgColor: 'bg-blue-50', textColor: 'text-blue-700' };
    }
  };

  const markAsPaid = (billId) => {
    // 🔴 TODO: Save to Supabase transactions and update bill status
    setBills(bills.map(bill => 
      bill.id === billId 
        ? { ...bill, status: 'paid', lastPaid: new Date().toISOString().split('T')[0] }
        : bill
    ));
    alert('✅ Bill marked as paid!\n\n🔴 This is a demo. In production, this will:\n- Save transaction to Supabase\n- Deduct from jar balance\n- Update bill status\n- Send confirmation');
  };

  const snoozeReminder = (billId, days) => {
    // 🔴 TODO: Update reminder date in Supabase
    const bill = bills.find(b => b.id === billId);
    const newDueDate = new Date(bill.dueDate);
    newDueDate.setDate(newDueDate.getDate() + days);
    
    setBills(bills.map(b => 
      b.id === billId 
        ? { ...b, dueDate: newDueDate.toISOString().split('T')[0] }
        : b
    ));
  };

  const formatCurrency = (value) => {
    return `₱${value.toLocaleString()}`;
  };

  const filteredBills = bills.filter(bill => {
    if (filter === 'all') return true;
    const statusInfo = getStatusInfo(bill);
    if (filter === 'overdue') return statusInfo.status === 'overdue';
    if (filter === 'urgent') return statusInfo.status === 'urgent' || statusInfo.status === 'due-today';
    if (filter === 'upcoming') return statusInfo.status === 'upcoming';
    if (filter === 'paid') return bill.status === 'paid';
    return true;
  });

  const totalDue = bills
    .filter(b => b.status !== 'paid')
    .reduce((sum, bill) => sum + bill.amount, 0);

  const overdueCount = bills.filter(b => getStatusInfo(b).status === 'overdue').length;
  const urgentCount = bills.filter(b => {
    const info = getStatusInfo(b);
    return info.status === 'urgent' || info.status === 'due-today';
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">🔔 Bill Reminder & Tracker</h2>
        <p className="text-orange-100">Never miss a payment with smart reminders</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Total Due</div>
          <div className="text-2xl font-bold text-primary-600">{formatCurrency(totalDue)}</div>
          <div className="text-xs text-gray-500 mt-1">{bills.filter(b => b.status !== 'paid').length} bills</div>
        </div>
        <div className={`bg-white p-4 rounded-lg shadow ${overdueCount > 0 ? 'ring-2 ring-red-500' : ''}`}>
          <div className="text-gray-600 text-sm">Overdue</div>
          <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
          <div className="text-xs text-red-500 mt-1">Requires immediate action!</div>
        </div>
        <div className={`bg-white p-4 rounded-lg shadow ${urgentCount > 0 ? 'ring-2 ring-orange-500' : ''}`}>
          <div className="text-gray-600 text-sm">Due Soon</div>
          <div className="text-2xl font-bold text-orange-600">{urgentCount}</div>
          <div className="text-xs text-orange-500 mt-1">Within 3 days</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm">This Month</div>
          <div className="text-2xl font-bold text-blue-600">{bills.length}</div>
          <div className="text-xs text-gray-500 mt-1">Total bills</div>
        </div>
      </div>

      {/* Notifications Toggle */}
      <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
        <div>
          <div className="font-semibold text-gray-800">Push Notifications</div>
          <div className="text-sm text-gray-600">Get reminded 3 days before due date</div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-2 rounded-lg shadow flex gap-2 overflow-x-auto">
        {['all', 'overdue', 'urgent', 'upcoming', 'paid'].map(filterType => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
              filter === filterType
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>

      {/* Bills List */}
      <div className="space-y-3">
        {filteredBills.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow text-center">
            <div className="text-6xl mb-4">🎉</div>
            <div className="text-xl font-semibold text-gray-800 mb-2">No bills in this category!</div>
            <div className="text-gray-600">You're all caught up.</div>
          </div>
        ) : (
          filteredBills.map(bill => {
            const statusInfo = getStatusInfo(bill);
            
            return (
              <div 
                key={bill.id} 
                className={`bg-white p-6 rounded-lg shadow hover:shadow-lg transition border-l-4`}
                style={{ borderLeftColor: bill.color }}
              >
                <div className="flex items-start justify-between">
                  {/* Bill Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-4xl">{bill.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-semibold text-gray-800">{bill.name}</h4>
                        {bill.recurring && (
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                            🔄 {bill.frequency}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {bill.category} • From {bill.jarSource} jar
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Due: </span>
                          <span className="font-semibold">{new Date(bill.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full ${statusInfo.bgColor} ${statusInfo.textColor} font-medium`}>
                          {statusInfo.label}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">{formatCurrency(bill.amount)}</div>
                    {bill.lastPaid && bill.status !== 'overdue' && (
                      <div className="text-xs text-gray-500 mt-1">
                        Last: {new Date(bill.lastPaid).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  {bill.status !== 'paid' && (
                    <>
                      <button
                        onClick={() => markAsPaid(bill.id)}
                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-medium"
                      >
                        ✅ Mark as Paid
                      </button>
                      <button
                        onClick={() => snoozeReminder(bill.id, 3)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        title="Snooze for 3 days"
                      >
                        😴 Snooze
                      </button>
                    </>
                  )}
                  {bill.status === 'paid' && (
                    <div className="flex-1 bg-green-50 text-green-700 px-4 py-2 rounded-lg font-medium text-center">
                      ✅ Paid on {new Date(bill.lastPaid).toLocaleDateString()}
                    </div>
                  )}
                  <button
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    title="Edit bill"
                  >
                    ✏️
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add New Bill Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition shadow-lg flex items-center justify-center gap-2 text-lg font-semibold"
      >
        <span>➕</span>
        <span>Add New Bill</span>
      </button>

      {/* Payment Calendar Preview */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">📅 This Month's Payment Schedule</h3>
        <div className="space-y-2">
          {bills
            .filter(b => b.status !== 'paid')
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .map(bill => {
              const statusInfo = getStatusInfo(bill);
              return (
                <div key={bill.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{bill.icon}</span>
                    <div>
                      <div className="font-medium text-gray-800">{bill.name}</div>
                      <div className="text-xs text-gray-500">{new Date(bill.dueDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">{formatCurrency(bill.amount)}</div>
                    <div className={`text-xs ${statusInfo.textColor}`}>{statusInfo.label}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Implementation Notes */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">🔧 Implementation Notes (Developer):</h4>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
          <li>Replace DUMMY_BILLS with Supabase query from 'bills' table</li>
          <li>Implement push notifications using Firebase Cloud Messaging or Expo Notifications</li>
          <li>Add cron job to send reminders 3 days before due date</li>
          <li>When marking as paid, create transaction and deduct from jar balance</li>
          <li>Add bill templates for common utilities</li>
          <li>Implement recurring bill auto-creation</li>
          <li>Add CSV import for bulk bill upload</li>
        </ul>
      </div>
    </div>
  );
};

export default BillReminderNotifications;
