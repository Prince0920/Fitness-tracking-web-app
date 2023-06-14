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
    successRedirect: "http://localhost:3132/admin/fitbit/dashboard",
    failureRedirect: '/api/fitbit/auth/fitbit/failure',
  }),

  // Fitbit authentication success
  authSuccess(req, res) {
    console.log("authSuccess", req.user)
    if (req.user) {
      res.status(200).json({
        error: false,
        message: "Successfully Loged In",
        user: req.user,
      });
    } else {
      res.status(403).json({ error: true, message: "Not Authorized" });
    }
  },

  // Fitbit authentication failed
  authFailed({ body }, res) {
    res.json({ message: 'Authentication failed with fitbit!' });
  },
};
