const express = require('express');
const router = express.Router();
const {
  getTransactions,
  getJarTransactions,
  getTransaction,
  deleteTransaction
} = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');
const mockUser = require('../middleware/mockUser');

// TODO: Re-enable authentication in production
// router.use(protect);
router.use(mockUser); // Dev only - remove in production

router.get('/', getTransactions);
router.get('/jar/:id', getJarTransactions);
router.route('/:id')
  .get(getTransaction)
  .delete(deleteTransaction);

module.exports = router;
