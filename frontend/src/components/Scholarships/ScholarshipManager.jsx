import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getScholarships, getMyScholarships, updateApplicationStatus, createScholarshipApplication, updateApplicationNotes } from '../../services/scholarshipService';
import { useSidebar } from '../../contexts/SidebarContext';
import DashboardHeader from '../Dashboard/DashboardHeader';
import Sidebar from '../Dashboard/Sidebar';

const ScholarshipManager = () => {
  const { isSidebarOpen } = useSidebar();
  const [scholarships, setScholarships] = useState([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNotesModalOpen, setNotesModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [scholarshipsData, applicationsData] = await Promise.all([
        getScholarships(),
        getMyScholarships()
      ]);

      // Filter out scholarships that already have applications
      const availableScholarships = scholarshipsData.scholarships.filter(
        scholarship => !applicationsData.find(
          app => app.scholarshipID === scholarship.scholarshipID
        )
      );

      setScholarships(availableScholarships);
      setMyApplications(applicationsData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (scholarshipID, newStatus) => {
    try {
      setError(null);
      const application = myApplications.find(app => app.scholarshipID === scholarshipID);
      
      if (application) {
        await updateApplicationStatus(application.id, newStatus);
      } else {
        await createScholarshipApplication(scholarshipID, newStatus);
      }
      
      await fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNotes = (application) => {
    setSelectedApplication(application);
    setNoteText(application.notes || '');
    setNotesModalOpen(true);
  };

  const saveNotes = async () => {
    try {
      await updateApplicationNotes(selectedApplication.id, noteText);
      setNotesModalOpen(false);
      await fetchData();
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <LoadingSpinner>Loading scholarships...</LoadingSpinner>;
  }

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

            {myApplications.length > 0 && (
              <>
                <Header>
                  <h1>My Applications</h1>
                </Header>
                <ScholarshipGrid>
                  {myApplications.map((application) => (
                    <ScholarshipCard key={application.scholarshipID}>
                      <ApplicationStatus status={application.status}>
                        {application.status}
                      </ApplicationStatus>
                      <ScholarshipContent>
                        <ScholarshipTitle>{application.name}</ScholarshipTitle>
                        <ScholarshipInfo>
                          <InfoItem>
                            <Label>Amount:</Label> {application.amount || 'Not specified'}
                          </InfoItem>
                          <InfoItem>
                            <Label>Deadline:</Label> {new Date(application.application_deadline).toLocaleDateString()}
                          </InfoItem>
                          <InfoItem>
                            <Label>Type:</Label> {application.type}
                          </InfoItem>
                          <InfoItem>
                            <Label>Location:</Label> {application.location || 'Not specified'}
                          </InfoItem>
                        </ScholarshipInfo>
                        <Description>{application.description}</Description>
                        
                        <ActionSection>
                          <StatusContainer>
                            <Label>Update Status:</Label>
                            <StatusSelect
                              value={application.status}
                              onChange={(e) => handleStatusUpdate(application.scholarshipID, e.target.value)}
                            >
                              {getStatusOptions(application)}
                            </StatusSelect>
                          </StatusContainer>
                          
                          <ButtonGroup>
                            <ViewButton href={application.apply_link} target="_blank" rel="noopener noreferrer">
                              View Application
                            </ViewButton>
                            {application.status === 'IN_PROGRESS' && (
                              <NotesButton onClick={() => handleNotes(application)}>
                                Update Progress
                              </NotesButton>
                            )}
                          </ButtonGroup>
                        </ActionSection>
                      </ScholarshipContent>
                    </ScholarshipCard>
                  ))}
                </ScholarshipGrid>
              </>
            )}

            <Header style={{ marginTop: myApplications.length ? '3rem' : '0' }}>
              <h1>Available Scholarships</h1>
            </Header>
            {scholarships.length > 0 ? (
              <ScholarshipGrid>
                {scholarships.map((scholarship) => (
                  <ScholarshipCard key={scholarship.scholarshipID}>
                    <ScholarshipContent>
                      <ScholarshipTitle>{scholarship.name}</ScholarshipTitle>
                      <ScholarshipInfo>
                        <InfoItem>
                          <Label>Amount:</Label> {scholarship.amount || 'Not specified'}
                        </InfoItem>
                        <InfoItem>
                          <Label>Deadline:</Label> {new Date(scholarship.application_deadline).toLocaleDateString()}
                        </InfoItem>
                        <InfoItem>
                          <Label>Type:</Label> {scholarship.type}
                        </InfoItem>
                        <InfoItem>
                          <Label>Location:</Label> {scholarship.location || 'Not specified'}
                        </InfoItem>
                      </ScholarshipInfo>
                      <Description>{scholarship.description}</Description>
                      
                      <ActionSection>
                        <StatusContainer>
                          <Label>Application Status:</Label>
                          <StatusSelect
                            value="NOT_STARTED"
                            onChange={(e) => handleStatusUpdate(scholarship.scholarshipID, e.target.value)}
                          >
                            {getStatusOptions(scholarship, true)}
                          </StatusSelect>
                        </StatusContainer>
                        
                        <ButtonGroup>
                          <ViewButton href={scholarship.apply_link} target="_blank" rel="noopener noreferrer">
                            Apply Now
                          </ViewButton>
                        </ButtonGroup>
                      </ActionSection>
                    </ScholarshipContent>
                  </ScholarshipCard>
                ))}
              </ScholarshipGrid>
            ) : (
              <EmptyState>
                <p>No available scholarships at the moment.</p>
              </EmptyState>
            )}
          </Container>
        </ContentSection>
      </MainContent>
      {isNotesModalOpen && (
        <NotesModal>
          <ModalContent>
            <ModalHeader>
              <h2>Update Progress</h2>
              <CloseButton onClick={() => setNotesModalOpen(false)}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <Label>Add updates, questions, or issues:</Label>
              <NotesTextarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Example: Need transcript for application, Waiting for recommendation letter, etc."
                rows={5}
              />
            </ModalBody>
            <ModalFooter>
              <SaveButton onClick={saveNotes}>Save Updates</SaveButton>
              <CancelButton onClick={() => setNotesModalOpen(false)}>Cancel</CancelButton>
            </ModalFooter>
          </ModalContent>
        </NotesModal>
      )}
    </DashboardWrapper>
  );
};

const getStatusOptions = (scholarship, isNewApplication = false) => {
  if (isNewApplication) {
    return (
      <>
        <option value="NOT_STARTED">Not Started</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="SUBMITTED">Submitted</option>
      </>
    );
  }

  // For existing applications
  if (scholarship.status === 'SUBMITTED') {
    return (
      <>
        <option value="SUBMITTED">Submitted</option>
        <option value="ACCEPTED">Accepted</option>
        <option value="REJECTED">Rejected</option>
      </>
    );
  }

  return (
    <>
      <option value="IN_PROGRESS">In Progress</option>
      <option value="SUBMITTED">Submitted</option>
    </>
  );
};

// Add this new styled component for the application status badge
const ApplicationStatus = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch (props.status) {
      case 'IN_PROGRESS': return '#fff3e0';
      case 'SUBMITTED': return '#e3f2fd';
      case 'ACCEPTED': return '#e8f5e9';
      case 'REJECTED': return '#ffebee';
      default: return '#e0e0e0';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'ACCEPTED': return '#2e7d32';
      case 'REJECTED': return '#c62828';
      default: return '#333';
    }
  }};
`;

// Update ScholarshipCard to handle the absolute positioning of ApplicationStatus
const ScholarshipCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  padding: 1.5rem;
`;

const ScholarshipContent = styled.div`
  // Remove padding since we removed the image
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  h1 {
    color: #1a2a6c;
    font-size: 2rem;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #666;
`;

const ScholarshipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const ScholarshipTitle = styled.h2`
  color: #1a2a6c;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ScholarshipInfo = styled.div`
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  margin-bottom: 0.5rem;
`;

const Label = styled.span`
  font-weight: 600;
  color: #1a2a6c;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ActionSection = styled.div`
  border-top: 1px solid #eee;
  padding-top: 1rem;
  margin-top: 1rem;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const StatusSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 150px;
  background-color: ${props => {
    switch (props.value) {
      case 'SUBMITTED': return '#e3f2fd';
      case 'ACCEPTED': return '#e8f5e9';
      case 'REJECTED': return '#ffebee';
      case 'IN_PROGRESS': return '#fff3e0';
      default: return 'white';
    }
  }};
  color: ${props => {
    switch (props.value) {
      case 'ACCEPTED': return '#2e7d32';
      case 'REJECTED': return '#c62828';
      default: return '#333';
    }
  }};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const ViewButton = styled.a`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #1a2a6c;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.9rem;
  text-align: center;
  flex: 1;

  &:hover {
    background: #152354;
  }
`;

const NotesButton = styled.button`
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  color: #1a2a6c;
  border: 1px solid #1a2a6c;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  flex: 1;

  &:hover {
    background: #e9ecef;
  }
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
  padding: 0 8px;
  
  &:hover {
    opacity: 0.8;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  background: #f5f5f5;
  border-radius: 8px;
  margin: 1rem 0;
`;

const NotesModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
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

const ModalBody = styled.div`
  padding: 1rem;
`;

const ModalFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const NotesTextarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 0.5rem;
  font-family: inherit;
  resize: vertical;
`;

const SaveButton = styled.button`
  padding: 0.5rem 1rem;
  background: #1a2a6c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #152354;
  }
`;

const CancelButton = styled.button`
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #e9ecef;
  }
`;

export default ScholarshipManager;