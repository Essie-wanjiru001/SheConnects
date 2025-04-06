import api from '../config/api';

// Add interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 || 
        (error.response?.status === 403 && error.response?.data?.message === 'Token expired')) {
      // Clear admin data
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      // Redirect to login
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export const checkAdminToken = () => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    window.location.href = '/admin/login';
    return false;
  }
  return true;
};

export const getAdminStats = async () => {
  if (!checkAdminToken()) return;
  try {
    const response = await api.get('/api/admin/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching admin stats:', error);
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

// Admin authentication
export const loginAdmin = async (credentials) => {
  try {
    const response = await api.post('/api/admin/login', credentials); // Changed from '/api/auth/admin/login'
    
    if (response.data.success && response.data.token) {
      // Store token
      localStorage.setItem('adminToken', response.data.token);
      
      // Set default auth header
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      return response.data;
    } else {
      throw new Error(response.data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Admin login error:', error);
    throw error.response?.data || error;
  }
};

// Initialize admin auth on app load
export const initializeAdminAuth = () => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return true;
  }
  return false;
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
    if (!scholarshipID) {
      throw new Error('Scholarship ID is required');
    }

    console.log('Updating scholarship:', { scholarshipID, data });
    const response = await api.put(`/api/admin/scholarships/${scholarshipID}`, data);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update scholarship');
    }

    return response.data;
  } catch (error) {
    console.error('Error updating scholarship:', error);
    throw error.response?.data?.message || error.message || 'Failed to update scholarship';
  }
};

export const deleteScholarship = async (scholarshipID) => {
  try {
    if (!scholarshipID) {
      throw new Error('Scholarship ID is required');
    }

    console.log('Deleting scholarship:', scholarshipID);
    const response = await api.delete(`/api/admin/scholarships/${scholarshipID}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error('Error deleting scholarship:', error);
    if (error.response?.status === 404) {
      throw new Error(error.response.data.message || 'Scholarship not found');
    }
    throw new Error(error.response?.data?.message || 'Failed to delete scholarship');
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

export const getInternshipStats = async (internshipId) => {
  try {
    const response = await api.get(`/api/admin/internships/${internshipId}/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching internship stats:', error);
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