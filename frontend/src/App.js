import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import HomePage from "./components/Home/HomePage";
import About from "./components/About/About";
import GlobalStyles from "./styles/GlobalStyles";
import UserGuide from "./components/Guide/UserGuide";
import LoginPage from "./components/Auth/Login/LoginPage";
import RegisterPage from "./components/Auth/Register/RegisterPage";
import StudentDashboard from "./components/Dashboard/DashboardHome";
import ProfilePage from "./components/Profile/ProfilePage";
import ScholarshipList from "./components/Scholarships/ScholarshipList";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminLayout from "./components/Admin/AdminLayout";
import ProtectedAdminRoute from "./components/Routes/ProtectedAdminRoute";
import ManageScholarships from "./components/Admin/ManageScholarships";
import ManageInternships from "./components/Admin/ManageInternships";
import ManageEvents from "./components/Admin/ManageEvents";
import ManageUsers from "./components/Admin/ManageUsers";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <AnalyticsTracker /> {/* Track route changes */}
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/user-guide" element={<UserGuide />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard/scholarships" element={<ScholarshipList isDashboard={true} />} />
        
        {/* Admin Routes - All wrapped with AdminLayout */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedAdminRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedAdminRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedAdminRoute>
            <AdminLayout>
              <ManageUsers />
            </AdminLayout>
          </ProtectedAdminRoute>
        } />
        <Route path="/admin/scholarships" element={
          <ProtectedAdminRoute>
            <AdminLayout>
              <ManageScholarships />
            </AdminLayout>
          </ProtectedAdminRoute>
        } />
        <Route path="/admin/internships" element={
          <ProtectedAdminRoute>
            <AdminLayout>
              <ManageInternships />
            </AdminLayout>
          </ProtectedAdminRoute>
        } />
        <Route path="/admin/events" element={
          <ProtectedAdminRoute>
            <AdminLayout>
              <ManageEvents />
            </AdminLayout>
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

// Track page views when route changes
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize("G-WE39823J39"); 
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return null;
}

export default App;
