import api from '../config/api';

export const getScholarships = async () => {
  try {
    console.log('Fetching scholarships...');
    const response = await api.get('/api/scholarships');
    console.log('Scholarships response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error in getScholarships:', error);
    throw error;
  }
};

export const searchScholarships = async (searchParams) => {
  try {
    const params = new URLSearchParams();
    if (searchParams.search) params.append('search', searchParams.search);
    if (searchParams.type) params.append('type', searchParams.type);
    
    const response = await api.get(`/api/scholarships/search?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

export const getAllScholarships = async () => {
  try {
    const response = await api.get('/api/scholarships');
    return response.data;
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    throw error;
  }
};

export const getTopScholarships = async () => {
  try {
    console.log('Fetching top scholarships...');
    const response = await api.get('/api/scholarships/top');
    console.log('Top scholarships response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching top scholarships:', error);
    throw error;
  }
};