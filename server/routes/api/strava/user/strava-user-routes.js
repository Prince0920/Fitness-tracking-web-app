const router = require('express').Router();

const passport = require('passport');
const { authMiddleware } = require('../../../../utils/auth');
const {
  authSuccess,
  authFailed,
  isLogin,
  disconnect,
} = require('../../../../controllers/strava/user/strava-user-controller');

// /api/strava/auth/strava
router.route('/auth/strava').get(authMiddleware, (req, res, next) => {
  passport.authenticate('strava', {
    state: req.user._id,
    // activity:read_all
    // activity:write,read
    scope: 'activity:read_all'
  })(req, res, next);
});

// /api/strava/auth/strava/callback
router.route('/auth/strava/callback').get(
  passport.authenticate('strava', {
    failureRedirect: '/api/strava/auth/strava/failure',
    session: false,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/api/strava/auth/strava/success');
  }
);

// /api/strava/auth/strava/success
router.route('/auth/strava/success').get(authSuccess);

// /api/strava/auth/strava/failure
router.route('/auth/strava/failure').get(authFailed);

// /api/strava/isLogin
router.route('/isLogin').get(authMiddleware, isLogin);

// /api/strava/disconnect
router.route('/disconnect').delete(authMiddleware, disconnect);

module.exports = router;
