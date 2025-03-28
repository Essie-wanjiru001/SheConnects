import React from 'react';
import styled from 'styled-components';

const ScholarshipStatsModal = ({ scholarship, applications, onClose }) => {
  const getStatusCounts = () => {
    const counts = {
      IN_PROGRESS: 0,
      SUBMITTED: 0,
      ACCEPTED: 0,
      REJECTED: 0
    };
    
    applications.forEach(app => {
      if (counts.hasOwnProperty(app.status)) {
        counts[app.status]++;
      }
    });
    
    return counts;
  };

  const counts = getStatusCounts();

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>{scholarship.name} - Applications Statistics</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <StatsSection>
            <StatCard>
              <StatLabel>Total Applications</StatLabel>
              <StatValue>{applications.length}</StatValue>
            </StatCard>
            {Object.entries(counts).map(([status, count]) => (
              <StatCard key={status}>
                <StatLabel>{status.replace('_', ' ')}</StatLabel>
                <StatValue>{count}</StatValue>
              </StatCard>
            ))}
          </StatsSection>

          <ApplicationsList>
            <h3>Applications by Status</h3>
            {['IN_PROGRESS', 'SUBMITTED', 'ACCEPTED', 'REJECTED'].map(status => (
              <StatusSection key={status}>
                <StatusHeader>{status.replace('_', ' ')}</StatusHeader>
                {applications.filter(app => app.status === status).map(app => (
                  <ApplicationCard key={app.id}>
                    <div>
                      <strong>{app.user_name}</strong>
                      <div>Applied: {new Date(app.created_at).toLocaleDateString()}</div>
                    </div>
                  </ApplicationCard>
                ))}
              </StatusSection>
            ))}
          </ApplicationsList>
        </ModalBody>
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
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
`;

const ModalBody = styled.div`
  padding: 1.5rem;
`;

const StatsSection = styled.div`
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
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a2a6c;
`;

const ApplicationsList = styled.div`
  h3 {
    color: #1a2a6c;
    margin-bottom: 1rem;
  }
`;

const StatusSection = styled.div`
  margin-bottom: 1.5rem;
`;

const StatusHeader = styled.h4`
  color: #666;
  margin-bottom: 0.5rem;
`;

const ApplicationCard = styled.div`
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

export default ScholarshipStatsModal;