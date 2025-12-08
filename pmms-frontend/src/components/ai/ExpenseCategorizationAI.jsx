import React, { useState } from 'react';

// 🔴 DUMMY DATA - Replace with Supabase queries later
const DUMMY_UNCATEGORIZED_TRANSACTIONS = [
  { id: 1, description: 'Jollibee SM North', amount: 350, date: '2024-12-28', merchant: 'Jollibee' },
  { id: 2, description: 'Grab Ride to Office', amount: 185, date: '2024-12-28', merchant: 'Grab' },
  { id: 3, description: 'Netflix Monthly', amount: 549, date: '2024-12-27', merchant: 'Netflix' },
  { id: 4, description: 'Mercury Drug Vitamins', amount: 1250, date: '2024-12-27', merchant: 'Mercury Drug' },
  { id: 5, description: 'Goldilocks Cake', amount: 680, date: '2024-12-26', merchant: 'Goldilocks' },
  { id: 6, description: 'Shell Gas Station', amount: 1800, date: '2024-12-26', merchant: 'Shell' },
  { id: 7, description: 'SM Cinema Tickets', amount: 500, date: '2024-12-25', merchant: 'SM Cinema' },
  { id: 8, description: 'Lazada Online Shopping', amount: 3500, date: '2024-12-25', merchant: 'Lazada' },
];

const DUMMY_CATEGORIZED_TRANSACTIONS = [
  { id: 101, description: 'Electric Bill Payment', amount: 2500, category: 'Necessities', jar: 'Necessities', confidence: 98 },
  { id: 102, description: 'Udemy Course Purchase', amount: 1200, category: 'Education', jar: 'Education', confidence: 95 },
  { id: 103, description: 'Movie Date Night', amount: 1500, category: 'Entertainment', jar: 'Play', confidence: 92 },
  { id: 104, description: 'Emergency Fund Deposit', amount: 5000, category: 'Savings', jar: 'Long-term Savings', confidence: 100 },
];

// AI Categorization Rules (dummy logic)
const CATEGORIZATION_RULES = {
  'Jollibee': { jar: 'Necessities', category: 'Food & Dining', confidence: 90 },
  'Grab': { jar: 'Necessities', category: 'Transportation', confidence: 95 },
  'Netflix': { jar: 'Play', category: 'Entertainment', confidence: 98 },
  'Spotify': { jar: 'Play', category: 'Entertainment', confidence: 98 },
  'Mercury Drug': { jar: 'Necessities', category: 'Healthcare', confidence: 85 },
  'Goldilocks': { jar: 'Play', category: 'Food & Dining', confidence: 75 },
  'Shell': { jar: 'Necessities', category: 'Transportation', confidence: 92 },
  'SM Cinema': { jar: 'Play', category: 'Entertainment', confidence: 95 },
  'Lazada': { jar: 'Play', category: 'Shopping', confidence: 60 },
  'Udemy': { jar: 'Education', category: 'Courses', confidence: 98 },
  'Electric': { jar: 'Necessities', category: 'Utilities', confidence: 100 },
  'Water': { jar: 'Necessities', category: 'Utilities', confidence: 100 },
  'Internet': { jar: 'Necessities', category: 'Utilities', confidence: 100 },
};

const JAR_CONFIG = {
  'Necessities': { icon: '🏠', color: '#3B82F6' },
  'Financial Freedom': { icon: '💰', color: '#10B981' },
  'Education': { icon: '📚', color: '#8B5CF6' },
  'Long-term Savings': { icon: '🎯', color: '#F59E0B' },
  'Play': { icon: '🎮', color: '#EC4899' },
  'Give': { icon: '❤️', color: '#EF4444' },
};

