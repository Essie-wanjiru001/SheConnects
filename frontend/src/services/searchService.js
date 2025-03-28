import api from '../config/api';

export const searchAll = async (params) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.term) queryParams.append('search', params.term);
    if (params.category && params.category !== 'all') {
      queryParams.append('category', params.category);
    }
    if (params.type) queryParams.append('type', params.type);
    
    console.log('Search params:', queryParams.toString()); // Debug log
    
    const response = await api.get(`/api/search?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    throw new Error(error.response?.data?.message || 'Search failed');
  }
};