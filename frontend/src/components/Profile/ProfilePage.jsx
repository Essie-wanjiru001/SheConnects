import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../Dashboard/Sidebar";
import DashboardHeader from "../Dashboard/DashboardHeader";
import ProfileForm from "./ProfileForm";

const ProfilePage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <ProfileWrapper>
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <MainContent>
        <SidebarContainer isOpen={isSidebarOpen}>
          <Sidebar />
        </SidebarContainer>
        <ContentSection isSidebarOpen={isSidebarOpen}>
          <FormContainer>
            <FormTitle>My Profile</FormTitle>
            <ProfileForm />
          </FormContainer>
        </ContentSection>
      </MainContent>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div`
  background-color: rgba(251, 251, 251, 1);
  min-height: 100vh;
  padding-bottom: 10px;
  overflow: hidden;
`;

const MainContent = styled.main`
  display: flex;
  padding: 20px;
  position: relative;
  margin-top: 70px; // Add margin to account for fixed header

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
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
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
  }
`;

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: normal;
  width: ${props => props.isSidebarOpen ? '74%' : '100%'};
  margin-left: ${props => props.isSidebarOpen ? '20px' : '0'};
  transition: all 0.3s ease;
  padding: 20px;

  @media (max-width: 991px) {
    width: 100%;
    margin-left: 0;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

export default ProfilePage;