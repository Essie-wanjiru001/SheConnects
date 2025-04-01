import api from '../config/api';

export const submitFeedback = async (formData) => {
  try {
    const response = await api.post('/api/feedback', formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

export const getUserFeedbacks = async () => {
  try {
    const response = await api.get('/api/feedback/my-feedbacks');
    return response.data.feedbacks;
  } catch (error) {
    console.error('Error fetching user feedbacks:', error);
    throw error;
  }
};

export const getAllFeedbacks = async () => {
  try {
    const response = await api.get('/api/feedback/all');
    return response.data.feedbacks;
  } catch (error) {
    console.error('Error fetching all feedbacks:', error);
    throw error;
  }
};

export const updateFeedbackStatus = async (feedbackId, status) => {
  try {
    const response = await api.patch(`/api/feedback/${feedbackId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating feedback status:', error);
    throw error;
  }
};