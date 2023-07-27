const axios = require('axios');
const { STRAVA_API_BASE_URL } = require('../../../config/CONSTANT');

module.exports = {
  // Getting all activities.
  allActivities: async accessToken => {
    try {
      const url = `${STRAVA_API_BASE_URL}/activities`;
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
      const url = `${STRAVA_API_BASE_URL}/activities/${id}`;
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
