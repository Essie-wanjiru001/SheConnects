import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://sheconnects-api.onrender.com/api/scholarships'
  : 'http://localhost:8000/api/scholarships';

export const getScholarships = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log('API Response:', response.data);
    return response.data; // Should contain { scholarships: [...] }
  } catch (error) {
    console.error('Service error details:', error);
    throw error;
  }
};