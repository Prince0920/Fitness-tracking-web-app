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

  // Insert corresponding user id in fitbit model
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

  // Checking if user already login
  async isLogin(req, res) {
    try {
      const { user } = req;
      const fitbitData = await Fitbit.findOne({ userId: user._id });
      if (!fitbitData) {
        return res.status(409).json({ message: 'Cannot find a user with this id!' });
      }

      return res.json({
        profileId: fitbitData.profileId,
        provider: 'fitbit',
        displayName: fitbitData.profile.displayName,
      });
    } catch (error) {
      return res.status(400).json({ message: 'Something went wrong!' });
    }
  },

  async disconnect(req, res) {
    try {
      const { user } = req;
      const fitbitData = await Fitbit.deleteOne({ userId: user._id });
      if (!fitbitData) {
        return res.status(409).json({ message: 'Cannot find a user with this id!' });
      }

      return res.json(fitbitData);
    } catch (error) {
      return res.status(400).json({ message: 'Something went wrong!' });
    }
  },
};
