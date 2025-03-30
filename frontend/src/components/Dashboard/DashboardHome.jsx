import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import { useSidebar } from "../../contexts/SidebarContext";
import { getUserProfile } from "../../services/profileService";
import { getMyScholarships } from "../../services/scholarshipService";
import { getUserApplications } from "../../services/internshipService";
import { getTopEvents } from "../../services/eventService";
import { FaGraduationCap, FaBriefcase, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

const StudentDashboard = () => {
  const { isSidebarOpen } = useSidebar();
  const [userData, setUserData] = useState({ name: '' });
  const [scholarshipApps, setScholarshipApps] = useState([]);
  const [internshipApps, setInternshipApps] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userProfile = await getUserProfile();
        setUserData(userProfile);

        const scholarships = await getMyScholarships();
        setScholarshipApps(scholarships.filter(app => app.status === 'IN_PROGRESS'));

        const internships = await getUserApplications();
        setInternshipApps(internships.filter(app => app.status === 'IN_PROGRESS'));

        const events = await getTopEvents();
        setUpcomingEvents(events);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardWrapper>
      <DashboardHeader />
      <MainContent>
        <Sidebar />
        <ContentSection $isSidebarOpen={isSidebarOpen}>
          <WelcomeSection>
            <WelcomeText>
              Welcome back, <span>{userData.name}</span>
            </WelcomeText>
            <DateText>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</DateText>
          </WelcomeSection>

          <ActionCards>
            <ActionCard>
              <ActionHeader>
                <FaGraduationCap />
                <h3>Scholarship Applications In Progress</h3>
                <ManageLink to="/dashboard/scholarships">
                  Manage Applications <FaArrowRight />
                </ManageLink>
              </ActionHeader>
              {scholarshipApps.length > 0 ? (
                <ActionList>
                  {scholarshipApps.map(app => (
                    <ActionItem key={app.id}>
                      <ActionTitle>{app.name || app.scholarship_name}</ActionTitle>
                      <ActionMeta>Deadline: {new Date(app.application_deadline).toLocaleDateString()}</ActionMeta>
                    </ActionItem>
                  ))}
                </ActionList>
              ) : (
                <EmptyState>No scholarship applications in progress</EmptyState>
              )}
            </ActionCard>

            <ActionCard>
              <ActionHeader>
                <FaBriefcase />
                <h3>Internship Applications In Progress</h3>
                <ManageLink to="/dashboard/internships">
                  Manage Applications <FaArrowRight />
                </ManageLink>
              </ActionHeader>
              {internshipApps.length > 0 ? (
                <ActionList>
                  {internshipApps.map(app => (
                    <ActionItem key={app.id}>
                      <ActionTitle>{app.title || app.internship_name}</ActionTitle>
                      <ActionMeta>Company: {app.company}</ActionMeta>
                    </ActionItem>
                  ))}
                </ActionList>
              ) : (
                <EmptyState>No internship applications in progress</EmptyState>
              )}
            </ActionCard>

            <ActionCard>
              <ActionHeader>
                <FaCalendarAlt />
                <h3>Upcoming Events & Deadlines</h3>
              </ActionHeader>
              {upcomingEvents.length > 0 ? (
                <ActionList>
                  {upcomingEvents.map(event => (
                    <ActionItem key={event.id} to={`/dashboard/events/${event.id}`}>
                      <ActionTitle>{event.title}</ActionTitle>
                      <ActionMeta>Date: {new Date(event.date).toLocaleDateString()}</ActionMeta>
                    </ActionItem>
                  ))}
                </ActionList>
              ) : (
                <EmptyState>No upcoming events</EmptyState>
              )}
            </ActionCard>
          </ActionCards>
        </ContentSection>
      </MainContent>
    </DashboardWrapper>
  );
};

// Styled Components
const DashboardWrapper = styled.div`
  background: linear-gradient(135deg, #1a2a6c, #b21f1f);
  min-height: 100vh;
`;

const MainContent = styled.main`
  display: flex;
  padding: 20px;
  margin-top: 70px;
`;

const ContentSection = styled.section`
  margin-left: ${props => props.$isSidebarOpen ? '280px' : '0'};
  width: ${props => props.$isSidebarOpen ? 'calc(100% - 280px)' : '100%'};
  transition: all 0.3s ease;
`;

const WelcomeSection = styled.div`
  margin-bottom: 2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const WelcomeText = styled.h1`
  color: white;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  
  span {
    color: #FFD700;
    font-weight: 600;
  }
`;

const DateText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
`;

const ActionCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ActionCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem;
`;

const ActionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  svg {
    color: #154C79;
    font-size: 1.5rem;
  }
  
  h3 {
    color: white;
    font-size: 1.2rem;
    margin: 0;
  }
`;

const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActionItem = styled(Link)`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const ActionTitle = styled.h4`
  color: white;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
`;

const ActionMeta = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin: 0;
`;

const EmptyState = styled.p`
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  font-style: italic;
  margin: 1rem 0;
`;

const ManageLink = styled(Link)`
  margin-left: auto;
  color: #FFD700;
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }

  svg {
    font-size: 0.8rem;
  }
`;

export default StudentDashboard;
