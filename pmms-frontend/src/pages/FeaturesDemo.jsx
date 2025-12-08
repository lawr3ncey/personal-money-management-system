import React, { useState } from 'react';

// Import all new Level 4 components
import MonthlySpendingInsights from '../components/analytics/MonthlySpendingInsights';
import GoalProgressTracker from '../components/goals/GoalProgressTracker';
import JarAdjustmentSimulator from '../components/jars/JarAdjustmentSimulator';
import BillReminderNotifications from '../components/bills/BillReminderNotifications';
import ExpenseCategorizationAI from '../components/ai/ExpenseCategorizationAI';
import SavingsTipsLibrary from '../components/tips/SavingsTipsLibrary';
import RecurringExpensePreview from '../components/recurring/RecurringExpensePreview';
import CurrencyConversionSimulator from '../components/currency/CurrencyConversionSimulator';
import BackupRestore from '../components/backup/BackupRestore';
import UserEngagementAnalytics from '../components/analytics/UserEngagementAnalytics';

const FEATURES = [
  { id: 17, name: '📊 Monthly Spending Insights', component: 'MonthlySpendingInsights' },
  { id: 18, name: '🎯 Goal Progress Tracker', component: 'GoalProgressTracker' },
  { id: 19, name: '⚖️ Jar Adjustment Simulator', component: 'JarAdjustmentSimulator' },
  { id: 20, name: '🔔 Bill Reminder Notifications', component: 'BillReminderNotifications' },
  { id: 21, name: '🤖 Expense Categorization AI', component: 'ExpenseCategorizationAI' },
  { id: 22, name: '💡 Savings Tips Library', component: 'SavingsTipsLibrary' },
  { id: 23, name: '🔄 Recurring Expense Preview', component: 'RecurringExpensePreview' },
  { id: 24, name: '💱 Currency Conversion Simulator', component: 'CurrencyConversionSimulator' },
  { id: 25, name: '💾 Backup & Restore', component: 'BackupRestore' },
  { id: 26, name: '📈 User Engagement Analytics', component: 'UserEngagementAnalytics' },
];

const FeaturesDemo = () => {
  const [selectedFeature, setSelectedFeature] = useState(FEATURES[0]);

  const renderComponent = () => {
    switch (selectedFeature.component) {
      case 'MonthlySpendingInsights':
        return <MonthlySpendingInsights />;
      case 'GoalProgressTracker':
        return <GoalProgressTracker />;
      case 'JarAdjustmentSimulator':
        return <JarAdjustmentSimulator />;
      case 'BillReminderNotifications':
        return <BillReminderNotifications />;
      case 'ExpenseCategorizationAI':
        return <ExpenseCategorizationAI />;
      case 'SavingsTipsLibrary':
        return <SavingsTipsLibrary />;
      case 'RecurringExpensePreview':
        return <RecurringExpensePreview />;
      case 'CurrencyConversionSimulator':
        return <CurrencyConversionSimulator />;
      case 'BackupRestore':
        return <BackupRestore />;
      case 'UserEngagementAnalytics':
        return <UserEngagementAnalytics />;
      default:
        return <div>Component not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">🚀 Level 4 Features Demo</h1>
          <p className="text-purple-100">Testing all 10 new features with dummy data</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-4 sticky top-6">
              <h2 className="font-bold text-gray-800 mb-4 text-lg">Select Feature</h2>
              <div className="space-y-2">
                {FEATURES.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setSelectedFeature(feature)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedFeature.id === feature.id
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium text-sm">{feature.name}</div>
                    <div className="text-xs opacity-80 mt-1">Feature #{feature.id}</div>
                  </button>
                ))}
              </div>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-xs text-yellow-800">
                  <div className="font-bold mb-2">🔴 Demo Mode</div>
                  <p>All data is dummy/simulated. Connect to Supabase for real functionality.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedFeature.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">Feature #{selectedFeature.id} • Level 4 Implementation</p>
                </div>
                <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  ✓ Implemented
                </div>
              </div>
            </div>

            {/* Component Render Area */}
            <div className="space-y-6">
              {renderComponent()}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white p-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-300">
            Personal Money Management System • Level 4 Features (17-26) • All Rights Reserved © 2024
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Built with React 19.2, Tailwind CSS, Recharts • 6 Jars Method
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesDemo;
