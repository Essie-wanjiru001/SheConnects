const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://sheconnects_api.onrender.com'
  : 'http://localhost:8000';

export default API_URL;