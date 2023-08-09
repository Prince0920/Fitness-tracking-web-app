// const { Cardio, User } = require("../models");
const mongoose = require('mongoose');
const axios = require('axios');
const passport = require('passport');
const Fitbit = require('../../../models/Fitbit');
const {
  todayActivityData,
  activityDataByDateRange,
  lifeTimeStaticsData,
  activityGoalForPeriod,
} = require('../helper/helper');
const FitnessData = require('../../../models/FitnessData');
const { CLIENT_URL } = require('../../../config/CONSTANT');
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
      res.redirect(`${CLIENT_URL}/admin/fitbit/dashboard`);
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
        isSync: fitbitData.isSync
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

      // deleting the fitness data that is stored in a db.
      await FitnessData.deleteMany({ userId: user._id, source: 'fitbit' });
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

      const data = await activityGoalForPeriod(profileId, accessToken, query.period);
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

      const data = await lifeTimeStaticsData(profileId, accessToken);
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

      const data = await todayActivityData(profileId, accessToken);
      res.json(data);
    } catch (error) {
      console.error('Error in disconnect:', error);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  },

  // Getting data directly using Fitbit API.
  // async getActivityTimeseriesByDateRange(req, res) {
  //   try {
  //     const { user, query } = req;
  //     const fitbitData = await Fitbit.findOne({ userId: user._id });
  //     if (!fitbitData) {
  //       return res.status(409).json({ message: 'Cannot find a user with this id!' });
  //     }
  //     const profileId = fitbitData.profileId;
  //     const accessToken = fitbitData.access_token;

  //     const activity = query.activity;
  //     const startDate = query.startDate;
  //     const endDate = query.endDate;

  //     const data = await activityDataByDateRange(
  //       profileId,
  //       accessToken,
  //       activity,
  //       startDate,
  //       endDate
  //     );
  //     res.json(data);
  //   } catch (error) {
  //     console.error('Error in disconnect:', error);
  //     return res.status(500).json({ message: 'Something went wrong!' });
  //   }
  // },

  // Getting data directly from db.
  async getActivityTimeseriesByDateRange(req, res) {
    try {
      const { user, query } = req;
      const fitbitData = await Fitbit.findOne({ userId: user._id });
      if (!fitbitData) {
        return res.status(409).json({ message: 'Cannot find a user with this id!' });
      }
      const profileId = fitbitData.profileId;
      const accessToken = fitbitData.access_token;

      const activity = query.activity;
      const startDate = query.startDate;
      const endDate = query.endDate;
      const data = await activityDataByDateRange(
        profileId,
        accessToken,
        activity,
        startDate,
        endDate
      );
      const _data = await FitnessData.find({
        deviceProfileId: profileId,
        data_type: activity,
        date: { $gte: startDate, $lt: endDate },
      });

      // For making respose compartible with above data
      const _response = _data.map(data => {
        return {
          value: data.data_value,
          dateTime: data.date,
        };
      });
      let key = 'activities-tracker-' + activity;
      let _resp = {
        [key]: _response,
      };

      res.json(_resp);
    } catch (error) {
      console.error('Error in disconnect:', error);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  },
};
