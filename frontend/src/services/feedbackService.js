import api, { endpoints } from '../config/api';

export const submitFeedback = async (formData) => {
  try {
    const response = await api.post(endpoints.feedback.base, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw new Error(error.response?.data?.message || 'Failed to submit feedback');
  }
};

export const getUserFeedbacks = async () => {
  try {
    const response = await api.get(endpoints.feedback.myFeedbacks);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch feedbacks');
  }
};

export const getAllFeedbacks = async () => {
  try {
    const response = await api.get(endpoints.feedback.all);
    return response.data;
  } catch (error) {
    console.error('Error fetching all feedbacks:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch feedbacks');
  }
};

export const updateFeedbackStatus = async (feedbackId, status) => {
  try {
    const response = await api.patch(`${endpoints.feedback.base}/${feedbackId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating feedback status:', error);
    throw new Error(error.response?.data?.message || 'Failed to update feedback status');
  }
};