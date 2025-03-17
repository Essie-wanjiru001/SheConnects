import api from '../config/api';

export const updateProfile = async (formData) => {
  try {
    const response = await api.put('/api/users/profile', formData, { 
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    
    return response.data;
  } catch (error) {
    console.error('Profile update error:', error);
    throw error.response?.data || { 
      success: false,
      message: 'Failed to update profile' 
    };
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/api/users/profile');  // Add /api prefix
    return response.data;
  } catch (error) {
    console.error('Get profile error:', error);
    throw error.response?.data || { 
      success: false,
      message: 'Failed to fetch profile' 
    };
  }
};