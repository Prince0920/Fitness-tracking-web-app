const mongoose = require('mongoose');
const axios = require('axios');
const { todayActivityData, activityDataByDateRange, lifeTimeStaticsData } = require('../helper/helper');

module.exports = {
  // Admin apple login
  async syncData(req, res) {
    try {
      // const { user } = req;
      // const fitbitData = await Fitbit.findOne({ userId: user._id });
      // console.log("fitbitData", fitbitData)
      // if (!fitbitData) {
      //   return res.status(409).json({ message: 'Cannot find a user with this id!' });
      // }
      // const profileId = fitbitData.profileId;
      // const accessToken = fitbitData.access_token;

      const profileId = 'BMBNCG';
      const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1FYWjciLCJzdWIiOiJCTUJOQ0ciLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJybG9jIHJhY3QgcmhyIHJwcm8iLCJleHAiOjE2ODk5NDU2NzksImlhdCI6MTY4OTkxNjg3OX0.xUPqz0pOE1Kd2cNWiq0W_TzCjTyNKn9fDI6hxIDvotg';
      const todayData = await todayActivityData(profileId, accessToken);
      const activityDataByDate = await activityDataByDateRange(profileId, accessToken, 'steps', '2023-07-13', '2023-07-20');
      const lifetimeData = await lifeTimeStaticsData(profileId, accessToken);
      console.log("data: ", lifetimeData)
      res.json({message: 'Success'})
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong!' });
    }
  },
};