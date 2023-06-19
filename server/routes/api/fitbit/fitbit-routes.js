const router = require('express').Router();

const passport = require('passport');
const {
  sampleFitbit,
  authSuccess,
  authFailed,
  updateFitbit,
  isLogin,
  disconnect
} = require('../../../controllers/fitbit/fitbit-controller');
const { authMiddleware } = require('../../../utils/auth');

// /api/fitbit/testing
router.route('/testing').get(sampleFitbit);

// /api/fitbit/auth/fitbit
router
  .route('/auth/fitbit')
  .get(
    authMiddleware,
    passport.authenticate('fitbit', { scope: ['activity', 'heartrate', 'location', 'profile'] })
  );

// /api/fitbit/auth/fitbit/callback
router.route('/auth/fitbit/callback').get(
  passport.authenticate('fitbit', { failureRedirect: '/api/fitbit/auth/fitbit/failure' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/api/fitbit/auth/fitbit/success');
  }
);

// /api/fitbit/auth/fitbit/success
router.route('/auth/fitbit/success').get(authSuccess);

// /api/fitbit/auth/fitbit/failure
router.route('/auth/fitbit/failure').get(authFailed);

// /api/fitbit/updateFitbit
router.route('/updateFitbit').post(authMiddleware, updateFitbit);

// /api/fitbit/isLogin
router.route('/isLogin').get(authMiddleware, isLogin);

// /api/fitbit/disconnect
router.route('/disconnect').delete(authMiddleware, disconnect);

module.exports = router;
