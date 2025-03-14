import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8000' 
  : 'https://sheconnects-api.onrender.com';

// Add endpoints configuration
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register'
  },
  internships: '/internships',
  events: '/events',
  scholarships: '/scholarships',
  search: '/search',
  users: '/users'
};

console.log('API Base URL:', baseURL);

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to handle admin tokens
api.interceptors.request.use(config => {
  console.log('Request URL:', config.url);
  // Check if it's an admin route
  if (config.url.startsWith('/api/admin')) {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
      console.log('Using admin token for request');
    }
  } else {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
      console.log('Sending user token in request:', userToken);
    }
  }
  console.log('API Request:', config.method.toUpperCase(), config.url);
  return config;
}, error => {
  return Promise.reject(error);
});

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  error => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    return Promise.reject(error);
  }
);

export default api;