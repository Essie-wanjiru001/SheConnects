import api from '../config/api';
import { StorageUtils } from '../utils/storage';

export const login = async (credentials) => {
  try {
    const response = await api.post('/api/auth/login', credentials);
    if (response.data.token) {
      // Set both cookie and localStorage
      StorageUtils.setCookie('authToken', response.data.token);
      StorageUtils.setLocalStorage('user', response.data.user);
      
      // Set token for API calls
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const register = async (userData) => {
  try {
    console.log('Sending registration request:', userData); // Debug log

    const response = await api.post('/api/auth/register', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      acceptedPrivacyPolicy: userData.acceptedPrivacyPolicy
    });

    console.log('Registration response:', response.data); // Debug log

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Registration failed'
    );
  }
};

export const logout = () => {
  StorageUtils.clearAll();
  api.defaults.headers.common['Authorization'] = '';
  window.location.href = '/login';
};

export const getUserProfile = async () => {
  try {
    console.log('Fetching user profile...');
    const response = await api.get('/users/profile');
    console.log('User profile response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const getCurrentUser = () => {
  return StorageUtils.getLocalStorage('user');
};

export const resetPassword = async (data) => {
  try {
    const response = await api.post('/auth/reset-password', {
      email: data.email,
      newPassword: data.newPassword
    });
    return response.data;
  } catch (error) {
    console.error('Password reset error:', error);
    throw error.response?.data || { message: 'Failed to reset password' };
  }
};

export const loginAdmin = async (credentials) => {
  try {
    const response = await api.post('/auth/admin/login', credentials);
    if (response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminUser', JSON.stringify(response.data.admin));
    }
    return response.data;
  } catch (error) {
    console.error('Admin login error:', error);
    throw error.response?.data || error;
  }
};

export const getAdminToken = () => {
  return localStorage.getItem('adminToken');
};

export const isAuthenticated = () => {
  const token = StorageUtils.getCookie('authToken');
  return !!token;
};