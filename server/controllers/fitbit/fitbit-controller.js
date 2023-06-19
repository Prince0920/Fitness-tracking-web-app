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

  // Fitbit authentication success
  async authSuccess(req, res) {
    try {
      res.redirect(`http://localhost:3132/admin/fitbit/dashboard?profileId=${req.user.profileId}`);
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
  async updateFitbit(req, res) {
    await Fitbit.findOneAndUpdate(
      { profileId: req.body.profileId },
      {
        userId: req.user._id,
      },
      { new: true }
    );
    res.json({ message: 'Authentication success!' });
  },

  // Fitbit authentication failed
  async isLogin(req, res) {
    try {
      const { user, params } = req;
      const fitbitData = await Fitbit.findOne({ userId: req.user._id });
      if (!fitbitData) {
        return res.status(400).json({ message: 'Cannot find a user with this id!' });
      }

      res.json({ profileId: fitbitData.profileId, provider: 'fitbit' });
    } catch (error) {
      res.status(400).json({ message: 'Something went wrong!' });
    }
  },
};
