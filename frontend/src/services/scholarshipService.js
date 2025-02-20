import axios from 'axios';

const API_URL = 'http://localhost:8000/api/scholarships';

export const getScholarships = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Failed to fetch scholarships' };
  }
};