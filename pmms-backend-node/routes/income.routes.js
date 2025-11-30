const express = require('express');
const router = express.Router();
const {
  distributeIncome,
  getIncomeHistory,
  getIncomeStats
} = require('../controllers/incomeController');
const { protect } = require('../middleware/auth');
const { distributeIncomeValidator } = require('../utils/validators');
const { validate } = require('../middleware/validate');
const mockUser = require('../middleware/mockUser');

// TODO: Re-enable authentication in production
// router.use(protect);
router.use(mockUser); // Dev only - remove in production

router.post('/distribute', distributeIncomeValidator, validate, distributeIncome);
router.get('/', getIncomeHistory);
router.get('/stats', getIncomeStats);

module.exports = router;
