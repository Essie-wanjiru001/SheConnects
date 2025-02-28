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
  padding: 21px 0;
  width: 26%;
  color: #000000;
  font: 400 32px Inter, sans-serif;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileImageWrapper = styled.div`
  width: 132px;
  height: 132px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(13, 146, 118, 1);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileName = styled.div`
  align-self: center;
  margin-top: 20px;
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  padding: 0 13px;
`;

const NavItem = styled(Link)`
  padding: 7px 24px;
  margin-bottom: 20px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border-radius: 50px;
  background-color: ${props => props.active ? 'rgba(13, 146, 118, 1)' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#000000'};

  &:hover {
    background-color: ${props => props.active ? 'rgba(13, 146, 118, 0.9)' : 'rgba(13, 146, 118, 0.1)'};
  }
`;

const LogoutButton = styled.button`
  background-color: rgba(0, 0, 0, 1);
  color: #ffffff; // Changed to white for better visibility
  padding: 16px 70px;
  margin-top: auto;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

export default Sidebar;
