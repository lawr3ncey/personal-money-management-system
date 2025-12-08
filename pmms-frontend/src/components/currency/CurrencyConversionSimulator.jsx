import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 🔴 DUMMY DATA - Exchange rates (would be from API in production)
const DUMMY_EXCHANGE_RATES = {
  PHP: 1.0,      // Base currency
  USD: 0.018,    // 1 PHP = 0.018 USD
  EUR: 0.017,    // 1 PHP = 0.017 EUR
  JPY: 2.65,     // 1 PHP = 2.65 JPY
  SGD: 0.024,    // 1 PHP = 0.024 SGD
  GBP: 0.014,    // 1 PHP = 0.014 GBP
  AUD: 0.028,    // 1 PHP = 0.028 AUD
  CNY: 0.13,     // 1 PHP = 0.13 CNY
  KRW: 24.5,     // 1 PHP = 24.5 KRW
  THB: 0.62,     // 1 PHP = 0.62 THB
};

// Historical rate trends (dummy data for 6 months)
const DUMMY_RATE_HISTORY = {
  USD: [
    { month: 'Jul', rate: 0.0175 },
    { month: 'Aug', rate: 0.0176 },
    { month: 'Sep', rate: 0.0179 },
    { month: 'Oct', rate: 0.0178 },
    { month: 'Nov', rate: 0.0180 },
    { month: 'Dec', rate: 0.0180 },
  ],
  EUR: [
    { month: 'Jul', rate: 0.0165 },
    { month: 'Aug', rate: 0.0168 },
    { month: 'Sep', rate: 0.0170 },
    { month: 'Oct', rate: 0.0169 },
    { month: 'Nov', rate: 0.0171 },
    { month: 'Dec', rate: 0.0170 },
  ],
};

