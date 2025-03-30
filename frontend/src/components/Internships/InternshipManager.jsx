import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getInternships, createOrUpdateApplication, getUserApplications } from '../../services/internshipService';
import { toast } from 'react-toastify';
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
  const [statusFilter, setStatusFilter] = useState('ALL');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch internships
      const internshipsData = await getInternships();
      setInternships(internshipsData || []);
      
      // Fetch user's applications
      const applications = await getUserApplications();
      setMyApplications(applications || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message || 'Failed to load data');
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (internshipId, newStatus) => {
    try {
      setError(null);
      
      if (!internshipId) {
        throw new Error('Invalid internship selected');
      }
      
      await createOrUpdateApplication(internshipId, newStatus);
      await fetchData(); // Refresh data after successful update
      toast.success('Application status updated successfully');
    } catch (error) {
      console.error('Application error:', error);
      setError(error.message || 'Failed to update application status');
      toast.error('Failed to update application status');
    }
  };

  // Filter out internships that user has already applied to
  const availableInternships = internships.filter(internship => 
    !myApplications.some(app => app.internship_id === internship.id)
  );

  const getStatusCounts = () => {
    const counts = {
      IN_PROGRESS: 0,
      SUBMITTED: 0,
      OFFER: 0,
      NO_OFFER: 0
    };
    
    myApplications.forEach(app => {
      if (counts.hasOwnProperty(app.status)) {
        counts[app.status]++;
      }
    });
    
    return counts;
  };

  const getFilteredApplications = () => {
    if (statusFilter === 'ALL') return myApplications;
    return myApplications.filter(app => app.status === statusFilter);
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

            <Section>
              <SectionHeader>
                <SectionTitle>My Applications</SectionTitle>
                <FilterSection>
                  <FilterLabel>Filter by Status:</FilterLabel>
                  <FilterSelect 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="ALL">
                      All Applications ({myApplications.length})
                    </option>
                    <option value="IN_PROGRESS">
                      In Progress ({getStatusCounts().IN_PROGRESS})
                    </option>
                    <option value="SUBMITTED">
                      Submitted ({getStatusCounts().SUBMITTED})
                    </option>
                    <option value="OFFER">
                      Offer Received ({getStatusCounts().OFFER})
                    </option>
                    <option value="NO_OFFER">
                      No Offer ({getStatusCounts().NO_OFFER})
                    </option>
                  </FilterSelect>
                </FilterSection>
              </SectionHeader>

              {loading ? (
                <LoadingSpinner>Loading applications...</LoadingSpinner>
              ) : getFilteredApplications().length === 0 ? (
                <EmptyState>
                  {statusFilter === 'ALL' 
                    ? 'No applications yet' 
                    : `No ${statusFilter.toLowerCase().replace('_', ' ')} applications`}
                </EmptyState>
              ) : (
                <ApplicationsGrid>
                  {getFilteredApplications().map(app => {
                    const internship = internships.find(i => i.id === app.internship_id);
                    if (!internship) return null;
                    
                    return (
                      <ApplicationCard key={app.id}>
                        <Header>
                          <CompanyLogo>
                            {internship.company?.[0] || '?'}
                          </CompanyLogo>
                          <HeaderContent>
                            <Title>{internship.title}</Title>
                            <Company>{internship.company}</Company>
                          </HeaderContent>
                        </Header>
                        <Details>
                          <DetailItem>Location: {internship.location}</DetailItem>
                          <DetailItem>Type: {internship.type}</DetailItem>
                          <DetailItem>Duration: {internship.duration}</DetailItem>
                        </Details>
                        <StatusSection>
                          <StatusBadge status={app.status}>
                            {app.status.replace('_', ' ')}
                          </StatusBadge>
                          {app.status === 'IN_PROGRESS' && (
                            <ActionButtons>
                              <StatusButton onClick={() => handleStatusChange(app.internship_id, 'SUBMITTED')}>
                                Mark as Submitted
                              </StatusButton>
                              <DeleteButton onClick={() => handleStatusChange(app.internship_id, 'DELETE')}>
                                Delete Application
                              </DeleteButton>
                            </ActionButtons>
                          )}
                          {app.status === 'SUBMITTED' && (
                            <ActionButtons>
                              <StatusButton success onClick={() => handleStatusChange(app.internship_id, 'OFFER')}>
                                Received Offer
                              </StatusButton>
                              <StatusButton reject onClick={() => handleStatusChange(app.internship_id, 'NO_OFFER')}>
                                No Offer
                              </StatusButton>
                            </ActionButtons>
                          )}
                        </StatusSection>
                        <ApplicationDate>
                          Applied: {new Date(app.created_at).toLocaleDateString()}
                        </ApplicationDate>
                      </ApplicationCard>
                    );
                  })}
                </ApplicationsGrid>
              )}
            </Section>

            <Section>
              <SectionTitle>Available Internships</SectionTitle>
              {loading ? (
                <LoadingSpinner>Loading internships...</LoadingSpinner>
              ) : availableInternships.length === 0 ? (
                <EmptyState>No available internships at the moment</EmptyState>
              ) : (
                <InternshipsGrid>
                  {availableInternships.map(internship => (
                    <ApplicationCard key={internship.id}>
                      <Header>
                        <CompanyLogo>
                          {internship.company?.[0] || '?'}
                        </CompanyLogo>
                        <HeaderContent>
                          <Title>{internship.title}</Title>
                          <Company>{internship.company}</Company>
                        </HeaderContent>
                      </Header>
                      <Details>
                        <DetailItem>Location: {internship.location}</DetailItem>
                        <DetailItem>Type: {internship.type}</DetailItem>
                        <DetailItem>Duration: {internship.duration}</DetailItem>
                        <DetailItem>Stipend: {internship.stipend}</DetailItem>
                      </Details>
                      <ApplyButton
                        onClick={() => handleStatusChange(internship.id, 'IN_PROGRESS')}
                      >
                        Apply Now
                      </ApplyButton>
                    </ApplicationCard>
                  ))}
                </InternshipsGrid>
              )}
            </Section>
          </Container>
        </ContentSection>
      </MainContent>
    </DashboardWrapper>
  );
};

