import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import DeadlineSection from "./DeadlineSection";
import EventsSection from "./EventsSection";

const StudentDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <DashboardWrapper>
      <DashboardHeader toggleSidebar={toggleSidebar} />
      <MainContent>
        <SidebarContainer isOpen={isSidebarOpen}>
          <Sidebar />
        </SidebarContainer>
        <ContentSection isSidebarOpen={isSidebarOpen}>
          <ContentWrapper>
            <DeadlineSection />
            <Divider />
            <EventsSection />
          </ContentWrapper>
        </ContentSection>
      </MainContent>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled.div`
  background-color: rgba(251, 251, 251, 1);
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
  align-items: stretch;
  line-height: normal;
  width: ${props => props.isSidebarOpen ? '74%' : '100%'};
  margin-left: ${props => props.isSidebarOpen ? '20px' : '0'};
  transition: all 0.3s ease;

  @media (max-width: 991px) {
    width: 100%;
    margin-left: 0;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-self: stretch;
  align-items: center;
  padding-top: 20px; // Add padding for spacing

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: 44px 0;

  @media (max-width: 991px) {
    margin: 40px 0;
  }
`;

export default StudentDashboard;
