import { SERVER_URL } from '../constant';
import axios from 'axios';

export const getProfile = async token => {
  try {
    const url = SERVER_URL + '/api/user/profile';
    const userProfile = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return userProfile;
  } catch (error) {
    console.log(error);
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
  }
};
