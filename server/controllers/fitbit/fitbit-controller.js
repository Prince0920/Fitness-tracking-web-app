// const { Cardio, User } = require("../models");
const passport = require('passport');
const FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;

module.exports = {
  // Testing fitbit routing
  sampleFitbit(req, res) {
    // console.log(req.user.accessToken);
    res.json({ message: 'Fitbit Api setup successfully!' + JSON.stringify(req.user) });
  },

  fitbitAuthenticate: passport.authenticate('fitbit', {
    successRedirect: '/api/fitbit/auth/fitbit/success',
    failureRedirect: '/api/fitbit/auth/fitbit/failure',
  }),

  // Fitbit authentication success
  authSuccess(req, res) {
    console.log("authSuccess", req.user);
    res.redirect('http://localhost:3132/admin/fitbit/dashboard');
  },

  // Fitbit authentication failed
  authFailed({ body }, res) {
    res.json({ message: 'Authentication failed with fitbit!' });
  },
};
