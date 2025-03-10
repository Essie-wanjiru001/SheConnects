import api, { endpoints } from '../config/api';

export const getScholarships = async () => {
  try {
    const response = await api.get(endpoints.scholarships);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch scholarships:', error);
    throw error;
  }
};