import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import HomePage from "./components/Home/HomePage";
import About from "./components/About/About";
import GlobalStyles from "./styles/GlobalStyles";
import UserGuide from "./components/Guide/UserGuide";
import ResourcesAndSupport from "./components/Guide/ResourcesAndSupport"; // Updated import
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
import ResetPassword from "./components/Auth/ResetPassword";
import ScholarshipManager from './components/Scholarships/ScholarshipManager'; 
import { SidebarProvider } from './contexts/SidebarContext';
import { initializeAdminAuth } from './services/adminService';
import InternshipManager from './components/Internships/InternshipManager';
import EventManager from './components/Events/EventManager';
import { SessionProvider } from './contexts/SessionContext';
import CookieConsent from './components/CookieConsent/CookieConsent';
import ForumPage from './components/Forum/ForumPage';
import { UserProvider } from './contexts/UserContext';

import ReportsPage from "./components/Report/ReportsPage"; 
import ManageReports from "./components/Admin/ManageReports";

function App() {
  useEffect(() => {
    initializeAdminAuth();
  }, []);

  return (
    <SessionProvider>
      <UserProvider>
        <Router>
          <GlobalStyles />
          <AnalyticsTracker /> {/* Track route changes */}
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/user-guide" element={<UserGuide />} />
            <Route path="/resources" element={<ResourcesAndSupport />} /> {/* Added new route */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reset-password" element={<ResetPassword />} /> 

            {/* Dashboard routes wrapped with SidebarProvider */}
            <Route path="/dashboard/*" element={
              <SidebarProvider>
                <Routes>
                  <Route index element={<StudentDashboard />} />
                  <Route path="scholarships" element={<ScholarshipManager />} />
                  <Route path="internships" element={<InternshipManager />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="events" element={<EventManager />} />
                  <Route path="forum" element={<ForumPage />} />
                  <Route path="report" element={<ReportsPage />} />
                </Routes>
              </SidebarProvider>
            } />
                        
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
            <Route path="/admin/reports" element={
              <ProtectedAdminRoute>
                <AdminLayout>
                  <ManageReports />
                </AdminLayout>
              </ProtectedAdminRoute>
            } />
            
            {/* 404 Route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <CookieConsent />
        </Router>
      </UserProvider>
    </SessionProvider>
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
