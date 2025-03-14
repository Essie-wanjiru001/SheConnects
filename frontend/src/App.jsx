import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminLogin from './components/Admin/AdminLogin';
import ManageUsers from './components/Admin/ManageUsers';
import ManageInternships from './components/Admin/ManageInternships';
import ManageEvents from './components/Admin/ManageEvents';
// ... other imports

function App() {
  return (
    <Router>
      <Routes>
        {/* ... existing routes ... */}
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/admin/users" element={
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        } />
        <Route path="/admin/internships" element={
          <AdminRoute>
            <ManageInternships />
          </AdminRoute>
        } />
        <Route path="/admin/events" element={
          <AdminRoute>
            <ManageEvents />
          </AdminRoute>
        } />
        {/* Add other admin management routes */}
      </Routes>
    </Router>
  );
}