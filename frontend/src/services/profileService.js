import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users';

export const updateProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('userToken');
    const response = await axios.put(`${API_URL}/profile`, profileData, {
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
  const token = localStorage.getItem('userToken');
  console.log('Auth Token:', token); // Debug log

  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('Profile Response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Profile Service Error:', error.response || error); // Debug log
    throw error.response?.data || { error: 'Failed to fetch profile data' };
  }
};