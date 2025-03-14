import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import About from "./components/About/About";
import GlobalStyles from "./styles/GlobalStyles";
import UserGuide from "./components/Guide/UserGuide";
import LoginPage from "./components/Auth/Login/LoginPage";
import RegisterPage from "./components/Auth/Register/RegisterPage";
import StudentDashboard from "./components/Dashboard/DashboardHome";
import ProfilePage from "./components/Profile/ProfilePage";
import ScholarshipList from "./components/Scholarships/ScholarshipList";
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import ProtectedAdminRoute from './components/Routes/ProtectedAdminRoute';
import ManageScholarships from './components/Admin/ManageScholarships';
import ManageInternships from './components/Admin/ManageInternships';
import ManageEvents from './components/Admin/ManageEvents';
import ManageUsers from './components/Admin/ManageUsers';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/user-guide" element={<UserGuide />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        
        {/* Protected Routes */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route 
          path="/dashboard/scholarships" 
          element={<ScholarshipList isDashboard={true} />} 
        />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedAdminRoute>
            <AdminDashboard />
          </ProtectedAdminRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedAdminRoute>
            <ManageUsers />
          </ProtectedAdminRoute>
        } />
        <Route path="/admin/scholarships" element={
          <ProtectedAdminRoute>
            <ManageScholarships />
          </ProtectedAdminRoute>
        } />
        <Route path="/admin/internships" element={
          <ProtectedAdminRoute>
            <ManageInternships />
          </ProtectedAdminRoute>
        } />
        <Route path="/admin/events" element={
          <ProtectedAdminRoute>
            <ManageEvents />
          </ProtectedAdminRoute>
        } />
        
        {/* Temporary Redirects */}
        <Route path="/scholarships" element={<Navigate to="/dashboard" />} />
        <Route path="/internships" element={<Navigate to="/dashboard" />} />
        <Route path="/events" element={<Navigate to="/dashboard" />} />
        <Route path="/notifications" element={<Navigate to="/dashboard" />} />
        <Route path="/report" element={<Navigate to="/dashboard" />} />
        
        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;