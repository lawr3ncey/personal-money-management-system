const express = require('express');
const router = express.Router();
const {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
  contributeToGoal,
  getGoalProgress
} = require('../controllers/goalController');
const { protect } = require('../middleware/auth');
const { createGoalValidator } = require('../utils/validators');
const { validate } = require('../middleware/validate');

router.use(protect);

router.route('/')
  .get(getGoals)
  .post(createGoalValidator, validate, createGoal);

router.route('/:id')
  .get(getGoal)
  .put(updateGoal)
  .delete(deleteGoal);

router.post('/:id/contribute', contributeToGoal);
router.get('/:id/progress', getGoalProgress);

module.exports = router;
