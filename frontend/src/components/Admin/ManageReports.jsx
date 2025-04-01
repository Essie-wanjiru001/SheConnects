import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { getAllFeedbacks, updateFeedbackStatus } from '../../services/feedbackService';
import { FaCheckCircle, FaClock, FaSpinner, FaDownload } from 'react-icons/fa';

const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await getAllFeedbacks();
      if (data.success) {
        setReports(data.feedbacks);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('Failed to load reports');
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (reportId, newStatus) => {
    try {
      const response = await updateFeedbackStatus(reportId, newStatus);
      if (response.success) {
        setReports(reports.map(report => 
          report.id === reportId ? { ...report, status: newStatus } : report
        ));
        toast.success('Report status updated successfully');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update report status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'RESOLVED': return '#4caf50';
      case 'IN_PROGRESS': return '#2196f3';
      case 'PENDING': return '#ff9800';
      default: return '#ff9800';
    }
  };

  const filteredReports = reports.filter(report => {
    if (filter === 'all') return true;
    return report.status === filter;
  });

  return (
    <Container>
      <Header>
        <h1>Manage Reports</h1>
        <FilterContainer>
          <FilterButton 
            $active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton 
            $active={filter === 'PENDING'} 
            onClick={() => setFilter('PENDING')}
          >
            Pending
          </FilterButton>
          <FilterButton 
            $active={filter === 'IN_PROGRESS'} 
            onClick={() => setFilter('IN_PROGRESS')}
          >
            In Progress
          </FilterButton>
          <FilterButton 
            $active={filter === 'RESOLVED'} 
            onClick={() => setFilter('RESOLVED')}
          >
            Resolved
          </FilterButton>
        </FilterContainer>
      </Header>

      {loading ? (
        <LoadingMessage>
          <FaSpinner className="spinner" /> Loading reports...
        </LoadingMessage>
      ) : filteredReports.length > 0 ? (
        <ReportsGrid>
          {filteredReports.map((report) => (
            <ReportCard key={report.id}>
              <ReportHeader>
                <CategoryBadge>{report.category}</CategoryBadge>
                <StatusBadge $status={report.status}>
                  {report.status || 'PENDING'}
                </StatusBadge>
              </ReportHeader>

              <ReportTitle>{report.title}</ReportTitle>
              <ReportDescription>{report.description}</ReportDescription>

              <ReportMeta>
                <UserInfo>
                  Submitted by: {report.user_name}
                </UserInfo>
                <DateInfo>
                  {new Date(report.created_at).toLocaleDateString()}
                </DateInfo>
              </ReportMeta>

              {report.attachment_path && (
                <AttachmentLink 
                  href={report.attachment_path} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <FaDownload /> View Attachment
                </AttachmentLink>
              )}

              <ActionButtons>
                {report.status !== 'IN_PROGRESS' && (
                  <ActionButton 
                    onClick={() => handleStatusUpdate(report.id, 'IN_PROGRESS')}
                    $color="#2196f3"
                  >
                    Mark In Progress
                  </ActionButton>
                )}
                {report.status !== 'RESOLVED' && (
                  <ActionButton 
                    onClick={() => handleStatusUpdate(report.id, 'RESOLVED')}
                    $color="#4caf50"
                  >
                    Mark Resolved
                  </ActionButton>
                )}
                {report.status !== 'PENDING' && (
                  <ActionButton 
                    onClick={() => handleStatusUpdate(report.id, 'PENDING')}
                    $color="#ff9800"
                  >
                    Mark Pending
                  </ActionButton>
                )}
              </ActionButtons>
            </ReportCard>
          ))}
        </ReportsGrid>
      ) : (
        <EmptyState>
          <p>No reports found for the selected filter.</p>
        </EmptyState>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    color: white;
    margin: 0;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.$active ? '#FFD700' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.$active ? '#1a2a6c' : 'white'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$active ? '#FFC700' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const ReportsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const ReportCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CategoryBadge = styled.span`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
`;

const StatusBadge = styled.span`
  color: ${props => getStatusColor(props.$status)};
  font-weight: 600;
  font-size: 0.85rem;
`;

const ReportTitle = styled.h3`
  color: white;
  margin: 0 0 0.5rem 0;
`;

const ReportDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const ReportMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
`;

const UserInfo = styled.span``;

const DateInfo = styled.span``;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  background: ${props => props.$color || '#FFD700'};
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.85rem;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const AttachmentLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #FFD700;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const LoadingMessage = styled.div`
  color: white;
  text-align: center;
  padding: 2rem;

  .spinner {
    animation: spin 1s linear infinite;
    margin-right: 0.5rem;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: white;
`;

export default ManageReports;