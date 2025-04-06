import axios from 'axios';
import { StorageUtils } from '../utils/storage';

const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://sheconnects-api.onrender.com'
  : 'http://localhost:8000';

// Add endpoints configuration
export const endpoints = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register'
  },
  internships: {
    base: '/api/internships',
    applications: '/api/internships/my-applications',
    apply: '/api/internships/apply'
  },
  feedback: {
    base: '/api/feedback',
    myFeedbacks: '/api/feedback/my-feedbacks',
    all: '/api/feedback/all',
    status: (id) => `/api/feedback/${id}/status`
  },
  events: '/api/events',
  scholarships: '/api/scholarships',
  search: '/api/search',
  users: '/api/users'
};

console.log('API Base URL:', baseURL);

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      StorageUtils.clearAll();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;