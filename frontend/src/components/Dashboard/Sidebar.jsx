import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { getUserProfile } from "../../services/profileService";
import defaultProfileImage from "../../assets/images/profile 1.jpg";
import { logout } from "../../services/authService";
import ScholarshipList from '../Scholarships/ScholarshipList';
import { useSidebar } from "../../contexts/SidebarContext";
import { FaFlag } from 'react-icons/fa';

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
        <NavItem as={Link} to="/dashboard/internships" $active={isActive('/dashboard/internships')}>
          Internships
        </NavItem>
        <NavItem as={Link} to="/dashboard/events" $active={isActive('/dashboard/events')}>
          Events
        </NavItem>
        <NavItem as={Link} to="/dashboard/forum" $active={isActive('/dashboard/forum')}>
          Community Forum
        </NavItem>
        <NavItem as={Link} to="/dashboard/report" $active={isActive('/dashboard/report')}>
          <FaFlag /> Report
        </NavItem>
        <NavItem as={Link} to="/dashboard/profile" $active={isActive('/dashboard/profile')}>
          Profile
        </NavItem>
      </NavMenu>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.aside`
  background: linear-gradient(135deg, #1a2a6c, #b21f1f);
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
  overflow-y: auto;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0 30px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
`;

const ProfileImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #FFD700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileName = styled.div`
  color: #ffffff;
  margin-top: 15px;
  font-size: 1.2rem;
  font-weight: 500;
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;
`;

const NavItem = styled(Link)`
  padding: 12px 20px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  color: #ffffff;
  transition: all 0.3s ease;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${props => props.$active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
  }

  svg {
    font-size: 1.2rem;
    color: ${props => props.$active ? '#FFD700' : 'rgba(255, 255, 255, 0.8)'};
  }
`;

const LogoutButton = styled.button`
  background-color: rgba(255, 59, 48, 0.1);
  color: #ffffff;
  padding: 12px 24px;
  margin: 20px;
  border: 1px solid rgba(255, 59, 48, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: rgba(255, 59, 48, 0.2);
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.1rem;
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
