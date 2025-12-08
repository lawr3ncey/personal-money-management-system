import React, { useState, useEffect } from 'react';
import { budgetService } from '../services';
import { useNotification } from '../contexts/NotificationContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Spinner from '../components/ui/Spinner';
import { formatCurrency } from '../utils/formatters';

const BudgetsPage = () => {
  const [currentBudget, setCurrentBudget] = useState(null);
  const [budgetProgress, setBudgetProgress] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    monthlyIncomeGoal: '',
    monthlySpendingLimit: '',
    monthlySavingsGoal: ''
  });
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    fetchCurrentBudget();
  }, []);

  const fetchCurrentBudget = async () => {
    try {
      setLoading(true);
      const data = await budgetService.getCurrentBudget();
      
      if (data && data.budget) {
        // Check if budget has been configured (has non-zero goals)
        const hasGoals = data.budget.monthlyIncome > 0 || 
                         data.budget.spendingLimit > 0 || 
                         data.budget.savingsGoal > 0;
        
        if (hasGoals) {
          setCurrentBudget(data.budget);
          
          // Extract alerts from response if available
          if (data.activeAlerts) {
            setAlerts(data.activeAlerts);
          }
          
          const progress = await budgetService.getBudgetProgress(data.budget._id);
          setBudgetProgress(progress);
        } else {
          // Budget exists but not configured - show as null so form appears
          setCurrentBudget(null);
        }
      }
    } catch (error) {
      console.error('Failed to fetch budget:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const now = new Date();
      const budgetData = {
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        monthlyIncome: parseFloat(formData.monthlyIncomeGoal),
        spendingLimit: parseFloat(formData.monthlySpendingLimit),
        savingsGoal: parseFloat(formData.monthlySavingsGoal)
      };

      await budgetService.createBudget(budgetData);
      showSuccess('Budget created successfully!');
      setShowForm(false);
      fetchCurrentBudget();
    } catch (error) {
      showError(error.message || 'Failed to create budget');
    }
  };

  const getProgressPercentage = (current, goal) => {
    if (!goal || goal === 0) return 0;
    return Math.min((current / goal) * 100, 100);
  };

  const getProgressColor = (percentage, isSpending = false) => {
    if (isSpending) {
      // For spending, red when over limit
      if (percentage >= 100) return 'bg-red-500';
      if (percentage >= 80) return 'bg-yellow-500';
      return 'bg-green-500';
    } else {
      // For income/savings, green when reaching goal
      if (percentage >= 100) return 'bg-green-500';
      if (percentage >= 60) return 'bg-blue-500';
      return 'bg-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Monthly Budget</h1>
        {currentBudget && !showForm && (
          <Button variant="secondary" onClick={() => {
            setFormData({
              monthlyIncomeGoal: currentBudget.monthlyIncome.toString(),
              monthlySpendingLimit: currentBudget.spendingLimit.toString(),
              monthlySavingsGoal: currentBudget.savingsGoal.toString()
            });
            setShowForm(true);
          }}>
            Edit Budget
          </Button>
        )}
        {!currentBudget && !showForm && (
          <Button variant="primary" onClick={() => setShowForm(true)}>
            + Create Budget
          </Button>
        )}
      </div>

      {/* Budget Form */}
      {showForm && (
        <Card>
          <h2 className="text-xl font-semibold mb-4">Create Monthly Budget</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Income Goal
              </label>
              <Input
                type="number"
                step="0.01"
                value={formData.monthlyIncomeGoal}
                onChange={(e) => setFormData({ ...formData, monthlyIncomeGoal: e.target.value })}
                placeholder="e.g., 5000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Spending Limit
              </label>
              <Input
                type="number"
                step="0.01"
                value={formData.monthlySpendingLimit}
                onChange={(e) => setFormData({ ...formData, monthlySpendingLimit: e.target.value })}
                placeholder="e.g., 3000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Savings Goal
              </label>
              <Input
                type="number"
                step="0.01"
                value={formData.monthlySavingsGoal}
                onChange={(e) => setFormData({ ...formData, monthlySavingsGoal: e.target.value })}
                placeholder="e.g., 1000"
                required
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" variant="primary">
                {currentBudget ? 'Update Budget' : 'Create Budget'}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Current Budget Display */}
      {currentBudget && budgetProgress && (
        <div className="space-y-6">
          {/* Active Alerts */}
          {alerts && alerts.length > 0 && (
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <Card 
                  key={index}
                  className={`border-2 ${
                    alert.type === 'danger' 
                      ? 'bg-red-50 border-red-300' 
                      : 'bg-yellow-50 border-yellow-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">
                      {alert.type === 'danger' ? '🚨' : '⚠️'}
                    </span>
                    <div className="flex-1">
                      <h3 className={`font-semibold mb-1 ${
                        alert.type === 'danger' ? 'text-red-800' : 'text-yellow-800'
                      }`}>
                        {alert.level === 'critical' ? 'Critical Alert' : 
                         alert.level === 'high' ? 'High Warning' : 'Warning'}
                      </h3>
                      <p className={
                        alert.type === 'danger' ? 'text-red-700' : 'text-yellow-700'
                      }>
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Budget Period */}
          <Card>
            <h2 className="text-xl font-semibold mb-2">
              {new Date(currentBudget.year, currentBudget.month - 1).toLocaleDateString('en-US', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </h2>
            <p className="text-gray-600">Current Month Budget</p>
          </Card>

          {/* Income Progress */}
          <Card>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Income</h3>
                <span className="text-2xl font-bold text-green-600">
                  {formatCurrency(budgetProgress.actualIncome)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Goal: {formatCurrency(currentBudget.monthlyIncome)}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all ${getProgressColor(
                    getProgressPercentage(budgetProgress.actualIncome, currentBudget.monthlyIncome)
                  )}`}
                  style={{ 
                    width: `${getProgressPercentage(budgetProgress.actualIncome, currentBudget.monthlyIncome)}%` 
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {getProgressPercentage(budgetProgress.actualIncome, currentBudget.monthlyIncome).toFixed(1)}% of goal
              </p>
            </div>
          </Card>

          {/* Spending Progress */}
          <Card>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Spending</h3>
                <span className="text-2xl font-bold text-red-600">
                  {formatCurrency(budgetProgress.actualSpending)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Limit: {formatCurrency(currentBudget.spendingLimit)}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all ${getProgressColor(
                    getProgressPercentage(budgetProgress.actualSpending, currentBudget.spendingLimit),
                    true
                  )}`}
                  style={{ 
                    width: `${getProgressPercentage(budgetProgress.actualSpending, currentBudget.spendingLimit)}%` 
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {getProgressPercentage(budgetProgress.actualSpending, currentBudget.spendingLimit).toFixed(1)}% of limit
              </p>
              {budgetProgress.actualSpending > currentBudget.spendingLimit && (
                <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded">
                  ⚠️ Over budget by {formatCurrency(budgetProgress.actualSpending - currentBudget.spendingLimit)}
                </div>
              )}
            </div>
          </Card>

          {/* Savings Progress */}
          <Card>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Savings</h3>
                <span className="text-2xl font-bold text-blue-600">
                  {formatCurrency(budgetProgress.actualSavings)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Goal: {formatCurrency(currentBudget.savingsGoal)}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all ${getProgressColor(
                    getProgressPercentage(budgetProgress.actualSavings, currentBudget.savingsGoal)
                  )}`}
                  style={{ 
                    width: `${getProgressPercentage(budgetProgress.actualSavings, currentBudget.savingsGoal)}%` 
                  }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {getProgressPercentage(budgetProgress.actualSavings, currentBudget.savingsGoal).toFixed(1)}% of goal
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* No Budget State */}
      {!currentBudget && !showForm && (
        <Card>
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">
              📊 No budget set for this month
            </p>
            <p className="text-gray-500 mb-6">
              Create a budget to track your income, spending, and savings goals
            </p>
            <Button variant="primary" onClick={() => setShowForm(true)}>
              Create Your First Budget
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default BudgetsPage;
