import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import DashboardHeader from '../Dashboard/DashboardHeader';
import Sidebar from '../Dashboard/Sidebar';
import { useSidebar } from '../../contexts/SidebarContext';
import ReportForm from './ReportForm';
import { getUserFeedbacks } from '../../services/feedbackService';
import { FaPlus, FaCheckCircle, FaClock, FaExclamationCircle, FaSpinner, FaCheck } from 'react-icons/fa';

const ReportsPage = () => {
  const { isSidebarOpen } = useSidebar();
  const [reports, setReports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showResolved, setShowResolved] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await getUserFeedbacks();
      console.log('Fetched reports:', data); // Add this for debugging
      if (data && data.success) {
        setReports(data.feedbacks || []);
      } else {
        setReports([]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('Failed to load reports');
      setReports([]);
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'RESOLVED':
        return <FaCheckCircle color="#4caf50" />;
      case 'PENDING':
        return <FaClock color="#ff9800" />;
      case 'IN_PROGRESS':
        return <FaExclamationCircle color="#2196f3" />;
      default:
        return <FaClock color="#ff9800" />;
    }
  };

  const handleSubmitSuccess = () => {
    setShowForm(false);
    fetchReports(); 
  };

  const sortedReports = reports.sort((a, b) => {
    const getPriority = (status) => {
      switch (status) {
        case 'PENDING': return 1;
        case 'IN_PROGRESS': return 2;
        case 'RESOLVED': return 3;
        default: return 4;
      }
    };
    return getPriority(a.status) - getPriority(b.status);
  });

  const filteredReports = showResolved 
    ? sortedReports 
    : sortedReports.filter(report => report.status !== 'RESOLVED');

  return (
    <DashboardWrapper>
      <DashboardHeader />
      <MainContent>
        <Sidebar />
        <ContentSection $isSidebarOpen={isSidebarOpen}>
          {!showForm ? (
            <>
              <Header>
                <HeaderLeft>
                  <h1>My Reports</h1>
                  <FilterToggle>
                    <input
                      type="checkbox"
                      checked={showResolved}
                      onChange={(e) => setShowResolved(e.target.checked)}
                      id="showResolved"
                    />
                    <label htmlFor="showResolved">Show Resolved Reports</label>
                  </FilterToggle>
                </HeaderLeft>
                <NewReportButton onClick={() => setShowForm(true)}>
                  <FaPlus /> New Report
                </NewReportButton>
              </Header>

              {loading ? (
                <LoadingMessage>Loading reports...</LoadingMessage>
              ) : filteredReports.length > 0 ? (
                <ReportsGrid>
                  {filteredReports.map((report) => (
                    <ReportCard key={report.id}>
                      <ReportHeader>
                        <CategoryBadge>{report.category}</CategoryBadge>
                        <StatusBadge status={report.status}>
                          {getStatusIcon(report.status)}
                          {report.status || 'PENDING'}
                        </StatusBadge>
                      </ReportHeader>

                      <ReportTitle>{report.title}</ReportTitle>
                      <ReportDescription>{report.description}</ReportDescription>
                      
                      <ReportMeta>
                        <Priority priority={report.priority}>
                          Priority: {report.priority}
                        </Priority>
                        <SubmittedDate>
                          Submitted: {new Date(report.created_at).toLocaleDateString()}
                        </SubmittedDate>
                      </ReportMeta>

                      {report.attachment_path && (
                        <AttachmentLink 
                          href={report.attachment_path} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          View Attachment
                        </AttachmentLink>
                      )}
                    </ReportCard>
                  ))}
                </ReportsGrid>
              ) : (
                <EmptyState>
                  <p>No reports found.</p>
                  <NewReportButton onClick={() => setShowForm(true)}>
                    <FaPlus /> Submit Your First Report
                  </NewReportButton>
                </EmptyState>
              )}
            </>
          ) : (
            <FormContainer>
              <BackButton onClick={() => setShowForm(false)}>← Back to Reports</BackButton>
              <ReportForm onSubmitSuccess={handleSubmitSuccess} />
            </FormContainer>
          )}
        </ContentSection>
      </MainContent>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  h1 {
    color: #2c3e50;
    margin: 0;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const FilterToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #555;

  input[type="checkbox"] {
    accent-color: #1565c0;
  }

  label {
    cursor: pointer;
  }
`;

const NewReportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #1565c0;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #1976d2;
    transform: translateY(-2px);
  }
`;

const ReportsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ReportCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
`;

const ReportHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CategoryBadge = styled.span`
  background: #f5f5f5;
  color: #424242;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid #e0e0e0;
  margin-right: 0.5rem;
`;

const StatusBadge = styled.span`
  background: ${props => {
    switch (props.status) {
      case 'RESOLVED': return '#e8f5e9';
      case 'IN_PROGRESS': return '#e3f2fd';
      case 'PENDING': return '#fff3e0';
      default: return '#fff3e0';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'RESOLVED': return '#2e7d32';
      case 'IN_PROGRESS': return '#1565c0';
      case 'PENDING': return '#e65100';
      default: return '#e65100';
    }
  }};
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 500;
`;

const ReportTitle = styled.h3`
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
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
  margin-top: 1rem;
`;

const Priority = styled.span`
  color: ${props => {
    switch (props.priority) {
      case 'high': return '#ff4444';
      case 'medium': return '#ffbb33';
      default: return '#00C851';
    }
  }};
  font-size: 0.9rem;
`;

const SubmittedDate = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`;

const AttachmentLink = styled.a`
  display: inline-block;
  margin-top: 1rem;
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
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: white;

  p {
    margin-bottom: 1.5rem;
  }
`;

const FormContainer = styled.div`
  position: relative;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  font-size: 1rem;

  &:hover {
    color: #FFD700;
  }
`;

const ReportDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem 0;
`;

export default ReportsPage;