const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cron = require('node-cron');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth.routes');
const jarRoutes = require('./routes/jar.routes');
const transactionRoutes = require('./routes/transaction.routes');
const incomeRoutes = require('./routes/income.routes');
const recurringRoutes = require('./routes/recurring.routes');
const budgetRoutes = require('./routes/budget.routes');
const goalRoutes = require('./routes/goal.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const exportRoutes = require('./routes/export.routes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Import services
const recurringService = require('./services/recurring.service');
const budgetService = require('./services/budget.service');

// Initialize Express app
const app = express();

// Security middleware
app.use(helmet());

// CORS configuration - Allow all local dev ports
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    process.env.CLIENT_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'PMMS Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jars', jarRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/income', incomeRoutes);
app.use('/api/v1/recurring', recurringRoutes);
app.use('/api/v1/budgets', budgetRoutes);
app.use('/api/v1/goals', goalRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/export', exportRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Error handling middleware
app.use(errorHandler);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('[OK] MongoDB connected successfully');
  
  // Start cron jobs for recurring items
  if (process.env.ENABLE_RECURRING_JOBS === 'true') {
    // Run recurring items every day at midnight
    cron.schedule('0 0 * * *', () => {
      console.log('[CRON] Running recurring items cron job...');
      recurringService.executeRecurringItems();
    });
    console.log('[OK] Recurring items cron job scheduled');
    
    // Run monthly budget reset on 1st of each month at 00:01
    cron.schedule('1 0 1 * *', () => {
      console.log('[CRON] Running monthly budget reset...');
      budgetService.resetMonthlyBudget();
    });
    console.log('[OK] Monthly budget reset cron job scheduled');
  }
})
.catch((err) => {
  console.error('[ERROR] MongoDB connection error:', err);
  process.exit(1);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[SERVER] Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('[ERROR] Unhandled Promise Rejection:', err);
  process.exit(1);
});

module.exports = app;


