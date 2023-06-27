// const { Cardio, User } = require("../models");
const mongoose = require('mongoose');
const axios = require('axios');
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
      return res.status(500).json('Something went wrong!');
    }
  },

  // Fitbit authentication failed
  authFailed({ body }, res) {
    try {
      res.json({ message: 'Authentication failed with fitbit!' });
    } catch (error) {
      console.error('Error in authFailed:', error);
      return res.status(500).json('Something went wrong!');
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

  async getActivityGoals(req, res) {
    try {
      const { user, query } = req;
      const fitbitData = await Fitbit.findOne({ userId: user._id });
      if (!fitbitData) {
        return res.status(409).json({ message: 'Cannot find a user with this id!' });
      }
      const profileId = fitbitData.profileId;
      const accessToken = fitbitData.access_token;

      const url = `${process.env.FITBIT_API_BASE_URL}/1/user/${profileId}/activities/goals/${query.period}.json`;
      const { data } = await axios.get(url, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      res.json(data);
    } catch (error) {
      console.error('Error in disconnect:', error);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  },

  async getLifetimeStatics(req, res) {
    try {
      const { user } = req;
      const fitbitData = await Fitbit.findOne({ userId: user._id });
      if (!fitbitData) {
        return res.status(409).json({ message: 'Cannot find a user with this id!' });
      }
      const profileId = fitbitData.profileId;
      const accessToken = fitbitData.access_token;

      const url = `${process.env.FITBIT_API_BASE_URL}/1/user/${profileId}/activities.json`;
      const { data } = await axios.get(url, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      res.json(data);
    } catch (error) {
      console.error('Error in disconnect:', error);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  },

  async getDailyActivitySummary(req, res) {
    try {
      const { user } = req;
      const fitbitData = await Fitbit.findOne({ userId: user._id });
      if (!fitbitData) {
        return res.status(409).json({ message: 'Cannot find a user with this id!' });
      }
      const profileId = fitbitData.profileId;
      const accessToken = fitbitData.access_token;

      // Getting today date.
      let date = new Date();
      date.toISOString().split('T')[0];
      const offset = date.getTimezoneOffset();
      date = new Date(date.getTime() - offset * 60 * 1000);
      const todayDate = date.toISOString().split('T')[0];

      const url = `${process.env.FITBIT_API_BASE_URL}/1/user/${profileId}/activities/date/${todayDate}.json`;
      const { data } = await axios.get(url, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      res.json(data);
    } catch (error) {
      console.error('Error in disconnect:', error);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  },
};
