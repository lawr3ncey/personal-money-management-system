const express = require('express');
const router = express.Router();
const {
  getRecurringItems,
  createRecurringItem,
  updateRecurringItem,
  deleteRecurringItem,
  toggleRecurringItem
} = require('../controllers/recurringController');
const { protect } = require('../middleware/auth');
const mockUser = require('../middleware/mockUser');
const { createRecurringValidator } = require('../utils/validators');
const { validate } = require('../middleware/validate');

// Use mockUser for development
router.use(mockUser); // Dev only - remove in production

router.route('/')
  .get(getRecurringItems)
  .post(createRecurringValidator, validate, createRecurringItem);

router.route('/:id')
  .put(updateRecurringItem)
  .delete(deleteRecurringItem);

router.post('/:id/toggle', toggleRecurringItem);

module.exports = router;
