import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { getAllFeedbacks, updateFeedbackStatus } from '../../services/feedbackService';
import { FaCheckCircle, FaClock, FaSpinner, FaDownload } from 'react-icons/fa';


const getStatusColor = (status) => {
  switch (status) {
    case 'RESOLVED':
      return '#4caf50';
    case 'IN_PROGRESS':
      return '#2196f3';
    case 'PENDING':
      return '#ff9800';
    default:
      return '#ff9800'; 
  }
};

const getStatusPriority = (status) => {
  switch (status) {
    case 'PENDING':
      return 1;
    case 'IN_PROGRESS':
      return 2;
    case 'RESOLVED':
      return 3;
    default:
      return 4;
  }
};

const ManageReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('PENDING');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

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
      setLoading(true);
      const response = await updateFeedbackStatus(reportId, newStatus);
      
      if (response.success) {
        setReports(prevReports => 
          prevReports.map(report => 
            report.id === reportId 
              ? { ...report, status: newStatus }
              : report
          )
        );
        toast.success('Status updated successfully');
      } else {
        throw new Error(response.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(error.message || 'Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const filteredReports = reports
    .filter(report => {
      const matchesStatus = selectedStatus === 'ALL' || report.status === selectedStatus;
      const matchesCategory = selectedCategory === 'ALL' || 
                            report.category.toUpperCase() === selectedCategory;
      return matchesStatus && matchesCategory;
    })
    .sort((a, b) => {
      // Sort by status priority
      return getStatusPriority(a.status) - getStatusPriority(b.status);
    });

  const getReportsByStatus = (status) => {
    return reports.filter(report => 
      (status === 'ALL' || report.status === status) &&
      (selectedCategory === 'ALL' || report.category.toUpperCase() === selectedCategory)
    );
  };

  return (
    <Container>
      <Header>
        <h1>Manage Reports</h1>
      </Header>
      
      <FilterContainer>
        <StatusSection>
          {['ALL', 'PENDING', 'IN_PROGRESS', 'RESOLVED'].map(status => (
            <StatusFilter key={status}>
              <StatusButton
                $isActive={selectedStatus === status}
                onClick={() => setSelectedStatus(status)}
              >
                {status.replace('_', ' ')} ({getReportsByStatus(status).length})
              </StatusButton>
              {selectedStatus === status && (
                <CategoryDropdown
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="ALL">All Categories</option>
                  <option value="BUG">Bug Reports</option>
                  <option value="FEATURE">Feature Requests</option>
                  <option value="IMPROVEMENT">Improvements</option>
                  <option value="OTHER">Other</option>
                </CategoryDropdown>
              )}
            </StatusFilter>
          ))}
        </StatusSection>
      </FilterContainer>

      {loading ? (
        <LoadingMessage>
          <FaSpinner className="spinner" /> Loading reports...
        </LoadingMessage>
      ) : filteredReports.length > 0 ? (
        <ReportsGrid>
          {filteredReports.map((report) => (
            <ReportCard key={report.id}>
              <ReportHeader>
                <CategoryBadge $category={report.category}>
                  {report.category === 'bug' ? 'Bug Report' :
                   report.category === 'feature' ? 'Feature Request' :
                   report.category === 'improvement' ? 'Improvement' :
                   'Other'}
                </CategoryBadge>
                <StatusBadge $status={report.status}>
                  {report.status.replace('_', ' ')}
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
  background: #f5f5f5;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    color: #333;
    margin: 0;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0 2rem;
  flex-wrap: wrap;
`;

const StatusSection = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const StatusFilter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatusButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: ${props => props.$isActive ? '#1565c0' : 'white'};
  color: ${props => props.$isActive ? 'white' : '#333'};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  min-width: 150px;

  &:hover {
    background: ${props => props.$isActive ? '#1976d2' : '#f5f5f5'};
    border-color: ${props => props.$isActive ? '#1976d2' : '#ccc'};
  }
`;

const CategoryDropdown = styled.select`
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  background: white;
  color: #333;
  font-size: 0.9rem;
  cursor: pointer;
  width: 100%;

  &:hover {
    border-color: #1565c0;
  }

  &:focus {
    outline: none;
    border-color: #1565c0;
    box-shadow: 0 0 0 2px rgba(21, 101, 192, 0.1);
  }
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: ${props => props.$isActive ? '#1565c0' : 'white'};
  color: ${props => props.$isActive ? 'white' : '#333'};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$isActive ? '#1976d2' : '#f5f5f5'};
    border-color: ${props => props.$isActive ? '#1976d2' : '#ccc'};
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    color: #666;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const ReportsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const ReportCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CategoryBadge = styled.span`
  background: ${props => {
    switch (props.$category?.toLowerCase()) {
      case 'bug':
        return '#ffebee';
      case 'feature':
        return '#e8f5e9';
      case 'improvement':
        return '#e3f2fd';
      default:
        return '#f3e5f5';
    }
  }};
  color: ${props => {
    switch (props.$category?.toLowerCase()) {
      case 'bug':
        return '#c62828';
      case 'feature':
        return '#2e7d32';
      case 'improvement':
        return '#1565c0';
      default:
        return '#6a1b9a';
    }
  }};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  background-color: ${props => {
    switch (props.$status) {
      case 'RESOLVED':
        return '#e8f5e9';
      case 'IN_PROGRESS':
        return '#e3f2fd';
      case 'PENDING':
        return '#fff3e0';
      default:
        return '#fff3e0';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'RESOLVED':
        return '#2e7d32';
      case 'IN_PROGRESS':
        return '#1565c0';
      case 'PENDING':
        return '#e65100';
      default:
        return '#e65100';
    }
  }};
  font-weight: 600;
`;

const ReportTitle = styled.h3`
  color: #333;
  margin: 0 0 0.5rem 0;
`;

const ReportDescription = styled.p`
  color: #555;
  margin: 0 0 1rem 0;
  line-height: 1.5;
`;

const ReportMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: #666;
`;

const UserInfo = styled.span`
  color: #555;
`;

const DateInfo = styled.span`
  color: #666;
`;

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
  color: #1565c0;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const LoadingMessage = styled.div`
  color: #666;
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
  color: #666;
`;

export default ManageReports;