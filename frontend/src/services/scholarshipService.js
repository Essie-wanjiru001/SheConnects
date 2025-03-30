import api from '../config/api';

export const getScholarships = async () => {
  try {
    const response = await api.get('/api/scholarships');
    console.log('All scholarships response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    throw new Error(error.response?.data?.error || 'Failed to fetch scholarships');
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

export const getMyScholarships = async () => {
  try {
    const response = await api.get('/api/scholarships/my-applications');
    console.log('My applications response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Error fetching my applications:', error);
    throw new Error(error.response?.data?.error || 'Failed to fetch applications');
  }
};

export const updateApplicationStatus = async (applicationId, status) => {
  try {
    console.log('Updating application status:', { applicationId, status }); // Debug log

    const response = await api.put(`/api/scholarships/applications/${applicationId}`, {
      status,
      updated_at: new Date().toISOString()
    });

    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to update application status');
    }

    return response.data;
  } catch (error) {
    console.error('Error updating application status:', error);
    throw new Error(
      error.response?.data?.error || 
      'Failed to update application status'
    );
  }
};

export const updateApplicationNotes = async (applicationId, notes) => {
  try {
    const response = await api.put(`/api/scholarships/applications/${applicationId}/notes`, {
      notes
    });

    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to update notes');
    }

    return response.data;
  } catch (error) {
    console.error('Error updating notes:', error);
    throw new Error(error.response?.data?.error || 'Failed to update notes');
  }
};

export const createScholarshipApplication = async (scholarshipID, status = 'IN_PROGRESS') => {
  try {
    // Debug logging
    console.log('Creating application:', { scholarshipID, status });

    const response = await api.post('/api/scholarships/applications', {
      scholarshipID,
      status
    });

    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    console.log('Application created:', response.data);
    return response.data;

  } catch (error) {
    console.error('Application creation error:', error);
    throw new Error(error.response?.data?.error || 'Failed to create application');
  }
};

// Add these new functions
export const getConversations = async (applicationId) => {
  try {
    const response = await api.get(`/api/scholarships/applications/${applicationId}/conversations`);
    return response.data.conversations;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch conversations');
  }
};

export const addConversationMessage = async (applicationId, formData) => {
  try {
    const response = await api.post(
      `/api/scholarships/applications/${applicationId}/conversations`, 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data.conversation;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to add message');
  }
};

export const deleteScholarshipApplication = async (applicationId) => {
  try {
    if (!applicationId) {
      throw new Error('Application ID is required');
    }

    const response = await api.delete(`/api/scholarships/applications/${applicationId}`);
    
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to delete application');
    }

    return response.data;
  } catch (error) {
    console.error('Error deleting application:', error);
    throw new Error(
      error.response?.data?.error || 
      'Failed to delete application'
    );
  }
};

export const getMyApplications = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/scholarships/my-applications`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch scholarship applications');
  }
};