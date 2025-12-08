const express = require('express');
const router = express.Router();
const {
  exportCSV,
  exportJSON,
  importData,
  resetData
} = require('../controllers/exportController');
const { protect } = require('../middleware/auth');
const mockUser = require('../middleware/mockUser');

// Use mockUser for development
router.use(mockUser); // Dev only - replace with protect in production

router.get('/csv', exportCSV);
router.get('/json', exportJSON);
router.post('/import', importData);
router.post('/reset', resetData);

module.exports = router;
