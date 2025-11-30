const express = require('express');
const router = express.Router();
const {
  exportCSV,
  exportJSON,
  importData,
  resetData
} = require('../controllers/exportController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/csv', exportCSV);
router.get('/json', exportJSON);
router.post('/import', importData);
router.post('/reset', resetData);

module.exports = router;
