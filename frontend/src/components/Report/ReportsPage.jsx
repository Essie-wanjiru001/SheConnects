import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import DashboardHeader from '../Dashboard/DashboardHeader';
import Sidebar from '../Dashboard/Sidebar';
import { useSidebar } from '../../contexts/SidebarContext';
import ReportForm from './ReportForm';
import { getUserFeedbacks } from '../../services/feedbackService';
import { FaPlus, FaCheckCircle, FaClock, FaExclamationCircle } from 'react-icons/fa';

const ReportsPage = () => {
  const { isSidebarOpen } = useSidebar();
  const [reports, setReports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

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

  return (
    <DashboardWrapper>
      <DashboardHeader />
      <MainContent>
        <Sidebar />
        <ContentSection $isSidebarOpen={isSidebarOpen}>
          {!showForm ? (
            <>
              <Header>
                <h1>My Reports</h1>
                <NewReportButton onClick={() => setShowForm(true)}>
                  <FaPlus /> New Report
                </NewReportButton>
              </Header>

              {loading ? (
                <LoadingMessage>Loading reports...</LoadingMessage>
              ) : reports.length > 0 ? (
                <ReportsGrid>
                  {reports.map((report) => (
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
                  <p>You haven't submitted any reports yet.</p>
                  <NewReportButton onClick={() => setShowForm(true)}>
                    <FaPlus /> Submit Your First Report
                  </NewReportButton>
                </EmptyState>
              )}
            </>
          ) : (
            <FormContainer>
              <BackButton onClick={() => setShowForm(false)}>← Back to Reports</BackButton>
              <ReportForm onSubmitSuccess={() => {
                setShowForm(false);
                fetchReports();
              }} />
            </FormContainer>
          )}
        </ContentSection>
      </MainContent>
    </DashboardWrapper>
  );
};

const DashboardWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f);
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
    color: white;
    margin: 0;
  }
`;

const NewReportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #FFD700;
  color: #1a2a6c;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #FFC700;
    transform: translateY(-2px);
  }
`;

const ReportsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-size: 0.85rem;
`;

const ReportTitle = styled.h3`
  color: white;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
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

export default ReportsPage;