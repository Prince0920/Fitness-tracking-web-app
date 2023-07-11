import axios from 'axios';
import { SERVER_URL } from '../../constant';

// Auth API Starts ---------------------------------------------

export const login = async loginFromDetail => {
  try {
    const url = SERVER_URL + '/api/user/login';

    const resp = await axios.post(url, loginFromDetail);
    return resp;
  } catch (error) {
    console.log('Login Api error', error);
    return error.response;
  }
};

export const signUp = async registerBody => {
  try {
    const url = SERVER_URL + '/api/user';
    const resp = await axios.post(url, registerBody);
    return resp;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const forgotPassword = async forgotFromDetail => {
  try {
    const url = SERVER_URL + '/api/user/requestResetPassword';
    const resp = await axios.post(url, forgotFromDetail);
    return resp;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const resetPassword = async (token, userId, newPassword) => {
  try {
    const url = SERVER_URL + '/api/user/resetPassword';
    const resp = await axios.post(url, {
      token,
      userId,
      password: newPassword,
    });
    return resp;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

// Auth API Ends ---------------------------------------------

// Profile API Starts -------------------------------------------

export const getProfile = async token => {
  try {
    const url = SERVER_URL + '/api/user/profile';
    const userProfile = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return userProfile;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const updateProfile = async (profileData, token) => {
  try {
    const url = SERVER_URL + '/api/user/profile';
    const updatedProfile = await axios.put(url, profileData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return updatedProfile;
  } catch (error) {
    console.log('error updateProfile', error);
    return error.response;
  }
};

// Profile API Ends -------------------------------------------

// Fitbit API  Starts--------------------------------------------------------------------
export const fitbitAuth = async token => {
  try {
    window.open(
      `${SERVER_URL}/api/fitbit/auth/fitbit?token=${localStorage.getItem('token')}`,
      '_self'
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fitbitSuccess = async token => {
  try {
    const url = SERVER_URL + '/api/fitbit/auth/fitbit/success';
    const data = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const isFitbitLogin = async token => {
  try {
    const url = SERVER_URL + '/api/fitbit/isLogin';
    const data = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const disconnectFitbit = async token => {
  try {
    const url = SERVER_URL + '/api/fitbit/disconnect';
    const data = await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const getActivityGoals = async (token, period = 'daily') => {
  try {
    const url = SERVER_URL + `/api/fitbit/getActivityGoals?period=${period}`;
    const data = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const getDailyActivitySummary = async token => {
  try {
    const url = SERVER_URL + `/api/fitbit/getDailyActivitySummary`;
    const data = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

export const getActivityTimeseriesByDateRange = async (token, activity, startDate, endDate) => {
  try {
    const url =
      SERVER_URL +
      `/api/fitbit/get-activity-timeseries-by-date-range?activity=${activity}&startDate=${startDate}&endDate=${endDate}`;
    const data = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};

export const getLifetimeStatics = async token => {
  try {
    const url = SERVER_URL + `/api/fitbit/getLifetimeStatics`;
    const data = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    throw error.response;
  }
};
// Fitbit API  Ends--------------------------------------------------------------------


// Strava API  Starts--------------------------------------------------------------------
export const stravaAuth = async token => {
  try {
    window.open(
      `${SERVER_URL}/api/strava/auth/strava?token=${localStorage.getItem('token')}`,
      '_self'
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Strava api ends----------------------------------------------------------------------
// User api starts --------------------------------------------------------------------

export const getUsers = async token => {
  try {
    const url = SERVER_URL + '/api/admin/users';
    const data = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const getUser = async (token, id) => {
  try {
    const url = SERVER_URL + `/api/admin/user/${id}`;
    const data = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const createUser = async (token, body) => {
  try {
    const url = SERVER_URL + `/api/admin/createUser`;
    const data = await axios.post(url, body, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const updateUser = async (token, id, body) => {
  try {
    const url = SERVER_URL + `/api/admin/user/${id}`;
    const data = await axios.put(url, body, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const deleteUser = async (token, id) => {
  try {
    const url = SERVER_URL + `/api/admin/user/${id}`;
    const data = await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

// User api ends ----------------------------------------------------------------------
