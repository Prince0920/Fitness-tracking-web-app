const router = require('express').Router();

const passport = require('passport');
const {
  sampleFitbit,
  authSuccess,
  authFailed,
  isLogin,
  disconnect,
  getActivityGoals,
  getLifetimeStatics,
  getTodayStatics,
} = require('../../../controllers/fitbit/fitbit-controller');
const { authMiddleware, ensureFitibitAuthenticated } = require('../../../utils/auth');

// /api/fitbit/testing
router.route('/testing').get(sampleFitbit);

// /api/fitbit/auth/fitbit
router.route('/auth/fitbit').get(authMiddleware, (req, res, next) => {
  passport.authenticate('fitbit', {
    scope: ['activity', 'heartrate', 'location', 'profile'],
    state: req.user._id,
  })(req, res, next);
});

// /api/fitbit/auth/fitbit/callback
router
  .route('/auth/fitbit/callback')
  .get(
    passport.authenticate('fitbit', { failureRedirect: '/api/fitbit/auth/fitbit/failure' }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/api/fitbit/auth/fitbit/success');
    }
  );

// /api/fitbit/auth/fitbit/success
router.route('/auth/fitbit/success').get(authSuccess);

// /api/fitbit/auth/fitbit/failure
router.route('/auth/fitbit/failure').get(authFailed);

// /api/fitbit/isLogin
router.route('/isLogin').get(authMiddleware, isLogin);

// /api/fitbit/disconnect
router.route('/disconnect').delete(authMiddleware, disconnect);

// /api/fitbit/getActivityGoals
router.route('/getActivityGoals').get(authMiddleware, ensureFitibitAuthenticated, getActivityGoals);

// /api/fitbit/getLifetimeStatics
router.route('/getLifetimeStatics').get(authMiddleware, ensureFitibitAuthenticated, getLifetimeStatics);

module.exports = router;
