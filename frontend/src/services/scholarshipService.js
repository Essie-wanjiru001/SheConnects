import axios from 'axios';

const API_URL = 'http://localhost:8000/api/scholarships';

export const getScholarships = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('API Response:', response.data); // Add response logging
    return response.data;
  } catch (error) {
    console.error('Service error details:', error.response || error); // Improved error logging
    throw error.response?.data || { message: 'Failed to fetch scholarships' };
  }
};