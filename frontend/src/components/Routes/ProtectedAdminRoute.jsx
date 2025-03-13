import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAdmin } from '../../services/adminService';

const ProtectedAdminRoute = ({ children }) => {
  if (!isAdmin()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;