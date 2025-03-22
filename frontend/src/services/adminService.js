import api from '../config/api';

// Add request interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear admin data and redirect to login
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const getAdminStats = async () => {
  try {
    const response = await api.get('/api/admin/stats');
    return response.data.stats;
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    if (error.response?.status === 401) {
      // Clear admin data on auth error
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
    }
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/api/admin/users');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch users');
    }
    return response.data.users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/api/admin/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const loginAdmin = async (credentials) => {
  try {
    const response = await api.post('/api/auth/admin/login', credentials);
    
    if (response.data.success && response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', JSON.stringify(response.data.admin));
      
      // Set default auth header
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    
    return response.data;
  } catch (error) {
    console.error('Admin login error:', error);
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const isAdmin = () => {
  const token = localStorage.getItem('adminToken');
  return !!token;
};

export const logoutAdmin = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
  window.location.href = '/admin/login';
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/api/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Scholarship Management
export const getScholarships = async () => {
  try {
    console.log('Fetching scholarships from API...');
    const response = await api.get('/api/admin/scholarships');
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch scholarships');
    }

    return response.data.scholarships;
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    throw error;
  }
};

export const createScholarship = async (data) => {
  try {
    const response = await api.post('/api/admin/scholarships', data);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error('Error creating scholarship:', error);
    throw error;
  }
};

export const updateScholarship = async (scholarshipID, data) => {
  try {
    console.log('Updating scholarship:', scholarshipID, data);
    const response = await api.put(`/api/admin/scholarships/${scholarshipID}`, data);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update scholarship');
    }

    return response.data;
  } catch (error) {
    console.error('Error updating scholarship:', error);
    throw error;
  }
};

export const deleteScholarship = async (scholarshipID) => {
  try {
    console.log('Deleting scholarship:', scholarshipID);
    const response = await api.delete(`/api/admin/scholarships/${scholarshipID}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete scholarship');
    }

    return response.data;
  } catch (error) {
    console.error('Error deleting scholarship:', error);
    throw error;
  }
};

// Internship Management
export const createInternship = async (data) => {
  try {
    const response = await api.post('/api/admin/internships', data);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error('Error creating internship:', error);
    throw error;
  }
};

export const updateInternship = async (id, data) => {
  try {
    const response = await api.put(`/api/admin/internships/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating internship:', error);
    throw error;
  }
};

export const deleteInternship = async (id) => {
  try {
    const response = await api.delete(`/api/admin/internships/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting internship:', error);
    throw error;
  }
};

export const getInternships = async () => {
  try {
    const response = await api.get('/api/admin/internships');
    return response.data.internships;
  } catch (error) {
    console.error('Error fetching internships:', error);
    throw error;
  }
};

// Event Management
export const createEvent = async (data) => {
  try {
    const response = await api.post('/api/admin/events', data);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEvent = async (id, data) => {
  try {
    const response = await api.put(`/api/admin/events/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await api.delete(`/api/admin/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const response = await api.get('/api/admin/events');
    return response.data.events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Add other admin service methods for managing content