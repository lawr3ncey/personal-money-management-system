const express = require('express');
const router = express.Router();
const {
  getBudgets,
  getCurrentBudget,
  createBudget,
  getBudgetProgress,
  getBudgetAlerts,
  getMonthlyReports
} = require('../controllers/budgetController');
const { protect } = require('../middleware/auth');
const mockUser = require('../middleware/mockUser');

// Use mockUser for development
router.use(mockUser); // Dev only - remove in production

router.route('/')
  .get(getBudgets)
  .post(createBudget);

router.get('/current', getCurrentBudget);
router.get('/alerts', getBudgetAlerts);
router.get('/reports', getMonthlyReports);
router.get('/:id/progress', getBudgetProgress);

module.exports = router;
