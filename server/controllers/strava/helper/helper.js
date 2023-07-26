const axios = require('axios');

module.exports = {
  // Getting all activities.
  allActivities: async accessToken => {
    try {
      const url = `${process.env.STRAVA_API_BASE_URL}/activities`;
      const { data } = await axios.get(url, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      return data;
    } catch (error) {
      console.log('Error in todayActivityData', error);
      return error;
    }
  },

  // Perticular activity detail
  getActivityById: async (id, accessToken) => {
    try {
      const url = `${process.env.STRAVA_API_BASE_URL}/activities/${id}`;
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
