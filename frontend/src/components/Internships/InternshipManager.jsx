import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getInternships, createOrUpdateApplication, getUserApplications } from '../../services/internshipService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InternshipCard from './InternshipCard'; 
import Sidebar from '../Dashboard/Sidebar';
import DashboardHeader from '../Dashboard/DashboardHeader';
import { useSidebar } from '../../contexts/SidebarContext';

const InternshipManager = () => {
  const [internships, setInternships] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isSidebarOpen } = useSidebar();

  const fetchData = async () => {
    try {
      setError(null);
      const internshipsData = await getInternships();
      setInternships(internshipsData);
      
      try {
        const applications = await getUserApplications();
        setMyApplications(applications);
      } catch (appError) {
        console.error('Applications error:', appError);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (internshipId, status) => {
    try {
      setError(null);
      
      if (!internshipId) {
        throw new Error('Invalid internship selected');
      }
      
      console.log(`Updating status for internship ${internshipId} to ${status}`);
      await createOrUpdateApplication(internshipId, status);
      
      // Refresh data
      await fetchData();
      
      toast.success('Application updated successfully');
    } catch (error) {
      console.error('Application error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update application status';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <DashboardWrapper>
      <DashboardHeader />
      <MainContent>
        <Sidebar />
        <ContentSection $isSidebarOpen={isSidebarOpen}>
          <Container>
            {error && (
              <ErrorMessage>
                {error}
                <CloseButton onClick={() => setError(null)}>×</CloseButton>
              </ErrorMessage>
            )}
            
            <Header>
              <h2>Available Internships</h2>
            </Header>

            {loading ? (
              <LoadingSpinner>Loading internships...</LoadingSpinner>
            ) : internships.length === 0 ? (
              <EmptyState>No internships available at the moment.</EmptyState>
            ) : (
              <InternshipsGrid>
                {internships.map(internship => {
                  const existingApplication = myApplications.find(
                    app => app.internship_id === internship.id
                  );

                  return (
                    <InternshipCardWrapper key={internship.id}>
                      <InternshipCard internship={internship} />
                      <ApplicationSection>
                        {existingApplication ? (
                          <StatusBadge status={existingApplication.status}>
                            {existingApplication.status.replace('_', ' ')}
                          </StatusBadge>
                        ) : (
                          <StatusSelect
                            onChange={(e) => handleStatusChange(internship.id, e.target.value)}
                            defaultValue=""
                          >
                            <option value="">Apply Now</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="SUBMITTED">Submitted</option>
                          </StatusSelect>
                        )}
                      </ApplicationSection>
                    </InternshipCardWrapper>
                  );
                })}
              </InternshipsGrid>
            )}
          </Container>
        </ContentSection>
      </MainContent>
    </DashboardWrapper>
  );
};

// Updated MyApplications component to receive applications as props
const MyApplications = ({ applications, internships }) => {
  if (!applications || applications.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">My Applications</h2>
        <p className="text-gray-600">You haven't applied to any internships yet.</p>
      </div>
    );
  }

  // Helper function to get status badge color
  const getStatusClass = (status) => {
    switch (status) {
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
      case 'SUBMITTED': return 'bg-blue-100 text-blue-800';
      case 'OFFER': return 'bg-green-100 text-green-800';
      case 'NO_OFFER': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ApplicationsWrapper>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Internship</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applications.map((app) => {
            // Find the associated internship to get title and company
            const internship = internships.find(i => i.id === app.internship_id) || {};
            
            return (
              <tr key={app.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{internship.title || 'Unknown'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{internship.company || 'Unknown'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(app.status)}`}>
                    {app.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(app.created_at).toLocaleDateString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ApplicationsWrapper>
  );
};

// Styled components
const Container = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  color: #1a2a6c;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  font-weight: 600;
`;

const InternshipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  align-items: stretch;
`;

const InternshipCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ApplicationSection = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 0 0 8px 8px;
  text-align: center;
`;

const ApplicationStatusSection = styled(ApplicationSection)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatusInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const StatusLabel = styled.span`
  color: #666;
  font-weight: 500;
`;

const ApplicationDate = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const StatusSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 10px;
`;

const StatusBadge = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  background-color: ${props => {
    switch (props.status) {
      case 'IN_PROGRESS':
        return '#fff3e0';
      case 'SUBMITTED':
        return '#e3f2fd';
      case 'OFFER':
        return '#e8f5e9';
      case 'NO_OFFER':
        return '#ffebee';
      default:
        return '#e0e0e0';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'IN_PROGRESS':
        return '#e65100';
      case 'SUBMITTED':
        return '#0277bd';
      case 'OFFER':
        return '#2e7d32';
      case 'NO_OFFER':
        return '#c62828';
      default:
        return '#333';
    }
  }};
`;

const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  color: #1a2a6c;
  font-size: 1.1rem;
`;

const ApplicationsWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  overflow: hidden;
`;

const DashboardWrapper = styled.div`
  min-height: 100vh;
  background: #f5f5f5;
`;

const MainContent = styled.div`
  display: flex;
  min-height: calc(100vh - 70px);
  margin-top: 70px;
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

const Header = styled.div`
  margin-bottom: 20px;
  
  h2 {
    color: #1a2a6c;
    font-size: 24px;
  }
`;

const InternshipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 12px;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #c62828;
  font-size: 20px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

export default InternshipManager;