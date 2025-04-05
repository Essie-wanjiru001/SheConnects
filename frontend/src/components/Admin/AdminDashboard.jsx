import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getAdminStats } from '../../services/adminService';
import { FaUsers, FaGraduationCap, FaBriefcase, FaCalendarAlt, FaFlag } from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: '-',
    activeScholarships: '-',
    activeInternships: '-',
    upcomingEvents: '-',
    pendingReports: '-'
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAdminStats();
        setStats(data.stats);
      } catch (error) {
        console.error('Dashboard Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <LoadingContainer>Loading dashboard statistics...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <DashboardContainer>
      <Header>
        <h1>Admin Dashboard</h1>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatIcon><FaUsers /></StatIcon>
          <StatTitle>Total Users</StatTitle>
          <StatValue>{stats.totalUsers}</StatValue>
        </StatCard>
        <StatCard>
          <StatIcon><FaGraduationCap /></StatIcon>
          <StatTitle>Active Scholarships</StatTitle>
          <StatValue>{stats.activeScholarships}</StatValue>
        </StatCard>
        <StatCard>
          <StatIcon><FaBriefcase /></StatIcon>
          <StatTitle>Active Internships</StatTitle>
          <StatValue>{stats.activeInternships}</StatValue>
        </StatCard>
        <StatCard>
          <StatIcon><FaCalendarAlt /></StatIcon>
          <StatTitle>Upcoming Events</StatTitle>
          <StatValue>{stats.upcomingEvents}</StatValue>
        </StatCard>
        <StatCard $highlight={stats.pendingReports > 0}>
          <StatIcon><FaFlag /></StatIcon>
          <StatTitle>Pending Reports</StatTitle>
          <StatValue>{stats.pendingReports}</StatValue>
        </StatCard>
      </StatsGrid>

      <ActionsGrid>
        <ActionCard to="/admin/users">
          <ActionIcon><FaUsers /></ActionIcon>
          <h3>Manage Users</h3>
          <p>View and manage user accounts</p>
        </ActionCard>
        
        <ActionCard to="/admin/scholarships">
          <ActionIcon><FaGraduationCap /></ActionIcon>
          <h3>Manage Scholarships</h3>
          <p>Add, edit, or remove scholarships</p>
        </ActionCard>
        
        <ActionCard to="/admin/internships">
          <ActionIcon><FaBriefcase /></ActionIcon>
          <h3>Manage Internships</h3>
          <p>Add, edit, or remove internships</p>
        </ActionCard>
        
        <ActionCard to="/admin/events">
          <ActionIcon><FaCalendarAlt /></ActionIcon>
          <h3>Manage Events</h3>
          <p>Add, edit, or remove events</p>
        </ActionCard>

        <ActionCard to="/admin/reports">
          <ActionIcon><FaFlag /></ActionIcon>
          <h3>Manage Reports</h3>
          <p>View and handle user feedback and reports</p>
          {stats.pendingReports > 0 && (
            <PendingBadge>{stats.pendingReports}</PendingBadge>
          )}
        </ActionCard>
      </ActionsGrid>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  padding: 2rem;
  background: #1a2a6c; // Darker background
  min-height: 100vh;
`;

const Header = styled.header`
  margin-bottom: 2rem;
  h1 {
    color: #ffffff;
    font-size: 2rem;
    font-weight: 600;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: ${props => props.$highlight ? 'rgba(255, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.15)'};
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.3s ease;
  border: 1px solid ${props => props.$highlight ? 'rgba(255, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-5px);
    background: ${props => props.$highlight ? 'rgba(255, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const StatIcon = styled.div`
  font-size: 2rem;
  color: #29bf9f;
  margin-bottom: 0.5rem;
`;

const StatTitle = styled.h3`
  color: #ffffff;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const StatValue = styled.div`
  color: #29bf9f; // Brighter color for better visibility
  font-size: 2rem;
  font-weight: bold;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ActionCard = styled(Link)`
  background: rgba(41, 191, 159, 0.1); // Teal tint
  padding: 1.5rem;
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(41, 191, 159, 0.2);

  h3 {
    color: #ffffff;
    margin: 1rem 0 0.5rem;
    font-size: 1.2rem;
  }

  p {
    color: #b8b8b8; // Lighter gray for better readability
    margin: 0;
    font-size: 0.9rem;
  }

  &:hover {
    transform: translateY(-5px);
    background: rgba(41, 191, 159, 0.2);
    border-color: rgba(41, 191, 159, 0.3);
  }
`;

const ActionIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #29bf9f; // Matching teal color
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ffffff;
  font-size: 1.1rem;
`;

const ErrorContainer = styled.div`
  padding: 2rem;
  text-align: center;
  color: #ff6b6b; // Brighter red for errors
  background: rgba(255, 0, 0, 0.1);
  border-radius: 8px;
  margin: 1rem;
  border: 1px solid rgba(255, 0, 0, 0.2);
`;

const PendingBadge = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  background: #ff4444;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
`;

export default AdminDashboard;