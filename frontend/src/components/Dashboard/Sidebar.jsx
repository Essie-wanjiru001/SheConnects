import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation, Link } from "react-router-dom";
import profileImage from "../../assets/images/profile 1.jpg";
import { logout } from "../../../src/services/authService";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout(); 
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <SidebarWrapper>
      <ProfileContainer>
        <ProfileImageWrapper>
          <ProfileImage src={profileImage} alt="Profile" />
        </ProfileImageWrapper>
        <ProfileName>Name</ProfileName>
      </ProfileContainer>
      <NavMenu>
        <NavItem as={Link} to="/dashboard" active={isActive('/dashboard')}>
          Dashboard
        </NavItem>
        <NavItem as={Link} to="/scholarships" active={isActive('/scholarships')}>
          Scholarships
        </NavItem>
        <NavItem as={Link} to="/internships" active={isActive('/internships')}>
          Internships
        </NavItem>
        <NavItem as={Link} to="/events" active={isActive('/events')}>
          Events
        </NavItem>
        <NavItem as={Link} to="/notifications" active={isActive('/notifications')}>
          Notifications
        </NavItem>
        <NavItem as={Link} to="/report" active={isActive('/report')}>
          Report
        </NavItem>
        <NavItem as={Link} to="/profile" active={isActive('/profile')}>
          Profile
        </NavItem>
      </NavMenu>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.aside`
  background-color: rgba(154, 208, 194, 1);
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  width: 280px;
  height: calc(100vh - 70px);
  position: fixed;
  left: 0;
  top: 70px;
  color: #000000;
  border-right: 1px solid rgba(13, 146, 118, 0.2);
  z-index: 999;
  overflow-y: scroll;
  scrollbar-width: none; // Firefox
  -ms-overflow-style: none;  // IE and Edge
  
  &::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }

  @media (max-width: 991px) {
    width: 100%;
    position: fixed;
    top: 70px;
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
  }
`;

// Adjust ProfileContainer top margin
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0 30px; // Reduced top margin
`;

const ProfileImageWrapper = styled.div`
  width: 100px; // Reduced size
  height: 100px; // Reduced size
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(13, 146, 118, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileName = styled.div`
  align-self: center;
  margin-top: 15px;
  font-size: 20px; // Reduced font size
  font-weight: 500;
`;

// Update NavMenu top margin
const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 20px; // Reduced margin
  gap: 15px;
  padding: 0 13px;
  flex: 1; // Take up available space
`;

const NavItem = styled(Link)`
  padding: 12px 24px;
  font-size: 16px; // Reduced font size
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border-radius: 50px;
  background-color: ${props => props.active ? 'rgba(13, 146, 118, 1)' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#000000'};

  &:hover {
    background-color: ${props => props.active ? 'rgba(13, 146, 118, 0.9)' : 'rgba(13, 146, 118, 0.1)'};
    transform: translateX(5px); // Added subtle animation
  }
`;

const LogoutButton = styled.button`
  background-color: #ff4d4d; // Changed to red for logout
  color: #ffffff;
  padding: 12px 24px;
  margin: 20px 20px; // Changed from auto margin
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  font-weight: 500;

  &:hover {
    background-color: #ff3333;
    transform: translateY(-2px);
  }
`;

export default Sidebar;
