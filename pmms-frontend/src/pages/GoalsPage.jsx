import React, { useState, useEffect } from 'react';
import { goalService } from '../services';
import { useNotification } from '../contexts/NotificationContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Spinner from '../components/ui/Spinner';
import { formatCurrency, formatDate } from '../utils/formatters';

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showContributeModal, setShowContributeModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const { showSuccess, showError } = useNotification();

  const [createFormData, setCreateFormData] = useState({
    name: '',
    targetAmount: '',
    deadline: '',
    description: ''
  });

  const [contributeFormData, setContributeFormData] = useState({
    amount: '',
    jarId: '',
    note: ''
  });

  useEffect(() => {
    fetchGoals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCompleted]);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const data = await goalService.getGoals(showCompleted);
      setGoals(data);
    } catch (error) {
      showError('Failed to load goals');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    
    try {
      const goalData = {
        name: createFormData.name,
        targetAmount: parseFloat(createFormData.targetAmount),
        deadline: createFormData.deadline || undefined,
        description: createFormData.description || undefined
      };

      await goalService.createGoal(goalData);
      showSuccess('Goal created successfully!');
      setShowCreateModal(false);
      setCreateFormData({ name: '', targetAmount: '', deadline: '', description: '' });
      fetchGoals();
    } catch (error) {
      showError(error.message || 'Failed to create goal');
    }
  };

  const handleContribute = async (e) => {
    e.preventDefault();
    
    try {
      const contributionData = {
        amount: parseFloat(contributeFormData.amount),
        jarId: contributeFormData.jarId || undefined,
        note: contributeFormData.note || undefined
      };

      await goalService.contributeToGoal(selectedGoal._id, contributionData);
      showSuccess('Contribution added successfully!');
      setShowContributeModal(false);
      setSelectedGoal(null);
      setContributeFormData({ amount: '', jarId: '', note: '' });
      fetchGoals();
    } catch (error) {
      showError(error.message || 'Failed to add contribution');
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (!window.confirm('Are you sure you want to delete this goal?')) return;
    
    try {
      await goalService.deleteGoal(goalId);
      showSuccess('Goal deleted successfully');
      fetchGoals();
    } catch (error) {
      showError('Failed to delete goal');
    }
  };

  const getProgressPercentage = (current, target) => {
    if (!target || target === 0) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-gray-400';
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Savings Goals</h1>
        <div className="flex gap-3">
          <Button 
            variant={showCompleted ? 'secondary' : 'ghost'}
            onClick={() => setShowCompleted(!showCompleted)}
          >
            {showCompleted ? 'Show Active' : 'Show Completed'}
          </Button>
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            + Create Goal
          </Button>
        </div>
      </div>

      {/* Goals Grid */}
      {goals.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">
              🎯 No {showCompleted ? 'completed ' : ''}goals yet
            </p>
            <p className="text-gray-500 mb-6">
              {showCompleted 
                ? 'Complete your first goal to see it here'
                : 'Create your first savings goal and start working towards it'
              }
            </p>
            {!showCompleted && (
              <Button variant="primary" onClick={() => setShowCreateModal(true)}>
                Create Your First Goal
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount);
            const isCompleted = goal.status === 'completed';
            
            return (
              <Card key={goal._id} className="relative">
                {isCompleted && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                      ✓ Completed
                    </span>
                  </div>
                )}
                
                <h3 className="text-xl font-semibold mb-2">{goal.name}</h3>
                
                {goal.description && (
                  <p className="text-sm text-gray-600 mb-4">{goal.description}</p>
                )}

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-blue-600">
                      {formatCurrency(goal.currentAmount)}
                    </span>
                    <span className="text-sm text-gray-600">
                      of {formatCurrency(goal.targetAmount)}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${getProgressColor(progress)}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-2">
                    {progress.toFixed(1)}% complete
                  </p>
                </div>

                {/* Deadline */}
                {goal.deadline && (
                  <div className="mb-4 text-sm text-gray-600">
                    📅 Deadline: {formatDate(goal.deadline)}
                  </div>
                )}

                {/* Contributions Count */}
                {goal.contributions && goal.contributions.length > 0 && (
                  <div className="mb-4 text-sm text-gray-600">
                    💰 {goal.contributions.length} contribution{goal.contributions.length !== 1 ? 's' : ''}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  {!isCompleted && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setSelectedGoal(goal);
                        setShowContributeModal(true);
                      }}
                      className="flex-1"
                    >
                      Contribute
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteGoal(goal._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create Goal Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setCreateFormData({ name: '', targetAmount: '', deadline: '', description: '' });
        }}
        title="Create Savings Goal"
        size="md"
      >
        <form onSubmit={handleCreateGoal} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Goal Name *
            </label>
            <Input
              type="text"
              value={createFormData.name}
              onChange={(e) => setCreateFormData({ ...createFormData, name: e.target.value })}
              placeholder="e.g., Emergency Fund, Vacation, New Car"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Amount *
            </label>
            <Input
              type="number"
              step="0.01"
              value={createFormData.targetAmount}
              onChange={(e) => setCreateFormData({ ...createFormData, targetAmount: e.target.value })}
              placeholder="e.g., 10000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deadline (Optional)
            </label>
            <Input
              type="date"
              value={createFormData.deadline}
              onChange={(e) => setCreateFormData({ ...createFormData, deadline: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              className="input-field min-h-[100px]"
              value={createFormData.description}
              onChange={(e) => setCreateFormData({ ...createFormData, description: e.target.value })}
              placeholder="What is this goal for?"
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" variant="primary">
              Create Goal
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setShowCreateModal(false);
                setCreateFormData({ name: '', targetAmount: '', deadline: '', description: '' });
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Contribute Modal */}
      <Modal
        isOpen={showContributeModal}
        onClose={() => {
          setShowContributeModal(false);
          setSelectedGoal(null);
          setContributeFormData({ amount: '', jarId: '', note: '' });
        }}
        title={`Contribute to ${selectedGoal?.name}`}
        size="md"
      >
        <form onSubmit={handleContribute} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount *
            </label>
            <Input
              type="number"
              step="0.01"
              value={contributeFormData.amount}
              onChange={(e) => setContributeFormData({ ...contributeFormData, amount: e.target.value })}
              placeholder="Enter contribution amount"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Note (Optional)
            </label>
            <textarea
              className="input-field min-h-[80px]"
              value={contributeFormData.note}
              onChange={(e) => setContributeFormData({ ...contributeFormData, note: e.target.value })}
              placeholder="Add a note for this contribution"
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" variant="primary">
              Add Contribution
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setShowContributeModal(false);
                setSelectedGoal(null);
                setContributeFormData({ amount: '', jarId: '', note: '' });
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default GoalsPage;
