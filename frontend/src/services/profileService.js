import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users/profile';

export const updateProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.put(API_URL, profileData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to update profile' };
  }
};

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch profile' };
  }
};