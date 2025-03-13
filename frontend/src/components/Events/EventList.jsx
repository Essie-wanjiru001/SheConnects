import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EventCard from './EventCard';
import { getEvents } from '../../services/eventService';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await getEvents();
        console.log('Events data:', response);
        
        if (response && response.events) {
          setEvents(response.events);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <Loading>Loading events...</Loading>;
  if (error) return <Error>{error}</Error>;

  return (
    <ListContainer>
      {!events || events.length === 0 ? (
        <NoResults>No events available</NoResults>
      ) : (
        events.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
          />
        ))
      )}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
`;

const Loading = styled.div`
  text-align: center;
  padding: 20px;
  color: #ffffff;
`;

const Error = styled.div`
  text-align: center;
  padding: 20px;
  color: #ff4444;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 20px;
  color: #ffffff;
`;

export default EventList;