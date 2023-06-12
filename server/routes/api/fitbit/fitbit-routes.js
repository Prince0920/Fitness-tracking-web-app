const router = require('express').Router();

const {
  sampleFitbit,
  authSuccess,
  authFailed,
  fitbitAuthenticate,
} = require('../../../controllers/fitbit/fitbit-controller');

// /api/fitbit/testing
router.route('/testing').get(sampleFitbit);

// /api/fitbit/auth/fitbit
router.route('/auth/fitbit').get(fitbitAuthenticate);

// /api/fitbit/auth/fitbit/callback
router.route('/auth/fitbit/callback').get(fitbitAuthenticate);

// /api/fitbit/auth/fitbit/success
router.route('/auth/fitbit/success').get(authSuccess);

// /api/fitbit/auth/fitbit/failure
router.route('/auth/fitbit/failure').get(authFailed);

module.exports = router;
