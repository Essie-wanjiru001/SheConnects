import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getUserProfile } from "../../services/profileService";
import defaultProfileImage from "../../assets/images/profile 1.jpg";
import { logout } from "../../services/authService";
import ScholarshipList from '../Scholarships/ScholarshipList';
import { useSidebar } from "../../contexts/SidebarContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isSidebarOpen } = useSidebar();
  const [userData, setUserData] = useState({
    name: '',
    profilePicture: null
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const data = await getUserProfile();
      setUserData({
        name: data.name || 'User',
        profilePicture: data.profilePicture || data.profile_image // Handle both naming conventions
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Keep default values if fetch fails
      setUserData({
        name: 'User',
        profilePicture: null
      });
    }
  };

  const handleLogout = () => {
    logout(); 
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <SidebarWrapper $isOpen={isSidebarOpen}>
      <ProfileContainer>
        <ProfileImageWrapper>
          <ProfileImage 
            src={userData.profilePicture ? `http://localhost:8000${userData.profilePicture}` : defaultProfileImage} 
            alt={userData.name} 
            onError={(e) => {
              e.target.src = defaultProfileImage; // Fallback to default if image fails to load
            }}
          />
        </ProfileImageWrapper>
        <ProfileName>{userData.name}</ProfileName>
      </ProfileContainer>
      <NavMenu>
        <NavItem as={Link} to="/dashboard" $active={isActive('/dashboard')}>
          Dashboard
        </NavItem>
        <NavItem as={Link} to="/dashboard/scholarships" $active={isActive('/dashboard/scholarships')}>
          Scholarships
        </NavItem>
        <NavItem as={Link} to="/internships" $active={isActive('/internships')}>
          Internships
        </NavItem>
        <NavItem as={Link} to="/events" $active={isActive('/events')}>
          Events
        </NavItem>
        <NavItem as={Link} to="/notifications" $active={isActive('/notifications')}>
          Notifications
        </NavItem>
        <NavItem as={Link} to="/report" $active={isActive('/report')}>
          Report
        </NavItem>
        <NavItem as={Link} to="/profile" $active={isActive('/profile')}>
          Profile
        </NavItem>
      </NavMenu>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.aside`
  background: linear-gradient(135deg, rgb(13, 57, 75) 0%, rgb(21, 76, 121) 100%);
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  width: 280px;
  height: calc(100vh - 70px);
  position: fixed;
  left: 0;
  top: 70px;
  transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  z-index: 1000;
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
  color: #ffffff;
  align-self: center;
  margin-top: 15px;
  font-size: 20px;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
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
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  color: #ffffff;
  transition: all 0.3s ease;
  border-radius: 50px;
  background-color: ${props => props.$active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
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

const SidebarContainer = styled.div`
  width: 26%;
  transition: transform 0.3s ease;
  
  @media (max-width: 991px) {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 1000;
    transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  }
`;

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: normal;
  width: ${props => props.$isSidebarOpen ? '74%' : '100%'};
  margin-left: ${props => props.$isSidebarOpen ? '20px' : '0'};
  transition: all 0.3s ease;
  padding: 20px;

  @media (max-width: 991px) {
    width: 100%;
    margin-left: 0;
  }
`;

export default Sidebar;
