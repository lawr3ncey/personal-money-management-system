import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 🔴 DUMMY DATA - Replace with Supabase queries later
const DUMMY_GOALS = [
  {
    id: 1,
    name: 'Emergency Fund',
    targetAmount: 150000,
    currentAmount: 67500,
    deadline: '2025-06-30',
    priority: 'high',
    icon: '🚨',
    color: '#EF4444',
    monthlyContribution: 5000,
    jarSource: 'Long-term Savings'
  },
  {
    id: 2,
    name: 'Vacation to Japan',
    targetAmount: 120000,
    currentAmount: 14400,
    deadline: '2025-12-15',
    priority: 'medium',
    icon: '✈️',
    color: '#EC4899',
    monthlyContribution: 8000,
    jarSource: 'Play'
  },
  {
    id: 3,
    name: 'New Laptop',
    targetAmount: 85000,
    currentAmount: 38250,
    deadline: '2025-08-30',
    priority: 'medium',
    icon: '💻',
    color: '#8B5CF6',
    monthlyContribution: 6000,
    jarSource: 'Long-term Savings'
  },
  {
    id: 4,
    name: 'Investment Capital',
    targetAmount: 200000,
    currentAmount: 52000,
    deadline: '2026-03-31',
    priority: 'high',
    icon: '📈',
    color: '#10B981',
    monthlyContribution: 10000,
    jarSource: 'Financial Freedom'
  },
  {
    id: 5,
    name: 'Online Course Bundle',
    targetAmount: 25000,
    currentAmount: 21750,
    deadline: '2025-02-28',
    priority: 'low',
    icon: '📚',
    color: '#06B6D4',
    monthlyContribution: 2500,
    jarSource: 'Education'
  }
];

const DUMMY_PROGRESS_HISTORY = [
  { month: 'Jul', amount: 45000 },
  { month: 'Aug', amount: 52000 },
  { month: 'Sep', amount: 61000 },
  { month: 'Oct', amount: 73000 },
  { month: 'Nov', amount: 85000 },
  { month: 'Dec', amount: 98000 },
];

