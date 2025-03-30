import api, { endpoints } from '../config/api';
import { StorageUtils } from '../utils/storage';

// Get all internships
export const getInternships = async () => {
  try {
    const response = await api.get(endpoints.internships.base);
    return response.data.internships;
  } catch (error) {
    console.error('Error fetching internships:', error);
    throw error;
  }
};

// Get user's applications
export const getUserApplications = async () => {
  try {
    const response = await api.get('/api/internships/applications'); 
    if (response.data.success) {
      return response.data.applications;
    }
    throw new Error(response.data.message || 'Failed to fetch applications');
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw new Error('Failed to fetch applications');
  }
};

// Create or update internship application
export const createOrUpdateApplication = async (internshipId, status) => {
  try {
    const response = await api.post('/api/internships/applications', {
      internshipId,
      status
    });
    
    // Add logging to debug the response
    console.log('Application response:', response.data);
    
    if (response.data.success) {
      return response.data;
    }
    throw new Error(response.data.message || 'Failed to process application');
  } catch (error) {
    console.error('Full error details:', error.response?.data);
    throw new Error(error.response?.data?.message || 'Failed to process application');
  }
};

// Update an existing application
export const updateApplication = async (applicationId, status) => {
  try {
    const response = await api.put(`/api/internships/applications/${applicationId}`, {
      status
    });
    return response.data;
  } catch (error) {
    console.error('Error updating application:', error);
    throw error;
  }
};

// Delete an application
export const deleteApplication = async (applicationId) => {
  try {
    const response = await api.delete(`/api/internships/applications/${applicationId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting application:', error);
    throw error;
  }
};

export default {
  getInternships,
  getUserApplications,
  createOrUpdateApplication,
  updateApplication,
  deleteApplication
};