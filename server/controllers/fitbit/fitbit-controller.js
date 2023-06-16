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
    res.redirect(
      `http://localhost:3132/admin/fitbit/exchange?accessToken=${req.user.accessToken}&refreshToken=${req.user.refreshToken}`
    );
  },

  // Fitbit authentication failed
  authFailed({ body }, res) {
    res.json({ message: 'Authentication failed with fitbit!' });
  },

  // Fitbit authentication failed
  createFitbit(req, res) {
    // console.log('Access                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                : ', req.body.accessToken);
    // console.log('____________________________________');
    // console.log('Refresh Token: ', req.body.refreshToken);
    // console.log('____________________________________');
    // console.log('req user: ', req.user);
    // console.log('____________________________________');
    // res.redirect(`http://localhost:3132/admin/fitbit/dashboard`);

    res.json({ message: 'Authentication success!' });
  },
};