const GoalProgressTracker = () => {
  const [selectedGoal, setSelectedGoal] = useState(DUMMY_GOALS[0]);

  // 🔴 TODO: Replace with actual Supabase query
  // const { data: goals } = useQuery('goals', fetchGoals);
  // const { data: progressHistory } = useQuery('goalProgress', fetchGoalProgress);

  const formatCurrency = (value) => {
    return `₱${value.toLocaleString()}`;
  };

  const calculateProgress = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const calculateDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateMonthsToCompletion = (current, target, monthlyContribution) => {
    const remaining = target - current;
    return Math.ceil(remaining / monthlyContribution);
  };

  const totalGoalsValue = DUMMY_GOALS.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrentAmount = DUMMY_GOALS.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const overallProgress = calculateProgress(totalCurrentAmount, totalGoalsValue);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">🎯 Goal Progress Tracker</h2>
        <p className="text-green-100">Track and achieve your financial goals</p>
      </div>

      {/* Overall Progress Summary */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">📊 Overall Goals Progress</h3>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-700 font-medium">Total Progress</span>
            <span className="text-xl font-bold text-primary-600">{overallProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{formatCurrency(totalCurrentAmount)} saved</span>
            <span>{formatCurrency(totalGoalsValue)} target</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">{DUMMY_GOALS.length}</div>
            <div className="text-sm text-gray-600">Active Goals</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">2</div>
            <div className="text-sm text-gray-600">On Track</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-3xl font-bold text-orange-600">3</div>
            <div className="text-sm text-gray-600">Needs Boost</div>
          </div>
        </div>
      </div>

      {/* Individual Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {DUMMY_GOALS.map((goal) => {
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
          const daysRemaining = calculateDaysRemaining(goal.deadline);
          const monthsNeeded = calculateMonthsToCompletion(
            goal.currentAmount, 
            goal.targetAmount, 
            goal.monthlyContribution
          );
          const isOnTrack = monthsNeeded <= Math.ceil(daysRemaining / 30);

          return (
            <div 
              key={goal.id} 
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-primary-300"
              onClick={() => setSelectedGoal(goal)}
            >
              {/* Goal Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{goal.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{goal.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        From: {goal.jarSource}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        goal.priority === 'high' ? 'bg-red-100 text-red-600' :
                        goal.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {goal.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`text-2xl ${isOnTrack ? 'text-green-500' : 'text-orange-500'}`}>
                  {isOnTrack ? '✅' : '⚠️'}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-lg font-bold" style={{ color: goal.color }}>
                    {progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${progress}%`,
                      backgroundColor: goal.color
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>{formatCurrency(goal.currentAmount)}</span>
                  <span>{formatCurrency(goal.targetAmount)}</span>
                </div>
              </div>

              {/* Goal Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <div className="text-xs text-gray-500">Days Remaining</div>
                  <div className="text-lg font-semibold text-gray-800">
                    {daysRemaining > 0 ? `${daysRemaining} days` : 'Overdue'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Monthly Saving</div>
                  <div className="text-lg font-semibold text-gray-800">
                    {formatCurrency(goal.monthlyContribution)}
                  </div>
                </div>
              </div>

              {/* Status Message */}
              <div className={`mt-4 p-3 rounded-lg text-sm ${
                isOnTrack 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-orange-50 text-orange-700'
              }`}>
                {isOnTrack ? (
                  <>✨ On track! Keep saving {formatCurrency(goal.monthlyContribution)}/month</>
                ) : (
                  <>⚡ Increase to {formatCurrency(Math.ceil((goal.targetAmount - goal.currentAmount) / Math.ceil(daysRemaining / 30)))}/month to meet deadline</>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed View for Selected Goal */}
      {selectedGoal && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>{selectedGoal.icon}</span>
            <span>Detailed Progress: {selectedGoal.name}</span>
          </h3>

          {/* Progress Chart */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-600 mb-3">6-Month Progress History</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={DUMMY_PROGRESS_HISTORY}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={formatCurrency} />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke={selectedGoal.color} 
                  strokeWidth={2}
                  dot={{ fill: selectedGoal.color, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Projections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-600 font-medium">At Current Rate</div>
              <div className="text-2xl font-bold text-blue-700">
                {calculateMonthsToCompletion(
                  selectedGoal.currentAmount,
                  selectedGoal.targetAmount,
                  selectedGoal.monthlyContribution
                )} months
              </div>
              <div className="text-xs text-blue-600 mt-1">To reach goal</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-green-600 font-medium">If Increased 50%</div>
              <div className="text-2xl font-bold text-green-700">
                {calculateMonthsToCompletion(
                  selectedGoal.currentAmount,
                  selectedGoal.targetAmount,
                  selectedGoal.monthlyContribution * 1.5
                )} months
              </div>
              <div className="text-xs text-green-600 mt-1">
                Save {formatCurrency(selectedGoal.monthlyContribution * 1.5)}/mo
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm text-purple-600 font-medium">Amount Remaining</div>
              <div className="text-2xl font-bold text-purple-700">
                {formatCurrency(selectedGoal.targetAmount - selectedGoal.currentAmount)}
              </div>
              <div className="text-xs text-purple-600 mt-1">
                {calculateProgress(selectedGoal.currentAmount, selectedGoal.targetAmount)}% complete
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition">
              💰 Add Contribution
            </button>
            <button className="flex-1 bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition">
              ⚙️ Adjust Goal
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              📊 Export
            </button>
          </div>
        </div>
      )}

      {/* Add New Goal Button */}
      <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-lg hover:from-green-600 hover:to-blue-600 transition shadow-lg flex items-center justify-center gap-2 text-lg font-semibold">
        <span>➕</span>
        <span>Add New Goal</span>
      </button>

      {/* Implementation Notes */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">🔧 Implementation Notes (Developer):</h4>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
          <li>Replace DUMMY_GOALS with Supabase query from 'savings_goals' table</li>
          <li>Replace DUMMY_PROGRESS_HISTORY with actual monthly snapshots</li>
          <li>Add "Add Contribution" modal to record deposits toward goals</li>
          <li>Implement "Adjust Goal" feature to modify target/deadline/monthly amount</li>
          <li>Link goals to specific jars for automatic allocation</li>
          <li>Add notifications when goal is reached or deadline is approaching</li>
        </ul>
      </div>
    </div>
  );
};

export default GoalProgressTracker;
