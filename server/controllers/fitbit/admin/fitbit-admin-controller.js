const mongoose = require('mongoose');
const axios = require('axios');
const {
  todayActivityData,
  activityDataByDateRange,
  lifeTimeStaticsData,
  activityGoalForPeriod,
} = require('../helper/helper');
const getDateRangeByPeriod = require('../../../utils/getDateRangeByPeriod');
const FitnessData = require('../../../models/FitnessData');
const Fitbit = require('../../../models/Fitbit');

module.exports = {
  // Admin apple login
  async syncData(req, res) {
    try {
      const { user } = req;
      const fitbitData = await Fitbit.findOne({ userId: user._id });
      if (!fitbitData) {
        return res.status(409).json({ message: 'Cannot find a user with this id!' });
      }
      const profileId = fitbitData.profileId;
      const accessToken = fitbitData.access_token;

      const userId = user._id;
      const source = req.body.source;
      const currentDate = new Date();
      const timestamp = currentDate.toISOString();

      // Today Data starts----------------------------------------------------
      const todayData = await todayActivityData(profileId, accessToken);

      const todayStep = todayData?.summary?.steps;
      const todayCalorie = todayData?.summary?.caloriesOut;
      const todayDistance = todayData?.summary?.distances[0]?.distance;
      // Today Data ends----------------------------------------------------

      const getSum = data => {
        return data.reduce((tot, item) => {
          return tot + Number(item.value);
        }, 0);
      };

      // 'Last Week' 'Last Quarter' 'Last Year'
      const lastWeek = getDateRangeByPeriod('Last Week');
      const lastQuarter = getDateRangeByPeriod('Last Quarter');
      const lastYear = getDateRangeByPeriod('Last Year');

      // Steps data according to period starts............................
      const weeklyStepData = await activityDataByDateRange(
        profileId,
        accessToken,
        'steps',
        lastWeek.startdate,
        lastWeek.enddate
      );
      const lastWeekStepData = getSum(weeklyStepData[`activities-tracker-steps`]);

      const quaterlyStepData = await activityDataByDateRange(
        profileId,
        accessToken,
        'steps',
        lastQuarter.startdate,
        lastQuarter.enddate
      );
      const lastQuaterStepData = getSum(quaterlyStepData[`activities-tracker-steps`]);

      const yearlyStepData = await activityDataByDateRange(
        profileId,
        accessToken,
        'steps',
        lastYear.startdate,
        lastYear.enddate
      );
      const lastYearStepData = getSum(yearlyStepData[`activities-tracker-steps`]);
      // Steps data according to period ends............................

      // Calories data according to period starts............................
      const weeklyCalorieData = await activityDataByDateRange(
        profileId,
        accessToken,
        'calories',
        lastWeek.startdate,
        lastWeek.enddate
      );
      const lastWeekCalorieData = getSum(weeklyCalorieData[`activities-tracker-calories`]);

      const quaterlyCalorieData = await activityDataByDateRange(
        profileId,
        accessToken,
        'calories',
        lastQuarter.startdate,
        lastQuarter.enddate
      );
      const lastQuaterCalorieData = getSum(quaterlyCalorieData[`activities-tracker-calories`]);

      const yearlyCalorieData = await activityDataByDateRange(
        profileId,
        accessToken,
        'calories',
        lastYear.startdate,
        lastYear.enddate
      );
      const lastYearCalorieData = getSum(yearlyCalorieData[`activities-tracker-calories`]);
      // Calories data according to period ends............................

      // Distance data according to period starts............................
      const weeklyDistanceData = await activityDataByDateRange(
        profileId,
        accessToken,
        'distance',
        lastWeek.startdate,
        lastWeek.enddate
      );
      const lastWeekDistanceData = getSum(weeklyDistanceData[`activities-tracker-distance`]);

      const quaterlyDistanceData = await activityDataByDateRange(
        profileId,
        accessToken,
        'distance',
        lastQuarter.startdate,
        lastQuarter.enddate
      );
      const lastQuaterDistanceData = getSum(quaterlyDistanceData[`activities-tracker-distance`]);

      const yearlyDistanceData = await activityDataByDateRange(
        profileId,
        accessToken,
        'distance',
        lastYear.startdate,
        lastYear.enddate
      );
      const lastYearDistanceData = getSum(yearlyDistanceData[`activities-tracker-distance`]);
      // Distance data according to period ends............................

      // Steps sync Start-------------------------------------------------------------------
      const stepFilter = {
        userId: userId,
        source: source,
        data_type: 'steps',
      };
      const stepUpdate = {
        timestamp: timestamp,
        data_value: todayStep,
        unit: 'Steps',
        additional_metadata: {
          lastWeek: lastWeekStepData,
          lastQuarter: lastQuaterStepData,
          lastYear: lastYearStepData,
        },
      };
      const stepData = await FitnessData.findOneAndUpdate(stepFilter, stepUpdate, {
        new: true,
        upsert: true, // Make this update into an upsert
      });
      // Steps sync End-------------------------------------------------------------------

      // Calorie sync Start-------------------------------------------------------------------
      const calorieFilter = {
        userId: userId,
        source: source,
        data_type: 'calories',
      };
      const calorieUpdate = {
        timestamp: timestamp,
        data_value: todayCalorie,
        unit: 'KCal',
        additional_metadata: {
          lastWeek: lastWeekCalorieData,
          lastQuarter: lastQuaterCalorieData,
          lastYear: lastYearCalorieData,
        },
      };
      const calorieData = await FitnessData.findOneAndUpdate(calorieFilter, calorieUpdate, {
        new: true,
        upsert: true, // Make this update into an upsert
      });
      // Calorie sync End-------------------------------------------------------------------

      // Distance sync Start-------------------------------------------------------------------
      const distanceFilter = {
        userId: userId,
        source: source,
        data_type: 'distance',
      };
      const distanceUpdate = {
        timestamp: timestamp,
        data_value: todayDistance,
        unit: 'KM',
        additional_metadata: {
          lastWeek: lastWeekDistanceData,
          lastQuarter: lastQuaterDistanceData,
          lastYear: lastYearDistanceData,
        },
      };
      const distanceData = await FitnessData.findOneAndUpdate(distanceFilter, distanceUpdate, {
        new: true,
        upsert: true, // Make this update into an upsert
      });
      // Distance sync End-------------------------------------------------------------------

      res.json({ message: 'Success' });
    } catch (error) {
      console.log('error syncData: ', error);
      res.status(500).json({ message: 'Something went wrong!' });
    }
  },
};
