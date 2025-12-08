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
const mockUser = require('../middleware/mockUser');
const { createGoalValidator } = require('../utils/validators');
const { validate } = require('../middleware/validate');

router.use(mockUser); // Dev only - remove in production

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
