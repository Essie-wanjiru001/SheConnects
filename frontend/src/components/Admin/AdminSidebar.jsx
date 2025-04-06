import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaUsers, 
  FaGraduationCap, 
  FaBriefcase, 
  FaCalendarAlt, 
  FaTachometerAlt, 
  FaSignOutAlt,
  FaFlag 
} from 'react-icons/fa';
import { logoutAdmin } from '../../services/adminService';

const AdminSidebar = () => {
  const location = useLocation();

  const handleLogout = () => {
    logoutAdmin();
  };

  return (
    <Sidebar>
      <LogoSection>
        <h2>Admin Panel</h2>
      </LogoSection>
      
      <NavLinks>
        <NavItem $isActive={location.pathname === '/admin'}>
          <NavLink to="/admin">
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>
        </NavItem>

        <NavItem $isActive={location.pathname === '/admin/users'}>
          <NavLink to="/admin/users">
            <FaUsers />
            <span>Users</span>
          </NavLink>
        </NavItem>

        <NavItem $isActive={location.pathname === '/admin/scholarships'}>
          <NavLink to="/admin/scholarships">
            <FaGraduationCap />
            <span>Scholarships</span>
          </NavLink>
        </NavItem>

        <NavItem $isActive={location.pathname === '/admin/internships'}>
          <NavLink to="/admin/internships">
            <FaBriefcase />
            <span>Internships</span>
          </NavLink>
        </NavItem>

        <NavItem $isActive={location.pathname === '/admin/events'}>
          <NavLink to="/admin/events">
            <FaCalendarAlt />
            <span>Events</span>
          </NavLink>
        </NavItem>

        <NavItem $isActive={location.pathname === '/admin/reports'}>
          <NavLink to="/admin/reports">
            <FaFlag />
            <span>Reports</span>
          </NavLink>
        </NavItem>

        <LogoutItem onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </LogoutItem>
      </NavLinks>
    </Sidebar>
  );
};

const Sidebar = styled.div`
  width: 250px;
  height: 100vh;
  background: #1a2a6c;
  position: fixed;
  left: 0;
  top: 0;
  color: #ffffff;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const LogoSection = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;
  
  h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #29bf9f;
  }
`;

// Modify the NavLinks component to include flex properties
const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 80px); // Adjust based on your LogoSection height
  padding: 20px 0;
`;

const NavItem = styled.li`
  margin-bottom: 0.5rem;
  background: ${props => props.$isActive ? 'rgba(41, 191, 159, 0.1)' : 'transparent'};
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(41, 191, 159, 0.1);
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 1rem;
  color: #ffffff;
  text-decoration: none;
  gap: 1rem;

  svg {
    font-size: 1.2rem;
    color: #29bf9f;
  }

  span {
    font-size: 1rem;
  }
`;

// Add these new styled components at the end of the file
const LogoutItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px 20px;
  color: #ff4d4d;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;

  svg {
    font-size: 20px;
  }

  &:hover {
    background-color: rgba(255, 77, 77, 0.1);
  }
`;

export default AdminSidebar;