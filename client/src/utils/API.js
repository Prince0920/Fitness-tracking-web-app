import { SERVER_URL } from '../constant';
import axios from 'axios';

export const getProfile = async token => {
  try {
    const url = SERVER_URL + '/api/user/profile';
    const userProfile = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return userProfile;
  } catch (error) {
    console.log(error);
    return error.response
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
    console.log(error);
    return error.response
  }
};

// Fitbit API  Starts--------------------------------------------------------------------
export const fitbitAuth = async token => {
  try {
    window.open(
      `${SERVER_URL}/api/fitbit/auth/fitbit?token=${localStorage.getItem('token')}`,
      '_self'
    );
  } catch (error) {
    console.log(error);
    return error.response
  }
};

export const fitbitSuccess = async token => {
  try {
    const url = SERVER_URL + '/api/fitbit/auth/fitbit/success';
    const data = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    return error.response
  }
};

export const updateFitbit = async (token, body) => {
  try {
    const url = SERVER_URL + '/api/fitbit/updateFitbit';
    const data = await axios.post(url, body, { headers: { Authorization: `Bearer ${token}` } });
    console.log("data")
    return data;
  } catch (error) {
    console.log(error);
    return error.response
  }
};

export const isFitbitLogin = async token => {
  try {
    const url = SERVER_URL + '/api/fitbit/isLogin';
    const data = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    return error.response
  }
};

// Fitbit API  Ends--------------------------------------------------------------------

// User api starts --------------------------------------------------------------------

export const getUsers = async token => {
  try {
    const url = SERVER_URL + '/api/admin/users';
    const data = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    return error.response
  }
};

export const getUser = async (token, id) => {
  try {
    const url = SERVER_URL + `/api/admin/user/${id}`;
    const data = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    return error.response
  }
};
export const updateUser = async (token, id, body) => {
  try {
    const url = SERVER_URL + `/api/admin/user/${id}`;
    const data = await axios.put(url, body, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    return error.response
  }
};
export const deleteUser = async (token, id) => {
  try {
    const url = SERVER_URL + `/api/admin/user/${id}`;
    const data = await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    return error.response
  }
};

// User api ends ----------------------------------------------------------------------
