import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaUsers, FaGraduationCap, FaBriefcase, FaCalendarAlt, FaTachometerAlt } from 'react-icons/fa';

const AdminSidebar = () => {
  const location = useLocation();

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

const NavLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
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

export default AdminSidebar;