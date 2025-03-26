import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import DeadlineSection from "./DeadlineSection";
import EventsSection from "./EventsSection";
import { useSidebar } from "../../contexts/SidebarContext";

const StudentDashboard = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <DashboardWrapper>
      <DashboardHeader />
      <MainContent>
        <Sidebar />
        <ContentSection $isSidebarOpen={isSidebarOpen}>
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
  background: linear-gradient(135deg, rgb(13, 57, 75) 0%, rgb(21, 76, 121) 100%);
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

const ContentSection = styled.section`
  margin-left: ${props => props.$isSidebarOpen ? '280px' : '0'};
  width: ${props => props.$isSidebarOpen ? 'calc(100% - 280px)' : '100%'};
  transition: all 0.3s ease;
  padding: 20px;

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
