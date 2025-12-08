import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  CircularProgress,
  Avatar,
  LinearProgress,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import {
  Flag as FlagIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CompletedIcon,
  AccessTime as PendingIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { savingsGoals } from '../../data/adminData';

const SavingsGoalsMonitor = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      setGoals(savingsGoals);
      setLoading(false);
    }, 800);
  }, []);

  const filteredGoals = goals.filter((goal) => {
    const matchesSearch =
      goal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      goal.userName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || goal.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || goal.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Stats
  const totalGoals = goals.length;
  const activeGoals = goals.filter((g) => g.status === 'active').length;
  const completedGoals = goals.filter((g) => g.status === 'completed').length;
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  const formatCurrency = (amount) => `₱${amount.toLocaleString()}`;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-PH', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#d32f2f';
      case 'medium': return '#ed6c02';
      case 'low': return '#2e7d32';
      default: return '#757575';
    }
  };

  const getProgress = (current, target) => Math.min((current / target) * 100, 100);

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return '#2e7d32';
    if (percentage >= 50) return '#ed6c02';
    return '#1976d2';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Savings Goals Monitor
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track savings goals progress across all users
        </Typography>
      </Box>

      {/* Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2, mb: 3 }}>
        <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
          <Typography variant="body2" color="text.secondary">Total Goals</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{totalGoals}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#fff3e0' }}>
          <Typography variant="body2" color="text.secondary">Active</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'warning.main' }}>{activeGoals}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
          <Typography variant="body2" color="text.secondary">Completed</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main' }}>{completedGoals}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#f3e5f5' }}>
          <Typography variant="body2" color="text.secondary">Total Saved</Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>{formatCurrency(totalSaved)}</Typography>
        </Paper>
        <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
          <Typography variant="body2" color="text.secondary">Overall Progress</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>{overallProgress.toFixed(1)}%</Typography>
            <TrendingUpIcon sx={{ color: 'success.main' }} />
          </Box>
        </Paper>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Search by user or goal name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} label="Status">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Priority</InputLabel>
            <Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} label="Priority">
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ flex: 1 }} />

          <Button
            size="small"
            startIcon={<RefreshIcon />}
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 500);
            }}
          >
            Refresh
          </Button>
        </Box>
      </Paper>

      {/* Goals Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 2 }}>
          {filteredGoals.map((goal) => {
            const progress = getProgress(goal.currentAmount, goal.targetAmount);
            const progressColor = getProgressColor(progress);

            return (
              <Card key={goal.id} sx={{ border: '1px solid #e0e0e0' }}>
                <CardContent>
                  {/* Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', bgcolor: '#1976d2' }}>
                        {goal.userName.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{goal.userName}</Typography>
                        <Typography variant="caption" color="text.secondary">{goal.userId}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Chip
                        size="small"
                        label={goal.priority}
                        sx={{
                          bgcolor: `${getPriorityColor(goal.priority)}15`,
                          color: getPriorityColor(goal.priority),
                          fontWeight: 600,
                          textTransform: 'capitalize',
                        }}
                      />
                      <Chip
                        size="small"
                        icon={goal.status === 'completed' ? <CompletedIcon sx={{ fontSize: 14 }} /> : <PendingIcon sx={{ fontSize: 14 }} />}
                        label={goal.status}
                        color={goal.status === 'completed' ? 'success' : 'warning'}
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Box>
                  </Box>

                  {/* Goal Info */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <FlagIcon sx={{ color: '#1976d2', fontSize: 20 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {goal.name}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      Deadline: {formatDate(goal.deadline)}
                    </Typography>
                  </Box>

                  {/* Progress */}
                  <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" color="text.secondary">Progress</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: progressColor }}>
                        {progress.toFixed(0)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        bgcolor: '#f0f0f0',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: progressColor,
                          borderRadius: 5,
                        },
                      }}
                    />
                  </Box>

                  {/* Amount */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      Saved: <strong>{formatCurrency(goal.currentAmount)}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Target: <strong>{formatCurrency(goal.targetAmount)}</strong>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default SavingsGoalsMonitor;
