import React, { useState, useEffect } from 'react';

// 🔴 DUMMY DATA - Replace with Supabase queries later
const DEFAULT_JAR_PERCENTAGES = {
  necessities: 55,
  financial: 10,
  education: 10,
  longTerm: 10,
  play: 10,
  give: 5
};

const JAR_CONFIG = [
  { id: 'necessities', name: 'Necessities', icon: '🏠', color: '#3B82F6', description: 'Bills, rent, food, transport' },
  { id: 'financial', name: 'Financial Freedom', icon: '💰', color: '#10B981', description: 'Investments, passive income' },
  { id: 'education', name: 'Education', icon: '📚', color: '#8B5CF6', description: 'Courses, books, learning' },
  { id: 'longTerm', name: 'Long-term Savings', icon: '🎯', color: '#F59E0B', description: 'Emergency fund, big purchases' },
  { id: 'play', name: 'Play', icon: '🎮', color: '#EC4899', description: 'Entertainment, hobbies, fun' },
  { id: 'give', name: 'Give', icon: '❤️', color: '#EF4444', description: 'Charity, gifts, donations' }
];

const DUMMY_MONTHLY_INCOME = 35000;

const JarAdjustmentSimulator = () => {
  const [currentPercentages, setCurrentPercentages] = useState({ ...DEFAULT_JAR_PERCENTAGES });
  const [proposedPercentages, setProposedPercentages] = useState({ ...DEFAULT_JAR_PERCENTAGES });
  const [isSimulating, setIsSimulating] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState(DUMMY_MONTHLY_INCOME);

  // 🔴 TODO: Replace with actual Supabase query
  // const { data: userJarSettings } = useQuery('jarSettings', fetchJarSettings);
  // const { data: userIncome } = useQuery('userIncome', fetchUserIncome);

  const totalPercentage = Object.values(proposedPercentages).reduce((sum, val) => sum + val, 0);

  const handlePercentageChange = (jarId, value) => {
    const numValue = Math.max(0, Math.min(100, parseInt(value) || 0));
    setProposedPercentages(prev => ({
      ...prev,
      [jarId]: numValue
    }));
  };

  const calculateAmounts = (percentages, income) => {
    return Object.entries(percentages).reduce((acc, [key, percentage]) => {
      acc[key] = Math.round((income * percentage) / 100);
      return acc;
    }, {});
  };

  const currentAmounts = calculateAmounts(currentPercentages, monthlyIncome);
  const proposedAmounts = calculateAmounts(proposedPercentages, monthlyIncome);

  const calculateDifference = (jarId) => {
    return proposedAmounts[jarId] - currentAmounts[jarId];
  };

  const formatCurrency = (value) => {
    return `₱${value.toLocaleString()}`;
  };

  const resetToDefault = () => {
    setProposedPercentages({ ...DEFAULT_JAR_PERCENTAGES });
    setIsSimulating(false);
  };

  const applyChanges = () => {
    // 🔴 TODO: Save to Supabase
    // await updateJarPercentages(proposedPercentages);
    setCurrentPercentages({ ...proposedPercentages });
    setIsSimulating(false);
    alert('✅ Jar percentages updated successfully!\n\n🔴 This is a demo. In production, this will save to Supabase.');
  };

  const autoBalance = () => {
    const total = Object.values(proposedPercentages).reduce((sum, val) => sum + val, 0);
    if (total === 100) return;

    const difference = 100 - total;
    const largestJar = Object.entries(proposedPercentages).reduce((max, [key, val]) => 
      val > max[1] ? [key, val] : max
    , ['necessities', 0]);

    setProposedPercentages(prev => ({
      ...prev,
      [largestJar[0]]: prev[largestJar[0]] + difference
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">⚖️ Jar Adjustment Simulator</h2>
        <p className="text-purple-100">Simulate different jar allocations and see projected outcomes</p>
      </div>

      {/* Monthly Income Input */}
      <div className="bg-white p-6 rounded-lg shadow">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Monthly Income
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Math.max(0, parseInt(e.target.value) || 0))}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-lg font-semibold"
            placeholder="Enter your monthly income"
          />
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              isSimulating 
                ? 'bg-gray-500 text-white hover:bg-gray-600' 
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            {isSimulating ? '🔒 Lock' : '🔓 Start Simulating'}
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          💡 Adjust your monthly income to see how different amounts would be distributed across jars
        </p>
      </div>

      {/* Warning if total != 100% */}
      {totalPercentage !== 100 && (
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              <div>
                <div className="font-semibold text-orange-800">
                  Total: {totalPercentage}% (should be 100%)
                </div>
                <div className="text-sm text-orange-700">
                  {totalPercentage > 100 ? 'Reduce' : 'Increase'} by {Math.abs(100 - totalPercentage)}%
                </div>
              </div>
            </div>
            <button
              onClick={autoBalance}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm"
            >
              Auto-Balance
            </button>
          </div>
        </div>
      )}

      {/* Jar Sliders */}
      <div className="space-y-4">
        {JAR_CONFIG.map(jar => {
          const diff = calculateDifference(jar.id);
          const isIncreased = diff > 0;
          const isDecreased = diff < 0;

          return (
            <div key={jar.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{jar.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-800">{jar.name}</div>
                    <div className="text-xs text-gray-500">{jar.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold" style={{ color: jar.color }}>
                    {proposedPercentages[jar.id]}%
                  </div>
                  <div className="text-sm font-semibold text-gray-700">
                    {formatCurrency(proposedAmounts[jar.id])}
                  </div>
                </div>
              </div>

              {/* Slider */}
              <div className="mb-3">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={proposedPercentages[jar.id]}
                  onChange={(e) => handlePercentageChange(jar.id, e.target.value)}
                  disabled={!isSimulating}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${jar.color} 0%, ${jar.color} ${proposedPercentages[jar.id]}%, #e5e7eb ${proposedPercentages[jar.id]}%, #e5e7eb 100%)`
                  }}
                />
              </div>

              {/* Number Input */}
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={proposedPercentages[jar.id]}
                  onChange={(e) => handlePercentageChange(jar.id, e.target.value)}
                  disabled={!isSimulating}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-center font-semibold"
                />
                <span className="text-gray-500">%</span>

                {/* Difference Display */}
                {isSimulating && diff !== 0 && (
                  <div className={`flex-1 text-sm font-medium ${
                    isIncreased ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isIncreased ? '↑' : '↓'} {formatCurrency(Math.abs(diff))} 
                    ({isIncreased ? '+' : ''}{diff > 0 ? proposedPercentages[jar.id] - currentPercentages[jar.id] : -(currentPercentages[jar.id] - proposedPercentages[jar.id])}%)
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      {isSimulating && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">📊 Before vs After Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Jar</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Current</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Proposed</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Difference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {JAR_CONFIG.map(jar => {
                  const diff = calculateDifference(jar.id);
                  return (
                    <tr key={jar.id}>
                      <td className="px-4 py-3 flex items-center gap-2">
                        <span>{jar.icon}</span>
                        <span className="font-medium text-gray-800">{jar.name}</span>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600">
                        {formatCurrency(currentAmounts[jar.id])}
                        <span className="text-xs text-gray-400 ml-1">({currentPercentages[jar.id]}%)</span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold" style={{ color: jar.color }}>
                        {formatCurrency(proposedAmounts[jar.id])}
                        <span className="text-xs opacity-70 ml-1">({proposedPercentages[jar.id]}%)</span>
                      </td>
                      <td className={`px-4 py-3 text-right font-bold ${
                        diff > 0 ? 'text-green-600' : diff < 0 ? 'text-red-600' : 'text-gray-400'
                      }`}>
                        {diff > 0 ? '+' : ''}{formatCurrency(diff)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Projected Outcomes */}
      {isSimulating && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span>🔮</span>
            <span>Projected Outcomes (12 Months)</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {JAR_CONFIG.map(jar => {
              const monthlyAmount = proposedAmounts[jar.id];
              const yearlyAmount = monthlyAmount * 12;
              const diff = calculateDifference(jar.id) * 12;

              return (
                <div key={jar.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{jar.icon}</span>
                    <span className="font-semibold text-gray-800">{jar.name}</span>
                  </div>
                  <div className="text-2xl font-bold" style={{ color: jar.color }}>
                    {formatCurrency(yearlyAmount)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Per year ({formatCurrency(monthlyAmount)}/month)
                  </div>
                  {diff !== 0 && (
                    <div className={`text-sm font-medium mt-2 ${
                      diff > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {diff > 0 ? '↑' : '↓'} {formatCurrency(Math.abs(diff))} vs current
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {isSimulating && (
        <div className="flex gap-3">
          <button
            onClick={applyChanges}
            disabled={totalPercentage !== 100}
            className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-lg hover:from-green-600 hover:to-blue-600 transition shadow-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✅ Apply Changes
          </button>
          <button
            onClick={resetToDefault}
            className="flex-1 bg-gray-500 text-white py-4 rounded-lg hover:bg-gray-600 transition shadow-lg font-semibold"
          >
            🔄 Reset to Default
          </button>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">💡 Smart Recommendations</h3>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="font-semibold text-blue-700 mb-1">🏠 High Fixed Costs?</div>
            <p className="text-sm text-blue-600">
              If your rent/bills are high, consider increasing Necessities to 60-65% and reduce Play to 5-7%.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="font-semibold text-green-700 mb-1">📈 Building Wealth?</div>
            <p className="text-sm text-green-600">
              Increase Financial Freedom to 15-20% if you're focused on investments and passive income.
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="font-semibold text-purple-700 mb-1">📚 Learning New Skills?</div>
            <p className="text-sm text-purple-600">
              Boost Education to 15% temporarily while taking courses or pursuing certifications.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="font-semibold text-orange-700 mb-1">🎯 Saving for Big Goal?</div>
            <p className="text-sm text-orange-600">
              Increase Long-term Savings to 15-20% if saving for house down payment or car.
            </p>
          </div>
        </div>
      </div>

      {/* Implementation Notes */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">🔧 Implementation Notes (Developer):</h4>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
          <li>Load current jar percentages from Supabase user_settings table</li>
          <li>Save updated percentages to Supabase when "Apply Changes" is clicked</li>
          <li>Add confirmation modal before applying changes</li>
          <li>Store simulation history for undo functionality</li>
          <li>Add preset templates (e.g., "Aggressive Saver", "Balanced", "High Earner")</li>
          <li>Show impact on existing goals when percentages change</li>
        </ul>
      </div>
    </div>
  );
};

export default JarAdjustmentSimulator;
