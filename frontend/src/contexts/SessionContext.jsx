import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageUtils } from '../utils/storage';

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = StorageUtils.getCookie('authToken');
    const userData = StorageUtils.getLocalStorage('user');

    if (token && userData) {
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const updateSession = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    StorageUtils.setLocalStorage('user', userData);
  };

  const clearSession = () => {
    setUser(null);
    setIsAuthenticated(false);
    StorageUtils.clearAll();
  };

  return (
    <SessionContext.Provider value={{ 
      user, 
      isAuthenticated, 
      updateSession, 
      clearSession 
    }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);