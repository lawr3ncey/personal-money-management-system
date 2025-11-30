const express = require('express');
const router = express.Router();
const {
  getBudgets,
  getCurrentBudget,
  createBudget,
  getBudgetProgress
} = require('../controllers/budgetController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getBudgets)
  .post(createBudget);

router.get('/current', getCurrentBudget);
router.get('/:id/progress', getBudgetProgress);

module.exports = router;
