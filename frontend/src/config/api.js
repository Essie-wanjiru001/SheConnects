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

api.interceptors.request.use(request => {
  console.log('API Request:', request.method.toUpperCase(), request.url);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  error => {
    console.error('API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;