import React, { useState } from 'react';

// 🔴 DUMMY DATA - Replace with Supabase queries later
const SUBSCRIPTION_PLANS = {
  FREE: {
    id: 'free',
    name: 'Free Plan',
    price: 0,
    billing: 'Forever Free',
    icon: '🎁',
    color: 'bg-gray-600',
    features: [
      { name: 'Basic 6 Jars System', included: true },
      { name: 'Up to 100 transactions/month', included: true },
      { name: 'Basic Analytics', included: true },
      { name: 'Mobile App Access', included: true },
      { name: '1 Savings Goal', included: true },
      { name: 'Manual Sync', included: true },
      { name: 'Community Support', included: true },
      { name: 'Unlimited Transactions', included: false },
      { name: 'Advanced Analytics & Insights', included: false },
      { name: 'AI-Powered Budgeting', included: false },
      { name: 'Team/Family Mode', included: false },
      { name: 'Priority Sync', included: false },
      { name: 'Custom Jar Categories', included: false },
      { name: 'Export to CSV/Excel', included: false },
      { name: 'Priority Support', included: false },
      { name: 'Remove Ads', included: false },
    ]
  },
  PREMIUM: {
    id: 'premium',
    name: 'Premium Plan',
    price: 299,
    billing: 'per month',
    icon: '⭐',
    color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    features: [
      { name: 'Everything in Free', included: true },
      { name: 'Unlimited Transactions', included: true },
      { name: 'Advanced Analytics & Insights', included: true },
      { name: 'AI-Powered Budgeting', included: true },
      { name: 'Team/Family Mode (up to 5 members)', included: true },
      { name: 'Priority Sync', included: true },
      { name: 'Custom Jar Categories', included: true },
      { name: 'Export to CSV/Excel', included: true },
      { name: 'Priority Email Support', included: true },
      { name: 'Remove Ads', included: true },
      { name: 'Recurring Expense Management', included: true },
      { name: 'Bill Reminders', included: true },
      { name: 'Currency Conversion', included: true },
      { name: 'Backup & Restore', included: true },
      { name: 'Dark Mode', included: true },
    ]
  },
  BUSINESS: {
    id: 'business',
    name: 'Business Plan',
    price: 799,
    billing: 'per month',
    icon: '💼',
    color: 'bg-gradient-to-r from-purple-600 to-blue-600',
    features: [
      { name: 'Everything in Premium', included: true },
      { name: 'Unlimited Team Members', included: true },
      { name: 'Multi-Business Management', included: true },
      { name: 'Advanced Team Permissions', included: true },
      { name: 'Custom Branding', included: true },
      { name: 'API Access', included: true },
      { name: 'Dedicated Account Manager', included: true },
      { name: '24/7 Phone Support', included: true },
      { name: 'SSO Integration', included: true },
      { name: 'Advanced Security Features', included: true },
      { name: 'Custom Reports', included: true },
      { name: 'White-label Option', included: true },
    ]
  }
};

const DUMMY_USER_SUBSCRIPTION = {
  currentPlan: 'free',
  startDate: '2024-01-01',
  renewalDate: null,
  transactionCount: 47,
  transactionLimit: 100,
  features: {
    unlimitedTransactions: false,
    advancedAnalytics: false,
    aiPoweredBudgeting: false,
    teamMode: false,
    prioritySync: false,
    customCategories: false,
    exportData: false,
    prioritySupport: false,
    removeAds: false,
  }
};

