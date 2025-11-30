const express = require('express');
const router = express.Router();
const {
  getOverview,
  getJarTrend,
  getSpendingBreakdown,
  getCategoryTotals,
  getComparison
} = require('../controllers/analyticsController');
const { protect } = require('../middleware/auth');
const mockUser = require('../middleware/mockUser');

// TODO: Re-enable authentication in production
// router.use(protect);
router.use(mockUser); // Dev only - remove in production

router.get('/overview', getOverview);
router.get('/jars/trend', getJarTrend);
router.get('/spending', getSpendingBreakdown);
router.get('/categories', getCategoryTotals);
router.get('/comparison', getComparison);

module.exports = router;
