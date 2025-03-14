import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAdmin } from '../../services/adminService';

const ProtectedAdminRoute = ({ children }) => {
  const location = useLocation();
  
  if (!isAdmin()) {
    // Redirect to admin login with return path
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedAdminRoute;