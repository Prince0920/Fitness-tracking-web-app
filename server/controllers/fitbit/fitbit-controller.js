// const { Cardio, User } = require("../models");
const passport = require('passport');
const Fitbit = require('../../models/Fitbit');
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
  async authSuccess(req, res) {
    try {
      const fitbit_data = await Fitbit.create({
        access_token: req.user.accessToken,
        refresh_token: req.user.refreshToken,
        profile: req.user.profile,
      });
      console.log(fitbit_data);
      res.redirect(
        `http://localhost:3132/admin/fitbit/exchange?fitbitMongoId=${fitbit_data._id}`
      );
    } catch (error) {
      console.log(error)
    }
  },

  // Fitbit authentication failed
  authFailed({ body }, res) {
    res.json({ message: 'Authentication failed with fitbit!' });
  },

  // Fitbit authentication failed
  async createFitbit(req, res) {
    // console.log('Access                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                : ', req.body.accessToken);
    // console.log('____________________________________');
    // console.log('Refresh Token: ', req.body.refreshToken);
    // console.log('____________________________________');
    // console.log('req user: ', req.user);
    // console.log('____________________________________');
    // res.redirect(`http://localhost:3132/admin/fitbit/dashboard`);
    console.log("fitbitMongoId", req.body.fitbitMongoId);
    console.log("req.user", req.user._id);

    await Fitbit.findOneAndUpdate({ _id: req.body.fitbitMongoId }, {
      userId: req.user._id
    }, { new: true });
    res.json({ message: 'Authentication success!' });
  },
};
