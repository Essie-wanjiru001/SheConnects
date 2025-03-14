import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAdminStats } from '../../services/adminService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeScholarships: 0,
    activeInternships: 0,
    upcomingEvents: 0
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAdminStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
        setError('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner>Loading stats...</LoadingSpinner>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <DashboardContainer>
      <Header>
        <h1>Admin Dashboard</h1>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatTitle>Total Users</StatTitle>
          <StatValue>{stats.totalUsers}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Active Scholarships</StatTitle>
          <StatValue>{stats.activeScholarships}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Active Internships</StatTitle>
          <StatValue>{stats.activeInternships}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Upcoming Events</StatTitle>
          <StatValue>{stats.upcomingEvents}</StatValue>
        </StatCard>
      </StatsGrid>

      <ActionsGrid>
        <ActionCard to="/admin/users">
          <h3>Manage Users</h3>
          <p>View and manage user accounts</p>
        </ActionCard>
        <ActionCard to="/admin/scholarships">
          <h3>Manage Scholarships</h3>
          <p>Add, edit, or remove scholarships</p>
        </ActionCard>
        <ActionCard to="/admin/internships">
          <h3>Manage Internships</h3>
          <p>Add, edit, or remove internships</p>
        </ActionCard>
        <ActionCard to="/admin/events">
          <h3>Manage Events</h3>
          <p>Add, edit, or remove events</p>
        </ActionCard>
      </ActionsGrid>
    </DashboardContainer>
  );
};

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ffffff;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ff4444;
  background: rgba(255, 0, 0, 0.1);
  border-radius: 8px;
  margin: 1rem;
`;

const DashboardContainer = styled.div`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  min-height: 100vh;
`;

const Header = styled.header`
  margin-bottom: 2rem;
  h1 {
    color: #ffffff;
    font-size: 2rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
`;

const StatTitle = styled.h3`
  color: #ffffff;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  color: #ffffff;
  font-size: 2rem;
  font-weight: bold;
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ActionCard = styled.div`
  background: rgba(255, 255, 255, 0.15);
  padding: 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: #ffffff;
    margin-bottom: 0.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
  }
`;

export default AdminDashboard;