const CURRENCY_INFO = {
  PHP: { name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭' },
  USD: { name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  EUR: { name: 'Euro', symbol: '€', flag: '🇪🇺' },
  JPY: { name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  SGD: { name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  GBP: { name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  AUD: { name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  CNY: { name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  KRW: { name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  THB: { name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
};

// Dummy jar balances
const DUMMY_JAR_BALANCES = {
  'Necessities': 25000,
  'Financial Freedom': 8000,
  'Education': 5000,
  'Long-term Savings': 15000,
  'Play': 6000,
  'Give': 2000,
};

const JAR_CONFIG = {
  'Necessities': { icon: '🏠', color: '#3B82F6' },
  'Financial Freedom': { icon: '💰', color: '#10B981' },
  'Education': { icon: '📚', color: '#8B5CF6' },
  'Long-term Savings': { icon: '🎯', color: '#F59E0B' },
  'Play': { icon: '🎮', color: '#EC4899' },
  'Give': { icon: '❤️', color: '#EF4444' },
};

const CurrencyConversionSimulator = () => {
  const [baseCurrency, setBaseCurrency] = useState('PHP');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [amount, setAmount] = useState(10000);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [selectedJar, setSelectedJar] = useState('All');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // 🔴 TODO: Replace with actual API call
  // const { data: exchangeRates } = useQuery('exchangeRates', fetchLiveRates);

  useEffect(() => {
    calculateConversion();
  }, [amount, baseCurrency, targetCurrency]);

  const calculateConversion = () => {
    if (baseCurrency === targetCurrency) {
      setConvertedAmount(amount);
      return;
    }

    // Convert to PHP first (base), then to target currency
    const amountInPHP = baseCurrency === 'PHP' 
      ? amount 
      : amount / DUMMY_EXCHANGE_RATES[baseCurrency];
    
    const converted = amountInPHP * DUMMY_EXCHANGE_RATES[targetCurrency];
    setConvertedAmount(converted);
  };

  const formatCurrency = (value, currency) => {
    const currencyInfo = CURRENCY_INFO[currency];
    const formatted = value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return `${currencyInfo.symbol}${formatted}`;
  };

  const getExchangeRate = () => {
    if (baseCurrency === targetCurrency) return 1;
    
    const amountInPHP = baseCurrency === 'PHP' 
      ? 1 
      : 1 / DUMMY_EXCHANGE_RATES[baseCurrency];
    
    return amountInPHP * DUMMY_EXCHANGE_RATES[targetCurrency];
  };

  const convertJarBalance = (jarBalance, currency) => {
    const amountInPHP = jarBalance;
    return amountInPHP * DUMMY_EXCHANGE_RATES[currency];
  };

  const getTotalBalance = () => {
    if (selectedJar === 'All') {
      return Object.values(DUMMY_JAR_BALANCES).reduce((sum, val) => sum + val, 0);
    }
    return DUMMY_JAR_BALANCES[selectedJar];
  };

  const swapCurrencies = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">💱 Currency Conversion Simulator</h2>
        <p className="text-indigo-100">Convert your jar balances and plan international expenses</p>
        <div className="text-xs text-indigo-200 mt-2">
          Last updated: {lastUpdated.toLocaleString()}
        </div>
      </div>

      {/* Quick Converter */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">⚡ Quick Converter</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* From Currency */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700">From</label>
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              {Object.entries(CURRENCY_INFO).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.flag} {code} - {info.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 text-2xl font-bold border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Enter amount"
            />
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={swapCurrencies}
              className="p-4 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition transform hover:scale-110"
            >
              <span className="text-3xl">⇄</span>
            </button>
          </div>

          {/* To Currency */}
          <div className="space-y-3 md:col-start-2">
            <label className="text-sm font-semibold text-gray-700">To</label>
            <select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              {Object.entries(CURRENCY_INFO).map(([code, info]) => (
                <option key={code} value={code}>
                  {info.flag} {code} - {info.name}
                </option>
              ))}
            </select>
            <div className="w-full px-4 py-3 text-2xl font-bold bg-green-50 border-2 border-green-300 rounded-lg text-green-700">
              {formatCurrency(convertedAmount, targetCurrency)}
            </div>
          </div>
        </div>

        {/* Exchange Rate Display */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-1">Exchange Rate</div>
            <div className="text-2xl font-bold text-blue-600">
              1 {baseCurrency} = {getExchangeRate().toFixed(4)} {targetCurrency}
            </div>
          </div>
        </div>
      </div>

      {/* Popular Conversions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">🌍 Popular Conversions from PHP</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['USD', 'EUR', 'JPY', 'SGD', 'GBP'].map(currency => {
            const rate = DUMMY_EXCHANGE_RATES[currency];
            const info = CURRENCY_INFO[currency];
            const converted = 10000 * rate;
            
            return (
              <div key={currency} className="p-4 bg-gray-50 rounded-lg text-center hover:bg-blue-50 transition cursor-pointer">
                <div className="text-3xl mb-2">{info.flag}</div>
                <div className="font-semibold text-gray-800">{currency}</div>
                <div className="text-xs text-gray-500 mb-2">₱10,000 =</div>
                <div className="font-bold text-blue-600">
                  {info.symbol}{converted.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Jar Balance Conversion */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">💰 Convert Jar Balances</h3>
        
        {/* Jar Selector */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Select Jar</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedJar('All')}
              className={`px-4 py-2 rounded-lg border-2 transition ${
                selectedJar === 'All'
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-purple-400'
              }`}
            >
              All Jars
            </button>
            {Object.entries(JAR_CONFIG).map(([jarName, config]) => (
              <button
                key={jarName}
                onClick={() => setSelectedJar(jarName)}
                className={`px-4 py-2 rounded-lg border-2 transition flex items-center gap-2 ${
                  selectedJar === jarName
                    ? 'text-white border-transparent'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
                style={selectedJar === jarName ? { backgroundColor: config.color } : {}}
              >
                <span>{config.icon}</span>
                <span className="text-sm">{jarName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Currency Selector for Conversion */}
        <div className="mb-4">
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Convert to</label>
          <select
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            className="w-full md:w-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            {Object.entries(CURRENCY_INFO).map(([code, info]) => (
              <option key={code} value={code}>
                {info.flag} {code} - {info.name}
              </option>
            ))}
          </select>
        </div>

        {/* Conversion Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
            <div className="text-sm text-gray-600 mb-2">Original (PHP)</div>
            <div className="text-3xl font-bold text-blue-600">
              ₱{getTotalBalance().toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              {selectedJar === 'All' ? 'Total Balance' : selectedJar}
            </div>
          </div>
          
          <div className="p-6 bg-green-50 rounded-lg border-2 border-green-200">
            <div className="text-sm text-gray-600 mb-2">Converted ({targetCurrency})</div>
            <div className="text-3xl font-bold text-green-600">
              {formatCurrency(convertJarBalance(getTotalBalance(), targetCurrency), targetCurrency)}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Rate: 1 PHP = {DUMMY_EXCHANGE_RATES[targetCurrency].toFixed(4)} {targetCurrency}
            </div>
          </div>
        </div>

        {/* Individual Jar Breakdown */}
        {selectedJar === 'All' && (
          <div className="mt-6">
            <h4 className="font-semibold text-gray-800 mb-3">Breakdown by Jar</h4>
            <div className="space-y-2">
              {Object.entries(DUMMY_JAR_BALANCES).map(([jarName, balance]) => {
                const jarConfig = JAR_CONFIG[jarName];
                const converted = convertJarBalance(balance, targetCurrency);
                
                return (
                  <div key={jarName} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{jarConfig.icon}</span>
                      <span className="font-medium text-gray-700">{jarName}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">₱{balance.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">
                        = {formatCurrency(converted, targetCurrency)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Exchange Rate Trends */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">📈 Exchange Rate Trends (6 Months)</h3>
        <div className="mb-4">
          <select
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="USD">🇺🇸 PHP to USD</option>
            <option value="EUR">🇪🇺 PHP to EUR</option>
          </select>
        </div>
        
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={DUMMY_RATE_HISTORY[targetCurrency] || DUMMY_RATE_HISTORY.USD}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value) => value.toFixed(4)}
              labelFormatter={(label) => `Month: ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="rate" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name={`PHP to ${targetCurrency}`}
              dot={{ fill: '#3b82f6', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Travel Budget Calculator */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 p-6 rounded-lg border border-orange-200">
        <h3 className="text-lg font-semibold mb-4">✈️ Travel Budget Calculator</h3>
        <p className="text-gray-700 mb-4">
          Planning a trip? See how much your PHP budget is worth abroad:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { country: 'Japan', currency: 'JPY', flag: '🇯🇵', budget: 50000 },
            { country: 'Singapore', currency: 'SGD', flag: '🇸🇬', budget: 30000 },
            { country: 'USA', currency: 'USD', flag: '🇺🇸', budget: 80000 },
          ].map((destination) => {
            const converted = destination.budget * DUMMY_EXCHANGE_RATES[destination.currency];
            const info = CURRENCY_INFO[destination.currency];
            
            return (
              <div key={destination.country} className="bg-white p-4 rounded-lg">
                <div className="text-3xl mb-2">{destination.flag}</div>
                <div className="font-semibold text-gray-800 mb-2">{destination.country}</div>
                <div className="text-sm text-gray-600 mb-1">
                  ₱{destination.budget.toLocaleString()} =
                </div>
                <div className="text-xl font-bold text-orange-600">
                  {info.symbol}{converted.toFixed(2)}
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
          <li>Replace DUMMY_EXCHANGE_RATES with live API (e.g., exchangerate-api.com, fixer.io)</li>
          <li>Implement auto-refresh every 1 hour for exchange rates</li>
          <li>Store user's preferred currencies in Supabase user_preferences table</li>
          <li>Add currency conversion history tracking</li>
          <li>Implement currency alerts (notify when rate reaches target)</li>
          <li>Add more currencies and crypto support</li>
          <li>Cache exchange rates locally to reduce API calls</li>
        </ul>
      </div>
    </div>
  );
};

export default CurrencyConversionSimulator;
