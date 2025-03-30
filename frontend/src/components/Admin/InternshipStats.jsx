import React from 'react';
import styled from 'styled-components';

const InternshipStats = ({ stats, onClose }) => {
  if (!stats) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Header>
          <h2>{stats.applications[0]?.internship_title} - Statistics</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>

        <StatsGrid>
          <StatCard>
            <StatLabel>Total Applications</StatLabel>
            <StatValue>{stats.total}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>In Progress</StatLabel>
            <StatValue>{stats.IN_PROGRESS}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Submitted</StatLabel>
            <StatValue>{stats.SUBMITTED}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Offers Made</StatLabel>
            <StatValue>{stats.OFFER}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>No Offers</StatLabel>
            <StatValue>{stats.NO_OFFER}</StatValue>
          </StatCard>
        </StatsGrid>

        <ApplicationsList>
          <h3>Applications</h3>
          {stats.applications.map((app) => (
            <ApplicationItem key={app.id}>
              <UserInfo>
                <Name>{app.user_name}</Name>
                <Email>{app.user_email}</Email>
              </UserInfo>
              <StatusBadge status={app.status}>
                {app.status.replace('_', ' ')}
              </StatusBadge>
              <DateInfo>
                Applied: {new Date(app.created_at).toLocaleDateString()}
              </DateInfo>
            </ApplicationItem>
          ))}
        </ApplicationsList>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2rem;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h2 {
    margin: 0;
    color: #1a2a6c;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #333;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  color: #1a2a6c;
  font-size: 1.5rem;
  font-weight: bold;
`;

const ApplicationsList = styled.div`
  h3 {
    color: #1a2a6c;
    margin-bottom: 1rem;
  }
`;

const ApplicationItem = styled.div`
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const Name = styled.div`
  font-weight: 600;
`;

const Email = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  white-space: nowrap;
  background: ${props => {
    switch (props.status) {
      case 'IN_PROGRESS': return '#fff3e0';
      case 'SUBMITTED': return '#e3f2fd';
      case 'OFFER': return '#e8f5e9';
      case 'NO_OFFER': return '#ffebee';
      default: return '#e0e0e0';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'IN_PROGRESS': return '#e65100';
      case 'SUBMITTED': return '#0277bd';
      case 'OFFER': return '#2e7d32';
      case 'NO_OFFER': return '#c62828';
      default: return '#333';
    }
  }};
`;

const DateInfo = styled.div`
  color: #666;
  font-size: 0.9rem;
  white-space: nowrap;
`;

export default InternshipStats;