import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 🔴 DUMMY DATA - Replace with Supabase queries later
const DUMMY_ACTIVITY_DATA = {
  last30Days: 24,
  currentStreak: 7,
  longestStreak: 15,
  totalLogins: 156,
  lastLogin: new Date().toISOString(),
};

const DUMMY_DAILY_ACTIVITY = [
  { date: 'Nov 28', logins: 2, transactions: 5, goalUpdates: 1 },
  { date: 'Nov 29', logins: 1, transactions: 3, goalUpdates: 0 },
  { date: 'Nov 30', logins: 3, transactions: 8, goalUpdates: 2 },
  { date: 'Dec 1', logins: 2, transactions: 4, goalUpdates: 0 },
  { date: 'Dec 2', logins: 1, transactions: 2, goalUpdates: 1 },
  { date: 'Dec 3', logins: 2, transactions: 6, goalUpdates: 1 },
  { date: 'Dec 4', logins: 3, transactions: 7, goalUpdates: 2 },
];

const DUMMY_FEATURE_USAGE = [
  { feature: 'Transactions', count: 487, percentage: 35 },
  { feature: 'Jar Management', count: 234, percentage: 17 },
  { feature: 'Goals', count: 189, percentage: 14 },
  { feature: 'Analytics', count: 167, percentage: 12 },
  { feature: 'Bills', count: 145, percentage: 11 },
  { feature: 'Budget', count: 98, percentage: 7 },
  { feature: 'Settings', count: 56, percentage: 4 },
];

const DUMMY_TIME_OF_DAY = [
  { time: '00:00-06:00', usage: 15 },
  { time: '06:00-12:00', usage: 120 },
  { time: '12:00-18:00', usage: 180 },
  { time: '18:00-24:00', usage: 140 },
];

const DUMMY_ACHIEVEMENTS = [
  { id: 1, name: '7 Day Streak', icon: '🔥', unlocked: true, date: '2024-12-01' },
  { id: 2, name: '100 Transactions', icon: '💯', unlocked: true, date: '2024-11-28' },
  { id: 3, name: 'First Goal', icon: '🎯', unlocked: true, date: '2024-11-15' },
  { id: 4, name: 'Budget Master', icon: '📊', unlocked: true, date: '2024-11-20' },
  { id: 5, name: '30 Day Streak', icon: '🏆', unlocked: false, date: null },
  { id: 6, name: '500 Transactions', icon: '⭐', unlocked: false, date: null },
  { id: 7, name: 'Savings Champion', icon: '💰', unlocked: false, date: null },
  { id: 8, name: '1 Year Member', icon: '🎉', unlocked: false, date: null },
];

const DUMMY_ENGAGEMENT_SCORE = {
  current: 85,
  previous: 78,
  rank: 'High Engagement',
  factors: [
    { name: 'Daily Activity', score: 90, weight: 30 },
    { name: 'Feature Usage', score: 85, weight: 25 },
    { name: 'Goal Progress', score: 80, weight: 20 },
    { name: 'Budget Adherence', score: 88, weight: 15 },
    { name: 'Social Features', score: 70, weight: 10 },
  ]
};

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#EF4444'];

const UserEngagementAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('all');

  // 🔴 TODO: Replace with actual Supabase query
  // const { data: activityData } = useQuery('userActivity', fetchUserActivity);
  // const { data: featureUsage } = useQuery('featureUsage', fetchFeatureUsage);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStreakEmoji = (days) => {
    if (days >= 30) return '🏆';
    if (days >= 14) return '🔥🔥';
    if (days >= 7) return '🔥';
    return '📅';
  };

  const getEngagementLevel = (score) => {
    if (score >= 80) return { label: 'High', color: 'text-green-600', bg: 'bg-green-50' };
    if (score >= 60) return { label: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { label: 'Low', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const engagementLevel = getEngagementLevel(DUMMY_ENGAGEMENT_SCORE.current);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">📈 User Engagement Analytics</h2>
        <p className="text-pink-100">Track your activity, achievements, and app usage patterns</p>
      </div>

      {/* Engagement Score */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">⭐ Your Engagement Score</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className={`text-6xl font-bold mb-2 ${engagementLevel.color}`}>
              {DUMMY_ENGAGEMENT_SCORE.current}
            </div>
            <div className="text-gray-600 font-medium">Current Score</div>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-2 ${engagementLevel.bg} ${engagementLevel.color}`}>
              {engagementLevel.label} Engagement
            </div>
          </div>

          <div className="text-center">
            <div className="text-6xl font-bold mb-2 text-blue-600">
              +{DUMMY_ENGAGEMENT_SCORE.current - DUMMY_ENGAGEMENT_SCORE.previous}
            </div>
            <div className="text-gray-600 font-medium">Change from Last Week</div>
            <div className="text-sm text-green-600 font-semibold mt-2">
              ↑ {Math.round(((DUMMY_ENGAGEMENT_SCORE.current - DUMMY_ENGAGEMENT_SCORE.previous) / DUMMY_ENGAGEMENT_SCORE.previous) * 100)}% improvement
            </div>
          </div>

          <div className="text-center">
            <div className="text-6xl mb-2">🏅</div>
            <div className="text-gray-600 font-medium">Your Rank</div>
            <div className="text-sm text-purple-600 font-semibold mt-2">
              {DUMMY_ENGAGEMENT_SCORE.rank}
            </div>
          </div>
        </div>

        {/* Score Factors */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700">Score Breakdown</h4>
          {DUMMY_ENGAGEMENT_SCORE.factors.map((factor, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 font-medium">{factor.name}</span>
                <span className="text-gray-600">{factor.score}/100 • {factor.weight}% weight</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
                  style={{ width: `${factor.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Days Active (30d)</div>
          <div className="text-3xl font-bold text-blue-600">{DUMMY_ACTIVITY_DATA.last30Days}</div>
          <div className="text-xs text-gray-500 mt-1">Out of 30 days</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm flex items-center gap-1">
            Current Streak {getStreakEmoji(DUMMY_ACTIVITY_DATA.currentStreak)}
          </div>
          <div className="text-3xl font-bold text-orange-600">{DUMMY_ACTIVITY_DATA.currentStreak}</div>
          <div className="text-xs text-gray-500 mt-1">Days in a row</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Longest Streak</div>
          <div className="text-3xl font-bold text-purple-600">{DUMMY_ACTIVITY_DATA.longestStreak}</div>
          <div className="text-xs text-gray-500 mt-1">Personal best</div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Total Logins</div>
          <div className="text-3xl font-bold text-green-600">{DUMMY_ACTIVITY_DATA.totalLogins}</div>
          <div className="text-xs text-gray-500 mt-1">All time</div>
        </div>
      </div>

      {/* Daily Activity Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">📊 Daily Activity (Last 7 Days)</h3>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={DUMMY_DAILY_ACTIVITY}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="logins" fill="#3B82F6" name="Logins" />
            <Bar dataKey="transactions" fill="#10B981" name="Transactions" />
            <Bar dataKey="goalUpdates" fill="#8B5CF6" name="Goal Updates" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Feature Usage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Feature Usage Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">🎯 Feature Usage Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={DUMMY_FEATURE_USAGE}
                dataKey="count"
                nameKey="feature"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ feature, percentage }) => `${feature} ${percentage}%`}
              >
                {DUMMY_FEATURE_USAGE.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Feature Usage List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">📋 Feature Breakdown</h3>
          <div className="space-y-3">
            {DUMMY_FEATURE_USAGE.map((feature, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{feature.feature}</span>
                  <span className="text-gray-600">{feature.count} uses</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{ 
                      width: `${feature.percentage}%`,
                      backgroundColor: COLORS[idx % COLORS.length]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time of Day Usage */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">🕐 Peak Usage Times</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={DUMMY_TIME_OF_DAY}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="usage" fill="#EC4899" name="Sessions" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 p-4 bg-pink-50 rounded-lg border border-pink-200">
          <div className="font-semibold text-pink-800">💡 Insight</div>
          <div className="text-sm text-pink-700 mt-1">
            You're most active between 12:00 PM - 6:00 PM. Consider setting reminders during this time for better engagement!
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">🏆 Achievements</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {DUMMY_ACHIEVEMENTS.map(achievement => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 text-center transition ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
                  : 'bg-gray-50 border-gray-300 opacity-50'
              }`}
            >
              <div className="text-4xl mb-2">
                {achievement.unlocked ? achievement.icon : '🔒'}
              </div>
              <div className="font-semibold text-gray-800 text-sm mb-1">
                {achievement.name}
              </div>
              {achievement.unlocked ? (
                <div className="text-xs text-green-600">
                  Unlocked {formatDate(achievement.date)}
                </div>
              ) : (
                <div className="text-xs text-gray-500">Locked</div>
              )}
            </div>
          ))}
        </div>

        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-purple-800">Achievement Progress</div>
              <div className="text-sm text-purple-600 mt-1">
                {DUMMY_ACHIEVEMENTS.filter(a => a.unlocked).length} / {DUMMY_ACHIEVEMENTS.length} Unlocked
              </div>
            </div>
            <div className="text-4xl">
              {Math.round((DUMMY_ACHIEVEMENTS.filter(a => a.unlocked).length / DUMMY_ACHIEVEMENTS.length) * 100)}%
            </div>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-3 mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
              style={{ 
                width: `${(DUMMY_ACHIEVEMENTS.filter(a => a.unlocked).length / DUMMY_ACHIEVEMENTS.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>

      {/* Engagement Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold mb-4">💡 Tips to Boost Your Engagement</h3>
        <div className="space-y-3">
          {[
            { icon: '📅', tip: 'Log in daily to maintain your streak and earn bonus points' },
            { icon: '🎯', tip: 'Set and update goals regularly to increase your engagement score' },
            { icon: '💰', tip: 'Review your transactions at least 3 times per week' },
            { icon: '📊', tip: 'Check your analytics dashboard to stay informed about your finances' },
            { icon: '🔔', tip: 'Enable notifications to never miss important updates' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-white p-3 rounded-lg">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-sm text-gray-700 flex-1">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Notes */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">🔧 Implementation Notes (Developer):</h4>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
          <li>Store user activity logs in Supabase 'activity_logs' table with timestamps</li>
          <li>Track feature usage events with Supabase Edge Functions</li>
          <li>Calculate engagement score using weighted algorithm</li>
          <li>Implement achievement system with unlocking logic</li>
          <li>Create daily cron job to check and update streaks</li>
          <li>Add gamification notifications for achievements and milestones</li>
          <li>Store achievement data in 'user_achievements' table</li>
          <li>Implement leaderboard for competitive users (optional)</li>
        </ul>
      </div>
    </div>
  );
};

export default UserEngagementAnalytics;
