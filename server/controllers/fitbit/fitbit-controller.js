// const { Cardio, User } = require("../models");
const passport = require('passport');
const Fitbit = require('../../models/Fitbit');
const FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;

module.exports = {
  // Testing fitbit routing
  sampleFitbit(req, res) {
    try {
      res.json({ message: 'Fitbit Api setup successfully!' + JSON.stringify(req.user) });
    } catch (error) {
      console.log('error in sampleFitbit', error);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  },

  // Fitbit authentication success
  async authSuccess(req, res) {
    try {
      res.redirect(`http://localhost:3132/admin/fitbit/dashboard`);
    } catch (error) {
      console.error('Error in authSuccess:', error);
      return res.status(500).json("Something went wrong!");
    }
  },

  // Fitbit authentication failed
  authFailed({ body }, res) {
    try {
      res.json({ message: 'Authentication failed with fitbit!' });
    } catch (error) {
      console.error('Error in authFailed:', error);
      return res.status(500).json("Something went wrong!");
    }
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
      console.error('Error in isLogin:', error);
      return res.status(500).json({ message: 'Something went wrong!' });
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
      console.error('Error in disconnect:', error);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  },
};
