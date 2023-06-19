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
      const bodyData = {
        profileId: req.user.profile.id,
        access_token: req.user.accessToken,
        refresh_token: req.user.refreshToken,
        profile: req.user.profile,
      };
      const fitbit_data = await Fitbit.findOneAndUpdate(
        { profileId: req.user.profile.id },
        bodyData,
        {
          new: true,
          upsert: true,
        }
      );

      res.redirect(`http://localhost:3132/admin/fitbit/exchange?fitbitMongoId=${fitbit_data._id}`);
    } catch (error) {
      console.error('Error:', error);
      return res.status(409).json({ error });
    }
  },

  // Fitbit authentication failed
  authFailed({ body }, res) {
    res.json({ message: 'Authentication failed with fitbit!' });
  },

  // Fitbit authentication failed
  async createFitbit(req, res) {
    await Fitbit.findOneAndUpdate(
      { _id: req.body.fitbitMongoId },
      {
        userId: req.user._id,
      },
      { new: true }
    );
    res.json({ message: 'Authentication success!' });
  },
};
