const router = require('express').Router();

const passport = require('passport');
const { authMiddleware } = require('../../../utils/auth');
const { authSuccess, authFailed } = require('../../../controllers/strava/strava-controller');

// /api/strava/auth/strava
router.route('/auth/strava').get((req, res, next) => {
  passport.authenticate('strava')(req, res, next);
});

// /api/strava/auth/strava/callback
router
  .route('/auth/strava/callback')
  .get(
    passport.authenticate('strava', { failureRedirect: '/api/strava/auth/strava/failure' }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/api/strava/auth/strava/success');
    }
  );

// /api/fitbit/auth/fitbit/success
router.route('/auth/strava/success').get(authSuccess);

// /api/fitbit/auth/fitbit/failure
router.route('/auth/strava/failure').get(authFailed);

module.exports = router;
