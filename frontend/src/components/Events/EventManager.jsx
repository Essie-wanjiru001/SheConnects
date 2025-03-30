import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaRegStar, FaStar } from 'react-icons/fa';
import { getEvents } from '../../services/eventService';
import Sidebar from '../Dashboard/Sidebar';
import DashboardHeader from '../Dashboard/DashboardHeader';
import { useSidebar } from '../../contexts/SidebarContext';
import { toast } from 'react-toastify';

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isSidebarOpen } = useSidebar();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.events);
    } catch (error) {
      setError('Failed to load events');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (eventId, status) => {
    try {
      // Add API call to update attendance status
      await updateEventAttendance(eventId, status);
      await fetchEvents();
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  const handleFeedbackSubmit = async (eventId, feedback) => {
    try {
      // Add API call to submit feedback
      await submitEventFeedback(eventId, feedback);
      await fetchEvents();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <DashboardWrapper>
      <DashboardHeader />
      <MainContent>
        <Sidebar />
        <ContentSection $isSidebarOpen={isSidebarOpen}>
          <PageTitle>My Events</PageTitle>
          
          {loading && <LoadingSpinner>Loading events...</LoadingSpinner>}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <EventList>
            {events.map(event => (
              <EventCard key={event.id}>
                <EventHeader>
                  <DateBadge>
                    <Month>{new Date(event.event_date).toLocaleString('default', { month: 'short' })}</Month>
                    <Day>{new Date(event.event_date).getDate()}</Day>
                  </DateBadge>
                  <EventInfo>
                    <EventTitle>{event.title}</EventTitle>
                    <EventType>{event.event_type}</EventType>
                  </EventInfo>
                </EventHeader>

                <EventDetails>
                  <DetailRow>
                    <FaCalendarAlt />
                    <span>{new Date(event.event_date).toLocaleDateString()}</span>
                  </DetailRow>
                  <DetailRow>
                    <FaClock />
                    <span>{event.start_time} - {event.end_time}</span>
                  </DetailRow>
                  <DetailRow>
                    <FaMapMarkerAlt />
                    <span>{event.location}</span>
                  </DetailRow>
                </EventDetails>

                <StatusSection>
                  <StatusLabel>Attendance Status:</StatusLabel>
                  <StatusButtons>
                    <StatusButton 
                      $active={event.status === 'INTERESTED'}
                      onClick={() => handleStatusChange(event.id, 'INTERESTED')}
                    >
                      Interested
                    </StatusButton>
                    <StatusButton 
                      $active={event.status === 'GOING'}
                      onClick={() => handleStatusChange(event.id, 'GOING')}
                    >
                      Going
                    </StatusButton>
                    <StatusButton 
                      $active={event.status === 'NOT_GOING'}
                      onClick={() => handleStatusChange(event.id, 'NOT_GOING')}
                    >
                      Not Going
                    </StatusButton>
                  </StatusButtons>
                </StatusSection>

                {event.status === 'ATTENDED' && (
                  <FeedbackSection>
                    <FeedbackLabel>Event Feedback:</FeedbackLabel>
                    <RatingContainer>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon 
                          key={star}
                          onClick={() => handleFeedbackSubmit(event.id, { rating: star })}
                        >
                          {event.userRating >= star ? <FaStar /> : <FaRegStar />}
                        </StarIcon>
                      ))}
                    </RatingContainer>
                    <FeedbackTextArea 
                      placeholder="Share your experience..."
                      value={event.userFeedback || ''}
                      onChange={(e) => handleFeedbackSubmit(event.id, { feedback: e.target.value })}
                    />
                  </FeedbackSection>
                )}
              </EventCard>
            ))}
          </EventList>
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

const PageTitle = styled.h1`
  color: white;
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const LoadingSpinner = styled.div`
  color: white;
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
`;

const EmptyState = styled.div`
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 2rem;
  font-style: italic;
`;

const Container = styled.div`
  padding: 2rem;
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  color: white;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const ErrorMessage = styled.div`
  background: rgba(255, 68, 68, 0.1);
  color: #ff4444;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ff4444;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 0.5rem;
`;

const EventCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const EventHeader = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const DateBadge = styled.div`
  background: #154C79;
  padding: 0.5rem;
  border-radius: 8px;
  text-align: center;
  min-width: 60px;
`;

const Month = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.8rem;
  text-transform: uppercase;
`;

const Day = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const EventInfo = styled.div`
  flex: 1;
`;

const EventTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const EventType = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
`;

const EventDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;

  svg {
    color: #154C79;
  }
`;

const StatusSection = styled.div`
  margin-bottom: 1.5rem;
`;

const StatusLabel = styled.div`
  color: white;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
`;

const StatusButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const StatusButton = styled.button`
  background: ${props => props.$active ? '#154C79' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  border: 1px solid ${props => props.$active ? '#154C79' : 'rgba(255, 255, 255, 0.2)'};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$active ? '#1a5c8f' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const FeedbackSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FeedbackLabel = styled.div`
  color: white;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const StarIcon = styled.button`
  background: none;
  border: none;
  color: #FFD700;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const FeedbackTextArea = styled.textarea`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1rem;
  color: white;
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #154C79;
  }
`;

export default EventManager;