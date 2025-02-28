import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth';

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
      return response.data;
    }
    throw new Error('No token received');
  } catch (error) {
    throw error.response?.data || { error: 'An error occurred' };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'An error occurred' };
  }
};

export const isAuthenticated = () => {
  return localStorage.getItem('userToken') !== null;
};

export const logout = () => {
  localStorage.removeItem('userToken');
};