// Styled components
const Container = styled.div`
  padding: 24px;
  width: 100%;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FilterLabel = styled.label`
  color: #666;
  font-weight: 500;
`;

const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  color: #333;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    border-color: #999;
  }

  &:focus {
    outline: none;
    border-color: #1a2a6c;
    box-shadow: 0 0 0 2px rgba(26, 42, 108, 0.1);
  }

  option {
    padding: 8px;
  }
`;

const SectionTitle = styled.h2`
  color: #333;
  font-size: 1.5rem;
  margin: 0;
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
  gap: 24px;
  padding: 20px 0;
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

const ApplicationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const ApplicationCard = styled.div`
  background: linear-gradient(135deg, #1a2a6c, #b21f1f);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const CompanyLogo = styled.div`
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  font-size: 24px;
  color: white;
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  color: white;
  font-size: 1.2rem;
  margin: 0 0 4px 0;
`;

const Company = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-size: 0.9rem;
`;

const Details = styled.div`
  margin: 16px 0;
`;

const DetailItem = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin: 4px 0;
`;

const ApplyButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 24px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const StyledApplicationDate = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const StatusSection = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const StatusButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  background: ${props => 
    props.success ? 'rgba(46, 213, 115, 0.2)' :
    props.reject ? 'rgba(255, 71, 87, 0.2)' :
    'rgba(255, 255, 255, 0.2)'};
  color: white;

  &:hover {
    transform: translateY(-2px);
    background: ${props => 
      props.success ? 'rgba(46, 213, 115, 0.3)' :
      props.reject ? 'rgba(255, 71, 87, 0.3)' :
      'rgba(255, 255, 255, 0.3)'};
  }
`;

const DeleteButton = styled(StatusButton)`
  background: rgba(255, 71, 87, 0.2);
  
  &:hover {
    background: rgba(255, 71, 87, 0.3);
  }
`;

export default InternshipManager;