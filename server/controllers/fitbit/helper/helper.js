const axios = require('axios');

module.exports = {
  // Getting data for today.
  todayActivityData: async (profileId, accessToken) => {
    try {
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
      return data;
    } catch (error) {
      console.log('Error in todayActivityData', error);
      return error;
    }
  },

  // Getting data for a perticular activity based on date range.
  activityDataByDateRange: async (profileId, accessToken, activity, startDate, endDate) => {
    try {
      const url = `${process.env.FITBIT_API_BASE_URL}/1/user/${profileId}/activities/tracker/${activity}/date/${startDate}/${endDate}.json`;
      const { data } = await axios.get(url, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      return data;
    } catch (error) {
      console.log('Error in activityDataByDateRange', error);
      return error;
    }
  },

  // Getting data for lifetime
  lifeTimeStaticsData: async (profileId, accessToken) => {
    try {
      const url = `${process.env.FITBIT_API_BASE_URL}/1/user/${profileId}/activities.json`;
      const { data } = await axios.get(url, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      return data;
    } catch (error) {
      console.error('Error in lifeTimeStaticsData:', error);
      return res.status(500).json({ message: 'Something went wrong!' });
    }
  },

  // Getting data for period [ Supported period  = daily| weekly ].
  activityGoalForPeriod: async (profileId, accessToken, period) => {
    try {
      const url = `${process.env.FITBIT_API_BASE_URL}/1/user/${profileId}/activities/goals/${period}.json`;
      const { data } = await axios.get(url, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      return data;
    } catch (error) {
      console.log('Error in todayActivityData', error);
      return error;
    }
  },
};
