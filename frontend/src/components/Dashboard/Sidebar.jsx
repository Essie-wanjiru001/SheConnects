import React from 'react';
import styled from 'styled-components';
import profileImage from '../../assets/images/profile 1.jpg';

function Sidebar() {
  return (
    <SidebarWrapper>
      <ProfileImage src={profileImage} alt="Profile" />
      <ProfileName>Name</ProfileName>
      <NavMenu>
        <NavItem active>Dashboard</NavItem>
        <NavItem>Scholarships</NavItem>
        <NavItem>Internships</NavItem>
        <NavItem>Events</NavItem>
        <NavItem>Notifications</NavItem>
        <NavItem>Report</NavItem>
        <NavItem>Profile</NavItem>
      </NavMenu>
      <LogoutButton>Logout</LogoutButton>
    </SidebarWrapper>
  );
}

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

const ProfileImage = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  width: 132px;
  align-self: center;
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

const NavItem = styled.a`
  padding: 7px 24px;
  margin-bottom: 20px;
  cursor: pointer;
  ${props => props.active && `
    border-radius: 50px;
    background-color: rgba(13, 146, 118, 1);
    color: #010101;
  `}
`;

const LogoutButton = styled.button`
  background-color: rgba(0, 0, 0, 1);
  color: #010101;
  padding: 16px 70px;
  margin-top: auto;
  border: none;
  cursor: pointer;
`;

export default Sidebar;