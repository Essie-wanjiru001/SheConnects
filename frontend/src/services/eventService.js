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

export const getTopEvents = async () => {
  try {
    console.log('Fetching top events...');
    const response = await api.get('/api/events');
    console.log('Top events response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching top events:', error);
    throw error;
  }
};

export const getUpcomingEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/events/upcoming`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch upcoming events');
  }
};

export const updateEventAttendance = async (eventId, status) => {
  try {
    const response = await api.post(`/api/events/${eventId}/attendance`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating event attendance:', error);
    throw error;
  }
};

export const submitEventFeedback = async (eventId, feedback) => {
  try {
    const response = await api.post(`/api/events/${eventId}/feedback`, feedback);
    return response.data;
  } catch (error) {
    console.error('Error submitting event feedback:', error);
    throw error;
  }
};