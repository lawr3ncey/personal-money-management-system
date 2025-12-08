import React, { useState, useEffect } from 'react';

// 🔴 DUMMY DATA - Replace with Supabase queries later
const DUMMY_TIPS = [
  {
    id: 1,
    title: 'Cook at Home More Often',
    description: 'Eating out can cost 3-5x more than home-cooked meals. Plan your meals weekly and batch cook to save time and money.',
    category: 'Food & Dining',
    jar: 'Necessities',
    potentialSavings: 3000,
    difficulty: 'Easy',
    icon: '🍳',
    impact: 'High',
    timeframe: 'Monthly'
  },
  {
    id: 2,
    title: 'Use Public Transport',
    description: 'Switch from Grab/private cars to jeepney or MRT when possible. Can save ₱100-300 per day on transportation.',
    category: 'Transportation',
    jar: 'Necessities',
    potentialSavings: 5000,
    difficulty: 'Medium',
    icon: '🚌',
    impact: 'High',
    timeframe: 'Monthly'
  },
  {
    id: 3,
    title: 'Cancel Unused Subscriptions',
    description: 'Review all monthly subscriptions. Netflix, Spotify, gym memberships you don\'t use add up quickly.',
    category: 'Entertainment',
    jar: 'Play',
    potentialSavings: 1500,
    difficulty: 'Easy',
    icon: '❌',
    impact: 'Medium',
    timeframe: 'Monthly'
  },
  {
    id: 4,
    title: 'Buy Generic Brands',
    description: 'Generic medicines and products are 30-50% cheaper than branded ones with same quality.',
    category: 'Shopping',
    jar: 'Necessities',
    potentialSavings: 2000,
    difficulty: 'Easy',
    icon: '🏷️',
    impact: 'Medium',
    timeframe: 'Monthly'
  },
  {
    id: 5,
    title: 'Energy-Saving Habits',
    description: 'Unplug appliances, use LED bulbs, and optimize AC usage. Can reduce electric bills by 20-30%.',
    category: 'Utilities',
    jar: 'Necessities',
    potentialSavings: 800,
    difficulty: 'Easy',
    icon: '💡',
    impact: 'Medium',
    timeframe: 'Monthly'
  },
  {
    id: 6,
    title: 'Wait 24 Hours Before Buying',
    description: 'Implement the 24-hour rule for non-essential purchases to avoid impulse buying.',
    category: 'Shopping',
    jar: 'Play',
    potentialSavings: 4000,
    difficulty: 'Medium',
    icon: '⏰',
    impact: 'High',
    timeframe: 'Monthly'
  },
  {
    id: 7,
    title: 'Pack Your Lunch',
    description: 'Bringing baon to work saves ₱100-200 per day compared to buying lunch.',
    category: 'Food & Dining',
    jar: 'Necessities',
    potentialSavings: 3500,
    difficulty: 'Medium',
    icon: '🍱',
    impact: 'High',
    timeframe: 'Monthly'
  },
  {
    id: 8,
    title: 'Automate Your Savings',
    description: 'Set up automatic transfers to savings account on payday. Pay yourself first principle.',
    category: 'Savings',
    jar: 'Long-term Savings',
    potentialSavings: 0,
    difficulty: 'Easy',
    icon: '💰',
    impact: 'High',
    timeframe: 'Long-term'
  },
  {
    id: 9,
    title: 'Learn Free Skills Online',
    description: 'Use free resources like YouTube, Khan Academy, or free Coursera courses instead of paid ones.',
    category: 'Education',
    jar: 'Education',
    potentialSavings: 2000,
    difficulty: 'Easy',
    icon: '📚',
    impact: 'Medium',
    timeframe: 'Monthly'
  },
  {
    id: 10,
    title: 'Buy in Bulk',
    description: 'Rice, canned goods, and toiletries are cheaper when bought in bulk from S&R or Landers.',
    category: 'Shopping',
    jar: 'Necessities',
    potentialSavings: 1500,
    difficulty: 'Medium',
    icon: '📦',
    impact: 'Medium',
    timeframe: 'Monthly'
  },
  {
    id: 11,
    title: 'Use Cashback Apps',
    description: 'Use GCash promos, credit card rewards, and cashback apps for everyday purchases.',
    category: 'Shopping',
    jar: 'Financial Freedom',
    potentialSavings: 500,
    difficulty: 'Easy',
    icon: '💳',
    impact: 'Low',
    timeframe: 'Monthly'
  },
  {
    id: 12,
    title: 'Fix Instead of Replace',
    description: 'Repair broken items instead of buying new ones. Shoes, bags, electronics can often be fixed cheaply.',
    category: 'Shopping',
    jar: 'Necessities',
    potentialSavings: 2500,
    difficulty: 'Medium',
    icon: '🔧',
    impact: 'Medium',
    timeframe: 'Yearly'
  },
];

