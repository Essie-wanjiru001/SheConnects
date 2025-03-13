import api from '../config/api';

export const getInternships = async () => {
  try {
    console.log('Fetching internships...');
    const response = await api.get('/api/internships');
    console.log('Internships response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching internships:', error);
    throw error;
  }
};

export const searchInternships = async (searchParams) => {
  try {
    const params = new URLSearchParams();
    if (searchParams.search) params.append('search', searchParams.search);
    if (searchParams.type) params.append('type', searchParams.type);
    
    const response = await api.get(`${endpoints.internships}/search?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};

export const getTopInternships = async () => {
  try {
    console.log('Fetching top internships...');
    const response = await api.get('/api/internships');
    console.log('Top internships response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching top internships:', error);
    throw error;
  }
};