const router = require('express').Router();

const {
  sampleFitbit,
  authSuccess,
  authFailed,
  fitbitAuthenticate,
  createFitbit,
} = require('../../../controllers/fitbit/fitbit-controller');
const { authMiddleware } = require('../../../utils/auth');

// /api/fitbit/testing
router.route('/testing').get(sampleFitbit);

// /api/fitbit/auth/fitbit
router.route('/auth/fitbit').get(authMiddleware, fitbitAuthenticate);

// /api/fitbit/auth/fitbit/callback
router.route('/auth/fitbit/callback').get(fitbitAuthenticate);

// /api/fitbit/auth/fitbit/success
router.route('/auth/fitbit/success').get(authSuccess);

// /api/fitbit/auth/fitbit/failure
router.route('/auth/fitbit/failure').get(authFailed);

// /api/fitbit/createFitbit
router.route('/createFitbit').post(authMiddleware, createFitbit);

module.exports = router;
