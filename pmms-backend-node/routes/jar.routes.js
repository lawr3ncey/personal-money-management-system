const express = require('express');
const router = express.Router();
const {
  getJars,
  getJar,
  createJar,
  updateJar,
  deleteJar,
  adjustJar
} = require('../controllers/jarController');
const { protect } = require('../middleware/auth');
const { createJarValidator, adjustJarValidator } = require('../utils/validators');
const { validate } = require('../middleware/validate');
const mockUser = require('../middleware/mockUser');

// TODO: Re-enable authentication in production
// router.use(protect);
router.use(mockUser); // Dev only - remove in production

router.route('/')
  .get(getJars)
  .post(createJarValidator, validate, createJar);

router.route('/:id')
  .get(getJar)
  .put(updateJar)
  .delete(deleteJar);

router.post('/:id/adjust', adjustJarValidator, validate, adjustJar);

module.exports = router;
