import api from '../config/api';

export const searchAll = async ({ search, type, category }) => {
  try {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (type) params.append('type', type);
    if (category) params.append('category', category);
    
    const response = await api.get(`/api/search?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};