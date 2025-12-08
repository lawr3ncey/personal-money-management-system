import React, { useState, useEffect } from 'react';

// 🔴 DUMMY DATA - Achievement definitions
const ACHIEVEMENTS = [
  { id: 1, name: 'First Steps', icon: '👣', description: 'Create your first jar', condition: 'jars_created', target: 1, unlocked: true },
  { id: 2, name: 'Getting Started', icon: '🎯', description: 'Record your first transaction', condition: 'transactions', target: 1, unlocked: true },
  { id: 3, name: 'Consistent Saver', icon: '📅', description: 'Save for 7 consecutive days', condition: 'streak', target: 7, unlocked: true },
  { id: 4, name: 'Money Manager', icon: '💼', description: 'Complete 50 transactions', condition: 'transactions', target: 50, unlocked: false, progress: 47 },
  { id: 5, name: 'Goal Achiever', icon: '🏆', description: 'Reach your first savings goal', condition: 'goals_reached', target: 1, unlocked: false, progress: 0 },
  { id: 6, name: 'Discipline Master', icon: '🥋', description: 'Save for 30 consecutive days', condition: 'streak', target: 30, unlocked: false, progress: 12 },
  { id: 7, name: 'Wealthy Mind', icon: '🧠', description: 'Accumulate ₱100,000 in savings', condition: 'total_savings', target: 100000, unlocked: false, progress: 61000 },
  { id: 8, name: 'Budget Pro', icon: '📊', description: 'Create 5 monthly budgets', condition: 'budgets_created', target: 5, unlocked: false, progress: 2 },
  { id: 9, name: 'Generous Soul', icon: '❤️', description: 'Give away ₱10,000', condition: 'give_jar', target: 10000, unlocked: false, progress: 2000 },
  { id: 10, name: 'Century Club', icon: '💯', description: 'Complete 100 transactions', condition: 'transactions', target: 100, unlocked: false, progress: 47 },
  { id: 11, name: 'Marathon Saver', icon: '🏃', description: 'Save for 90 consecutive days', condition: 'streak', target: 90, unlocked: false, progress: 12 },
  { id: 12, name: 'Millionaire Mindset', icon: '💎', description: 'Accumulate ₱1,000,000 in savings', condition: 'total_savings', target: 1000000, unlocked: false, progress: 61000 },
  { id: 13, name: 'Goal Master', icon: '🎖️', description: 'Achieve 5 savings goals', condition: 'goals_reached', target: 5, unlocked: false, progress: 0 },
  { id: 14, name: 'Education Champion', icon: '🎓', description: 'Save ₱50,000 in Education jar', condition: 'education_jar', target: 50000, unlocked: false, progress: 5000 },
  { id: 15, name: 'Investment Pioneer', icon: '📈', description: 'Save ₱100,000 in Financial jar', condition: 'financial_jar', target: 100000, unlocked: false, progress: 8000 }
];

// 🔴 DUMMY USER STATS
const DUMMY_USER_STATS = {
  totalBadges: 15,
  unlockedBadges: 3,
  inProgressBadges: 12,
  completionRate: 20
};

const AchievementBadges = () => {
  const [achievements, setAchievements] = useState(ACHIEVEMENTS);
  const [filter, setFilter] = useState('all'); // all, unlocked, locked
  const [showDetail, setShowDetail] = useState(null);
  const [recentlyUnlocked, setRecentlyUnlocked] = useState(null);

  useEffect(() => {
    // 🔴 TODO: Load achievements from Supabase user_achievements
    const savedAchievements = localStorage.getItem('achievements');
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
  }, []);

  const filteredAchievements = achievements.filter(badge => {
    if (filter === 'unlocked') return badge.unlocked;
    if (filter === 'locked') return !badge.unlocked;
    return true;
  });

  const getProgressPercentage = (badge) => {
    if (badge.unlocked) return 100;
    if (!badge.progress) return 0;
    return Math.min((badge.progress / badge.target) * 100, 100);
  };

  const shareAchievement = (badge) => {
    const text = `🏆 I just unlocked the "${badge.name}" badge in my Money Management journey! ${badge.icon}`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Achievement copied to clipboard!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800">🏆 Achievements</h3>
          <p className="text-sm text-gray-600">
            {DUMMY_USER_STATS.unlockedBadges} of {DUMMY_USER_STATS.totalBadges} unlocked
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-purple-600">
            {DUMMY_USER_STATS.completionRate}%
          </div>
          <div className="text-xs text-gray-500">Complete</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all"
            style={{ width: `${DUMMY_USER_STATS.completionRate}%` }}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'unlocked', 'locked'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
              filter === tab
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab === 'all' ? 'All' : tab === 'unlocked' ? 'Unlocked' : 'Locked'}
          </button>
        ))}
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-3 gap-4">
        {filteredAchievements.map(badge => {
          const progress = getProgressPercentage(badge);
          
          return (
            <div
              key={badge.id}
              onClick={() => setShowDetail(badge)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition hover:scale-105 ${
                badge.unlocked
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-400'
                  : 'bg-gray-50 border-gray-300 opacity-70'
              }`}
            >
              <div className="text-center">
                <div className={`text-5xl mb-2 ${!badge.unlocked && 'grayscale opacity-50'}`}>
                  {badge.icon}
                </div>
                <h4 className="font-bold text-sm text-gray-800 mb-1">
                  {badge.name}
                </h4>
                {!badge.unlocked && badge.progress !== undefined && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-purple-500 h-1.5 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {badge.progress} / {badge.target}
                    </p>
                  </div>
                )}
                {badge.unlocked && (
                  <div className="text-xs text-green-600 font-semibold mt-1">
                    ✓ Unlocked
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Achievement Detail Modal */}
      {showDetail && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowDetail(null)}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className={`text-8xl mb-4 ${!showDetail.unlocked && 'grayscale opacity-50'}`}>
                {showDetail.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {showDetail.name}
              </h3>
              <p className="text-gray-600 mb-6">
                {showDetail.description}
              </p>

              {showDetail.unlocked ? (
                <>
                  <div className="bg-green-50 text-green-600 py-3 rounded-lg font-semibold mb-4">
                    ✅ Achievement Unlocked!
                  </div>
                  <button
                    onClick={() => shareAchievement(showDetail)}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
                  >
                    📤 Share Achievement
                  </button>
                </>
              ) : (
                <>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-purple-600">
                        {showDetail.progress || 0} / {showDetail.target}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${getProgressPercentage(showDetail)}%` }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetail(null)}
                    className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementBadges;

// 🔴 IMPLEMENTATION NOTES:
// - Create achievements and user_achievements tables in Supabase
// - Track user progress in real-time as they use the app
// - Add celebration animation when badge is unlocked
// - Implement push notifications for new achievements
// - Add leaderboard to compare with other users
