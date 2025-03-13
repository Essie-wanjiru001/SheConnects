import api from '../config/api';

export const getEvents = async () => {
  try {
    console.log('Fetching events...');
    const response = await api.get('/api/events');
    console.log('Events response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};