const SubscriptionManager = () => {
  const [currentPlan, setCurrentPlan] = useState(DUMMY_USER_SUBSCRIPTION.currentPlan);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly or yearly

  // 🔴 TODO: Replace with actual Supabase query
  // const { data: subscription } = useQuery('userSubscription', fetchSubscription);

  const formatCurrency = (value) => {
    return `₱${value.toLocaleString()}`;
  };

  const calculateYearlyPrice = (monthlyPrice) => {
    return Math.round(monthlyPrice * 12 * 0.8); // 20% discount for yearly
  };

  const handleUpgrade = (planId) => {
    setSelectedPlan(planId);
    setShowUpgradeModal(true);
  };

  const confirmUpgrade = () => {
    // 🔴 TODO: Integrate with payment gateway (Stripe, PayMongo, etc.)
    setCurrentPlan(selectedPlan);
    setShowUpgradeModal(false);
    
    alert(`✅ Upgraded to ${SUBSCRIPTION_PLANS[selectedPlan.toUpperCase()].name}!\n\n🔴 This is a simulation. In production:\n- Payment gateway integration\n- Supabase subscription update\n- Send confirmation email\n- Enable premium features`);
  };

  const getUsagePercentage = () => {
    return (DUMMY_USER_SUBSCRIPTION.transactionCount / DUMMY_USER_SUBSCRIPTION.transactionLimit) * 100;
  };

  const isPlanActive = (planId) => currentPlan === planId;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">💎 Subscription & Billing</h2>
        <p className="text-purple-100">Manage your subscription and unlock premium features</p>
      </div>

      {/* Current Plan Status */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">📊 Your Current Plan</h3>
        
        <div className="flex items-center gap-4 mb-6">
          <div className={`text-5xl ${SUBSCRIPTION_PLANS[currentPlan.toUpperCase()].color} w-20 h-20 rounded-full flex items-center justify-center text-white`}>
            {SUBSCRIPTION_PLANS[currentPlan.toUpperCase()].icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-bold text-gray-800">
                {SUBSCRIPTION_PLANS[currentPlan.toUpperCase()].name}
              </h3>
              {currentPlan !== 'free' && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                  Active
                </span>
              )}
            </div>
            <p className="text-gray-600 mt-1">
              {currentPlan === 'free' 
                ? 'Free Forever' 
                : `Next billing: ${DUMMY_USER_SUBSCRIPTION.renewalDate || 'January 1, 2025'}`}
            </p>
          </div>
          {currentPlan !== 'business' && (
            <button
              onClick={() => handleUpgrade(currentPlan === 'free' ? 'premium' : 'business')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition shadow-lg font-semibold"
            >
              ⬆️ Upgrade Plan
            </button>
          )}
        </div>

        {/* Usage Stats (for free plan) */}
        {currentPlan === 'free' && (
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-800">Transaction Usage</span>
              <span className="text-sm text-gray-600">
                {DUMMY_USER_SUBSCRIPTION.transactionCount} / {DUMMY_USER_SUBSCRIPTION.transactionLimit}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full transition-all"
                style={{ width: `${getUsagePercentage()}%` }}
              />
            </div>
            <p className="text-xs text-orange-700 mt-2">
              {getUsagePercentage() > 80 
                ? '⚠️ You\'re approaching your monthly limit. Consider upgrading to Premium!' 
                : 'You have plenty of transactions remaining this month.'}
            </p>
          </div>
        )}
      </div>

      {/* Billing Cycle Toggle */}
      <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center gap-4">
        <span className="text-gray-700 font-medium">Monthly</span>
        <button
          onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
          className={`relative w-16 h-8 rounded-full transition ${
            billingCycle === 'yearly' ? 'bg-green-500' : 'bg-gray-300'
          }`}
        >
          <div
            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
              billingCycle === 'yearly' ? 'transform translate-x-8' : ''
            }`}
          />
        </button>
        <span className="text-gray-700 font-medium">
          Yearly <span className="text-green-600 text-sm font-bold">(Save 20%)</span>
        </span>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => {
          const isActive = isPlanActive(plan.id);
          const price = billingCycle === 'yearly' ? calculateYearlyPrice(plan.price) : plan.price;
          const billing = billingCycle === 'yearly' ? 'per year' : plan.billing;

          return (
            <div
              key={key}
              className={`bg-white rounded-lg shadow-lg overflow-hidden border-2 transition ${
                isActive ? 'border-purple-500 ring-4 ring-purple-200' : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              {/* Plan Header */}
              <div className={`${plan.color} text-white p-6 text-center`}>
                <div className="text-5xl mb-3">{plan.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                {plan.price === 0 ? (
                  <div className="text-4xl font-bold">Free</div>
                ) : (
                  <>
                    <div className="text-4xl font-bold">{formatCurrency(price)}</div>
                    <div className="text-sm opacity-90 mt-1">{billing}</div>
                  </>
                )}
                {billingCycle === 'yearly' && plan.price > 0 && (
                  <div className="text-xs mt-2 bg-white bg-opacity-20 rounded-full px-3 py-1 inline-block">
                    Save {formatCurrency(plan.price * 12 - price)}/year
                  </div>
                )}
              </div>

              {/* Features List */}
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.slice(0, 8).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <span className={feature.included ? 'text-green-500' : 'text-gray-300'}>
                        {feature.included ? '✓' : '✗'}
                      </span>
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                  {plan.features.length > 8 && (
                    <li className="text-sm text-gray-500 italic">
                      +{plan.features.length - 8} more features...
                    </li>
                  )}
                </ul>

                {/* Action Button */}
                {isActive ? (
                  <button
                    disabled
                    className="w-full py-3 bg-gray-100 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
                  >
                    ✓ Current Plan
                  </button>
                ) : currentPlan === 'business' && key !== 'BUSINESS' ? (
                  <button
                    disabled
                    className="w-full py-3 bg-gray-100 text-gray-500 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Downgrade Not Available
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpgrade(plan.id)}
                    className={`w-full py-3 rounded-lg font-semibold transition ${
                      plan.id === 'free'
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
                    }`}
                  >
                    {plan.id === 'free' ? 'Downgrade' : 'Upgrade Now'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Comparison */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">📋 Full Feature Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4">Feature</th>
                <th className="text-center py-3 px-4">Free</th>
                <th className="text-center py-3 px-4">Premium</th>
                <th className="text-center py-3 px-4">Business</th>
              </tr>
            </thead>
            <tbody>
              {SUBSCRIPTION_PLANS.BUSINESS.features.map((feature, idx) => (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">{feature.name}</td>
                  <td className="py-3 px-4 text-center">
                    {SUBSCRIPTION_PLANS.FREE.features.find(f => f.name === feature.name)?.included 
                      ? <span className="text-green-500 text-xl">✓</span> 
                      : <span className="text-gray-300 text-xl">✗</span>}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {SUBSCRIPTION_PLANS.PREMIUM.features.find(f => f.name === feature.name)?.included 
                      ? <span className="text-green-500 text-xl">✓</span> 
                      : <span className="text-gray-300 text-xl">✗</span>}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-green-500 text-xl">✓</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold mb-4">Confirm Upgrade</h3>
            <p className="text-gray-600 mb-6">
              You're upgrading to <span className="font-bold text-purple-600">{SUBSCRIPTION_PLANS[selectedPlan.toUpperCase()].name}</span>
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Plan:</span>
                <span className="font-semibold">{SUBSCRIPTION_PLANS[selectedPlan.toUpperCase()].name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Billing:</span>
                <span className="font-semibold">{billingCycle === 'yearly' ? 'Yearly' : 'Monthly'}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                <span>Total:</span>
                <span className="text-purple-600">
                  {formatCurrency(
                    billingCycle === 'yearly' 
                      ? calculateYearlyPrice(SUBSCRIPTION_PLANS[selectedPlan.toUpperCase()].price)
                      : SUBSCRIPTION_PLANS[selectedPlan.toUpperCase()].price
                  )}
                  <span className="text-sm text-gray-600 font-normal">
                    /{billingCycle === 'yearly' ? 'year' : 'month'}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpgrade}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-semibold"
              >
                Confirm Upgrade
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              🔴 This is a demo. No actual payment will be processed.
            </p>
          </div>
        </div>
      )}

      {/* Implementation Notes */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">🔧 Implementation Notes (Developer):</h4>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
          <li>Store subscription data in Supabase 'subscriptions' table with user_id, plan_id, status, billing_cycle</li>
          <li>Integrate payment gateway: Stripe, PayMongo, or PayPal</li>
          <li>Create webhook endpoints to handle subscription events (created, updated, cancelled)</li>
          <li>Implement feature gating based on subscription plan</li>
          <li>Add cron job to check and update subscription status daily</li>
          <li>Send email notifications for billing, upgrades, and cancellations</li>
          <li>Store transaction count in Redis for real-time tracking</li>
          <li>Implement trial period (7 days free Premium)</li>
        </ul>
      </div>
    </div>
  );
};

export default SubscriptionManager;
