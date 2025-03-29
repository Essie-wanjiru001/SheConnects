import Cookies from 'js-cookie';

export const StorageUtils = {
  // Cookie Management
  setCookie: (name, value, options = {}) => {
    Cookies.set(name, value, {
      expires: 7, // 7 days by default
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      ...options
    });
  },

  getCookie: (name) => {
    return Cookies.get(name);
  },

  removeCookie: (name) => {
    Cookies.remove(name);
  },

  // Local Storage Management
  setLocalStorage: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  getLocalStorage: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },

  removeLocalStorage: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  // Clear all storage
  clearAll: () => {
    localStorage.clear();
    Object.keys(Cookies.get()).forEach(cookieName => {
      Cookies.remove(cookieName);
    });
  }
};