const ExpenseCategorizationAI = () => {
  const [uncategorizedTxns, setUncategorizedTxns] = useState(DUMMY_UNCATEGORIZED_TRANSACTIONS);
  const [categorizedTxns, setCategorizedTxns] = useState(DUMMY_CATEGORIZED_TRANSACTIONS);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // 🔴 TODO: Replace with actual Supabase query
  // const { data: transactions } = useQuery('uncategorizedTransactions', fetchUncategorized);
  // const { mutate: categorizeTransaction } = useMutation(categorizeAndSave);

  const formatCurrency = (value) => {
    return `₱${value.toLocaleString()}`;
  };

  // Dummy AI categorization logic
  const suggestCategory = (transaction) => {
    const description = transaction.description.toLowerCase();
    const merchant = transaction.merchant?.toLowerCase() || '';

    // Check against rules
    for (const [key, rule] of Object.entries(CATEGORIZATION_RULES)) {
      if (description.includes(key.toLowerCase()) || merchant.includes(key.toLowerCase())) {
        return rule;
      }
    }

    // Default fallback
    if (description.includes('food') || description.includes('restaurant')) {
      return { jar: 'Necessities', category: 'Food & Dining', confidence: 70 };
    }
    if (description.includes('transport') || description.includes('ride')) {
      return { jar: 'Necessities', category: 'Transportation', confidence: 75 };
    }
    if (description.includes('movie') || description.includes('game')) {
      return { jar: 'Play', category: 'Entertainment', confidence: 80 };
    }

    return { jar: 'Necessities', category: 'Other', confidence: 50 };
  };

  const autoCategorizeAll = () => {
    setIsProcessing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const newlyCategorized = uncategorizedTxns.map(txn => {
        const suggestion = suggestCategory(txn);
        return {
          ...txn,
          jar: suggestion.jar,
          category: suggestion.category,
          confidence: suggestion.confidence
        };
      });

      setCategorizedTxns([...categorizedTxns, ...newlyCategorized]);
      setUncategorizedTxns([]);
      setIsProcessing(false);
      
      alert(`✅ Categorized ${newlyCategorized.length} transactions!\n\n🔴 This is a demo. In production, this will:\n- Use AI/ML to analyze patterns\n- Save to Supabase\n- Update jar balances\n- Learn from your corrections`);
    }, 2000);
  };

  const categorizeSingle = (txn) => {
    const suggestion = suggestCategory(txn);
    
    const categorized = {
      ...txn,
      jar: suggestion.jar,
      category: suggestion.category,
      confidence: suggestion.confidence
    };

    setCategorizedTxns([...categorizedTxns, categorized]);
    setUncategorizedTxns(uncategorizedTxns.filter(t => t.id !== txn.id));
    setSelectedTxn(null);
  };

  const manualCategorize = (txn, jar, category) => {
    const categorized = {
      ...txn,
      jar,
      category,
      confidence: 100 // Manual categorization is 100% confident
    };

    // 🔴 TODO: Save this as a learning example for AI
    setCategorizedTxns([...categorizedTxns, categorized]);
    setUncategorizedTxns(uncategorizedTxns.filter(t => t.id !== txn.id));
    setSelectedTxn(null);
  };

  const recategorize = (txn, newJar) => {
    setCategorizedTxns(categorizedTxns.map(t => 
      t.id === txn.id ? { ...t, jar: newJar, confidence: 100 } : t
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">🤖 AI Expense Categorization</h2>
        <p className="text-blue-100">Automatically categorize transactions into your 6 jars</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Uncategorized</div>
          <div className="text-3xl font-bold text-orange-600">{uncategorizedTxns.length}</div>
          <div className="text-xs text-gray-500 mt-1">Needs review</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm">Categorized</div>
          <div className="text-3xl font-bold text-green-600">{categorizedTxns.length}</div>
          <div className="text-xs text-gray-500 mt-1">Ready to save</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-gray-600 text-sm">AI Accuracy</div>
          <div className="text-3xl font-bold text-blue-600">92%</div>
          <div className="text-xs text-gray-500 mt-1">Based on your patterns</div>
        </div>
      </div>

      {/* Auto-Categorize Button */}
      {uncategorizedTxns.length > 0 && (
        <button
          onClick={autoCategorizeAll}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-lg hover:from-blue-600 hover:to-purple-600 transition shadow-lg flex items-center justify-center gap-2 text-lg font-semibold disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <span className="animate-spin">⚙️</span>
              <span>Processing with AI...</span>
            </>
          ) : (
            <>
              <span>✨</span>
              <span>Auto-Categorize All ({uncategorizedTxns.length})</span>
            </>
          )}
        </button>
      )}

      {/* Uncategorized Transactions */}
      {uncategorizedTxns.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">🔍 Needs Categorization</h3>
          <div className="space-y-3">
            {uncategorizedTxns.map(txn => {
              const suggestion = suggestCategory(txn);
              const jarConfig = JAR_CONFIG[suggestion.jar];

              return (
                <div key={txn.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{txn.description}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(txn.date).toLocaleDateString()} • {txn.merchant}
                      </div>
                    </div>
                    <div className="text-xl font-bold text-gray-800">{formatCurrency(txn.amount)}</div>
                  </div>

                  {/* AI Suggestion */}
                  <div className="bg-blue-50 p-3 rounded-lg mb-3 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{jarConfig.icon}</span>
                        <div>
                          <div className="font-semibold text-blue-800">
                            AI Suggests: {suggestion.jar}
                          </div>
                          <div className="text-xs text-blue-600">
                            {suggestion.category} • {suggestion.confidence}% confident
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => categorizeSingle(txn)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                        >
                          ✓ Accept
                        </button>
                        <button
                          onClick={() => setSelectedTxn(txn)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm"
                        >
                          ✏️ Edit
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Manual Selection (when Edit is clicked) */}
                  {selectedTxn?.id === txn.id && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                      {Object.entries(JAR_CONFIG).map(([jarName, config]) => (
                        <button
                          key={jarName}
                          onClick={() => manualCategorize(txn, jarName, 'Manual')}
                          className="p-3 border-2 border-gray-200 rounded-lg hover:border-primary-500 transition flex items-center gap-2"
                        >
                          <span className="text-2xl">{config.icon}</span>
                          <span className="text-sm font-medium">{jarName}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Categorized Transactions */}
      {categorizedTxns.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">✅ Categorized Transactions</h3>
          <div className="space-y-2">
            {categorizedTxns.map(txn => {
              const jarConfig = JAR_CONFIG[txn.jar];
              
              return (
                <div key={txn.id} className="p-4 bg-gray-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">{jarConfig.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{txn.description}</div>
                      <div className="text-sm text-gray-500">
                        <span className="font-semibold" style={{ color: jarConfig.color }}>
                          {txn.jar}
                        </span>
                        {' • '}
                        {txn.category}
                        {' • '}
                        <span className={txn.confidence === 100 ? 'text-green-600' : 'text-blue-600'}>
                          {txn.confidence}% {txn.confidence === 100 ? '(Manual)' : '(AI)'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-800">{formatCurrency(txn.amount)}</div>
                    <button
                      onClick={() => {
                        const newJar = prompt('Change jar to:', txn.jar);
                        if (newJar && JAR_CONFIG[newJar]) {
                          recategorize(txn, newJar);
                        }
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Change
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold">
            💾 Save All to Jars
          </button>
        </div>
      )}

      {/* Learning Stats */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-lg font-semibold mb-4">📊 AI Learning Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">1,247</div>
            <div className="text-sm text-gray-600">Transactions Learned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">85</div>
            <div className="text-sm text-gray-600">Merchants Recognized</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">92%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">38</div>
            <div className="text-sm text-gray-600">Corrections Made</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg">
          <div className="font-semibold text-gray-800 mb-2">🧠 How AI Learns:</div>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>Analyzes merchant names and transaction descriptions</li>
            <li>Learns from your manual categorizations</li>
            <li>Identifies spending patterns over time</li>
            <li>Improves accuracy with each correction you make</li>
          </ul>
        </div>
      </div>

      {/* Common Patterns */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">🔄 Your Spending Patterns</h3>
        <div className="space-y-3">
          {[
            { merchant: 'Jollibee', jar: 'Necessities', count: 45, avgAmount: 320 },
            { merchant: 'Grab', jar: 'Necessities', count: 78, avgAmount: 165 },
            { merchant: 'Netflix', jar: 'Play', count: 12, avgAmount: 549 },
            { merchant: 'Mercury Drug', jar: 'Necessities', count: 8, avgAmount: 850 },
          ].map((pattern, idx) => {
            const jarConfig = JAR_CONFIG[pattern.jar];
            return (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{jarConfig.icon}</span>
                  <div>
                    <div className="font-medium text-gray-800">{pattern.merchant}</div>
                    <div className="text-xs text-gray-500">
                      Always goes to <span style={{ color: jarConfig.color }} className="font-semibold">{pattern.jar}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-800">{pattern.count}x</div>
                  <div className="text-xs text-gray-500">Avg: {formatCurrency(pattern.avgAmount)}</div>
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
          <li>Replace DUMMY_UNCATEGORIZED_TRANSACTIONS with Supabase query for uncategorized transactions</li>
          <li>Implement actual ML model or use OpenAI API for categorization</li>
          <li>Store categorization rules in Supabase 'categorization_rules' table</li>
          <li>Save user corrections to improve AI accuracy over time</li>
          <li>Add batch processing for large CSV imports</li>
          <li>Implement merchant recognition and fuzzy matching</li>
          <li>Add confidence threshold settings (auto-accept if {'>'} 90%)</li>
        </ul>
      </div>
    </div>
  );
};

export default ExpenseCategorizationAI;
