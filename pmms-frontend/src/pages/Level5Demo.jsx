import React, { useState } from 'react';
import SubscriptionManager from '../components/subscription/SubscriptionManager';
import TeamFamilyMode from '../components/team/TeamFamilyMode';
import DarkModeToggle, { DarkModeProvider } from '../components/settings/DarkModeToggle';
import JarThemes from '../components/jars/JarThemes';
import MotivationalQuotes from '../components/widgets/MotivationalQuotes';
import AchievementBadges from '../components/gamification/AchievementBadges';
import DailyReminders from '../components/reminders/DailyReminders';

const Level5Demo = () => {
  const [activeTab, setActiveTab] = useState('subscription');

  const features = [
    { id: 'subscription', name: '💳 Subscription', component: <SubscriptionManager /> },
    { id: 'team', name: '👥 Team Mode', component: <TeamFamilyMode /> },
    { id: 'darkmode', name: '🌙 Dark Mode', component: <DarkModeToggle /> },
    { id: 'themes', name: '🎨 Jar Themes', component: <JarThemes jarId={1} currentTheme={{ color: '#8B5CF6', icon: '💰' }} /> },
    { id: 'quotes', name: '💡 Quotes', component: <MotivationalQuotes /> },
    { id: 'badges', name: '🏆 Badges', component: <AchievementBadges /> },
    { id: 'reminders', name: '⏰ Reminders', component: <DailyReminders /> }
  ];

  return (
    <DarkModeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto p-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 mb-6 text-white">
            <h1 className="text-4xl font-bold mb-2">🚀 LEVEL 5: SaaS Platform Features</h1>
            <p className="text-lg opacity-90">
              Advanced features for the ultimate money management experience
            </p>
            <div className="mt-4 flex gap-3 text-sm flex-wrap">
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                Subscription Tiers
              </span>
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                Team Collaboration
              </span>
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                Gamification
              </span>
              <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                Smart Reminders
              </span>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sticky top-6">
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">
                  Features ({features.length})
                </h3>
                <div className="space-y-2">
                  {features.map(feature => (
                    <button
                      key={feature.id}
                      onClick={() => setActiveTab(feature.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition ${
                        activeTab === feature.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {feature.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="col-span-9">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                {features.find(f => f.id === activeTab)?.component}
              </div>

              {/* Implementation Notes */}
              <div className="mt-6 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
                <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-3">
                  📋 Implementation Status
                </h4>
                <div className="space-y-2 text-sm">
                  <p className="text-blue-700 dark:text-blue-300">
                    ✅ <strong>UI Components:</strong> All 7 features built with dummy data
                  </p>
                  <p className="text-blue-700 dark:text-blue-300">
                    🔴 <strong>Backend Integration:</strong> Requires Supabase setup
                  </p>
                  <p className="text-blue-700 dark:text-blue-300">
                    🔴 <strong>Payment Gateway:</strong> Stripe/PayMongo integration needed
                  </p>
                  <p className="text-blue-700 dark:text-blue-300">
                    🔴 <strong>Notifications:</strong> Push notification service required
                  </p>
                  <p className="text-blue-700 dark:text-blue-300">
                    🔴 <strong>Mobile App:</strong> React Native screens ready for Expo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DarkModeProvider>
  );
};

export default Level5Demo;
