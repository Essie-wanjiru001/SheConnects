import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8000' 
  : 'https://sheconnects-api.onrender.com';


// Add endpoints configuration
export const endpoints = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register'
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

api.interceptors.request.use(config => {
  console.log('Request URL:', config.url);
  if (config.url.includes('/auth/register') || config.url.includes('/auth/login')) {
    return config;
  }
  
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Sending user token in request:', token);
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