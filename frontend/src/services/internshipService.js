import api from '../config/api';
import { endpoints } from '../config/api';

// Get all internships
export const getInternships = async () => {
  try {
    const response = await api.get('/api/internships');
    if (!response.data.success) {
      throw new Error('Failed to fetch internships');
    }
    return response.data.internships || [];
  } catch (error) {
    console.error('Error fetching internships:', error);
    throw new Error('Failed to fetch internships');
  }
};

// Get internship by ID
export const getInternshipById = async (id) => {
  try {
    const response = await api.get(`/api/internships/${id}`);
    return response.data.internship;
  } catch (error) {
    console.error(`Error fetching internship with ID ${id}:`, error);
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

// Create or update internship application
export const createOrUpdateApplication = async (internshipId, status) => {
  try {
    console.log('Submitting application:', { internshipId, status });
    
    // Make sure both params are provided
    if (!internshipId) {
      throw new Error('Internship ID is required');
    }
    
    if (!status) {
      throw new Error('Status is required');
    }
    
    const response = await api.post('/api/internships/applications', {
      internshipId,
      status
    });
    
    return response.data;
  } catch (error) {
    console.error('Error creating/updating application:', error);
    // Extract error message from response if available
    const errorMessage = error.response?.data?.message || 
                         'Failed to submit application. Please try again.';
    throw new Error(errorMessage);
  }
};

export const getMyApplications = async () => {
  try {
    const response = await api.get('/api/internships/applications');
    return response.data.applications || [];
  } catch (error) {
    console.error('Error fetching applications:', error);
    return [];
  }
};

export const getApplications = async () => {
  try {
    const response = await api.get(endpoints.internships.applications);
    return response.data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};

// Get user's applications
export const getUserApplications = async () => {
  try {
    const response = await api.get('/api/internships/applications');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch applications');
    }
    return response.data.applications;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw new Error('Failed to fetch applications');
  }
};

export const fetchApplications = async () => {
  try {
    const response = await axios.get('/api/internships/applications', {
      headers: {
        'Authorization': `Bearer ${getToken()}`
      }
    });
    return response.data.applications;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
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
  getInternshipById,
  createOrUpdateApplication,
  getUserApplications,
  fetchApplications,
  updateApplication,
  deleteApplication
};