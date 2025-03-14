import api from '../config/api';

export const getAdminStats = async () => {
  try {
    console.log('Fetching admin stats...');
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
    return response.data;
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
    const response = await api.post('/api/admin/login', credentials);
    if (response.data.success) {
      localStorage.setItem('adminToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Admin login error:', error);
    throw error;
  }
};

export const isAdmin = () => {
  const token = localStorage.getItem('adminToken');
  if (!token) return false;
  
  try {
    // You might want to decode the token and check if is_admin is true
    return true;
  } catch (error) {
    console.error('Admin token verification failed:', error);
    return false;
  }
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
export const createScholarship = async (data) => {
  try {
    const response = await api.post('/api/admin/scholarships', data);
    return response.data;
  } catch (error) {
    console.error('Error creating scholarship:', error);
    throw error;
  }
};

export const updateScholarship = async (id, data) => {
  try {
    const response = await api.put(`/api/admin/scholarships/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating scholarship:', error);
    throw error;
  }
};

export const deleteScholarship = async (id) => {
  try {
    const response = await api.delete(`/api/admin/scholarships/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting scholarship:', error);
    throw error;
  }
};

export const getScholarships = async () => {
  try {
    const response = await api.get('/api/admin/scholarships');
    return response.data;
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    throw error;
  }
};

// Internship Management
export const createInternship = async (data) => {
  try {
    const response = await api.post('/api/admin/internships', data);
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
    return response.data;
  } catch (error) {
    console.error('Error fetching internships:', error);
    throw error;
  }
};

// Event Management
export const createEvent = async (data) => {
  try {
    const response = await api.post('/api/admin/events', data);
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
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Add other admin service methods for managing content