const JAR_CONFIG = {
  'Necessities': { icon: '🏠', color: '#3B82F6' },
  'Financial Freedom': { icon: '💰', color: '#10B981' },
  'Education': { icon: '📚', color: '#8B5CF6' },
  'Long-term Savings': { icon: '🎯', color: '#F59E0B' },
  'Play': { icon: '🎮', color: '#EC4899' },
  'Give': { icon: '❤️', color: '#EF4444' },
};

const CATEGORIES = ['All', 'Food & Dining', 'Transportation', 'Shopping', 'Utilities', 'Entertainment', 'Savings', 'Education'];
const DIFFICULTY_LEVELS = ['All', 'Easy', 'Medium', 'Hard'];

const SavingsTipsLibrary = () => {
  const [tips, setTips] = useState(DUMMY_TIPS);
  const [filteredTips, setFilteredTips] = useState(DUMMY_TIPS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [bookmarkedTips, setBookmarkedTips] = useState([]);
  const [dailyTip, setDailyTip] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // 🔴 TODO: Replace with actual Supabase query
  // const { data: tips } = useQuery('savingsTips', fetchTips);
  // const { data: userBookmarks } = useQuery('bookmarks', fetchUserBookmarks);

  useEffect(() => {
    // Set daily tip (random)
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setDailyTip(randomTip);
  }, []);

  useEffect(() => {
    // Filter tips based on selections
    let filtered = tips;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(tip => tip.category === selectedCategory);
    }

    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(tip => tip.difficulty === selectedDifficulty);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(tip => 
        tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTips(filtered);
  }, [selectedCategory, selectedDifficulty, searchQuery, tips]);

  const formatCurrency = (value) => {
    return `₱${value.toLocaleString()}`;
  };

  const toggleBookmark = (tipId) => {
    if (bookmarkedTips.includes(tipId)) {
      setBookmarkedTips(bookmarkedTips.filter(id => id !== tipId));
    } else {
      setBookmarkedTips([...bookmarkedTips, tipId]);
    }
    // 🔴 TODO: Save to Supabase user_bookmarks table
  };

  const isBookmarked = (tipId) => bookmarkedTips.includes(tipId);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const calculateTotalSavings = () => {
    return filteredTips.reduce((sum, tip) => sum + tip.potentialSavings, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">💡 Savings Tips Library</h2>
        <p className="text-green-100">Practical tips to maximize your 6 Jars savings potential</p>
      </div>

      {/* Daily Tip Spotlight */}
      {dailyTip && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border-2 border-yellow-300 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">⭐</span>
            <h3 className="text-xl font-bold text-yellow-800">Tip of the Day</h3>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-start gap-4">
              <span className="text-4xl">{dailyTip.icon}</span>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{dailyTip.title}</h4>
                <p className="text-gray-600 mb-3">{dailyTip.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className={`px-3 py-1 rounded-full border ${getDifficultyColor(dailyTip.difficulty)}`}>
                    {dailyTip.difficulty}
                  </span>
                  {dailyTip.potentialSavings > 0 && (
                    <span className="font-semibold text-green-600">
                      💰 Save up to {formatCurrency(dailyTip.potentialSavings)}/{dailyTip.timeframe}
                    </span>
                  )}
                  <span className={`font-semibold ${getImpactColor(dailyTip.impact)}`}>
                    {dailyTip.impact} Impact
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Total Tips Available</div>
          <div className="text-3xl font-bold text-blue-600">{tips.length}</div>
          <div className="text-xs text-gray-500 mt-1">Across all categories</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Potential Monthly Savings</div>
          <div className="text-3xl font-bold text-green-600">{formatCurrency(calculateTotalSavings())}</div>
          <div className="text-xs text-gray-500 mt-1">If all tips implemented</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Bookmarked Tips</div>
          <div className="text-3xl font-bold text-purple-600">{bookmarkedTips.length}</div>
          <div className="text-xs text-gray-500 mt-1">Your favorites</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          {/* Search Bar */}
          <div>
            <input
              type="text"
              placeholder="🔍 Search tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg border-2 transition ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Difficulty Level</label>
            <div className="flex flex-wrap gap-2">
              {DIFFICULTY_LEVELS.map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedDifficulty(level)}
                  className={`px-4 py-2 rounded-lg border-2 transition ${
                    selectedDifficulty === level
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTips.map(tip => {
          const jarConfig = JAR_CONFIG[tip.jar];
          return (
            <div key={tip.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              {/* Tip Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{tip.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{tip.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{tip.category}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs" style={{ color: jarConfig.color }}>
                        {jarConfig.icon} {tip.jar}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleBookmark(tip.id)}
                  className="text-2xl hover:scale-110 transition"
                >
                  {isBookmarked(tip.id) ? '⭐' : '☆'}
                </button>
              </div>

              {/* Tip Description */}
              <p className="text-gray-600 text-sm mb-4">{tip.description}</p>

              {/* Tip Metadata */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs border ${getDifficultyColor(tip.difficulty)}`}>
                    {tip.difficulty}
                  </span>
                  <span className={`text-xs font-semibold ${getImpactColor(tip.impact)}`}>
                    {tip.impact} Impact
                  </span>
                </div>
                {tip.potentialSavings > 0 && (
                  <div className="text-right">
                    <div className="text-sm font-bold text-green-600">
                      {formatCurrency(tip.potentialSavings)}
                    </div>
                    <div className="text-xs text-gray-500">{tip.timeframe}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredTips.length === 0 && (
        <div className="bg-gray-50 p-12 rounded-lg text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tips Found</h3>
          <p className="text-gray-500">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Personalized Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold mb-4">🎯 Personalized for You</h3>
        <p className="text-gray-700 mb-4">
          Based on your spending patterns, here are tips that could help you the most:
        </p>
        <div className="space-y-3">
          {[
            { tip: 'You spend ₱8,000/month on food. Try "Cook at Home" and "Pack Your Lunch"', savings: 6500 },
            { tip: 'Your transportation costs are ₱5,000/month. Consider "Use Public Transport"', savings: 5000 },
            { tip: 'You have 4 active subscriptions. Review with "Cancel Unused Subscriptions"', savings: 1500 },
          ].map((rec, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-700">{rec.tip}</p>
              </div>
              <div className="text-right ml-4">
                <div className="text-sm font-bold text-green-600">
                  Save {formatCurrency(rec.savings)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Notes */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">🔧 Implementation Notes (Developer):</h4>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
          <li>Replace DUMMY_TIPS with Supabase 'savings_tips' table</li>
          <li>Store user bookmarks in 'user_bookmarks' table with user_id and tip_id</li>
          <li>Implement personalized recommendations based on user's transaction history</li>
          <li>Add ability for users to mark tips as "Implemented" and track their actual savings</li>
          <li>Create admin panel to add/edit tips</li>
          <li>Add user-submitted tips feature</li>
          <li>Implement tip rating/feedback system</li>
        </ul>
      </div>
    </div>
  );
};

export default SavingsTipsLibrary;
