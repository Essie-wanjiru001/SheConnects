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
        
        {/* Temporary Redirects */}
        <Route path="/scholarships" element={<Navigate to="/dashboard" />} />
        <Route path="/internships" element={<Navigate to="/dashboard" />} />
        <Route path="/events" element={<Navigate to="/dashboard" />} />
        <Route path="/notifications" element={<Navigate to="/dashboard" />} />
        <Route path="/report" element={<Navigate to="/dashboard" />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route 
          path="/dashboard/scholarships" 
          element={<ScholarshipList isDashboard={true} />} 
        />
        
        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
