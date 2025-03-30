import React from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTag } from 'react-icons/fa';
import { CardBase } from '../../styles/CardStyles';

const EventCard = ({ event }) => {
  const formatDate = (date) => {
    const eventDate = new Date(date);
    return eventDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    const eventTime = new Date(`2000-01-01T${time}`);
    return eventTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <DateBadge>
        <Month>{new Date(event.event_date).toLocaleString('default', { month: 'short' })}</Month>
        <Day>{new Date(event.event_date).getDate()}</Day>
      </DateBadge>

      <Content>
        <EventTitle>{event.title}</EventTitle>
        <Description>{event.description}</Description>

        <Details>
          <DetailRow>
            <FaCalendarAlt />
            <span>{formatDate(event.event_date)}</span>
          </DetailRow>
          <DetailRow>
            <FaClock />
            <span>{formatTime(event.start_time)} - {formatTime(event.end_time)}</span>
          </DetailRow>
          <DetailRow>
            <FaMapMarkerAlt />
            <span>{event.location}</span>
          </DetailRow>
          <DetailRow>
            <FaTag />
            <span>{event.event_type}</span>
          </DetailRow>
        </Details>

        <Tags>
          {event.isVirtual && <Tag isVirtual>Virtual</Tag>}
          {event.isFree ? <Tag isFree>Free</Tag> : <Tag>Paid</Tag>}
        </Tags>
      </Content>

      <Footer>
        <RegisterButton 
          href={event.registration_link} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Register Now
        </RegisterButton>
        {event.seats_available && (
          <SeatsAvailable>
            {event.seats_available} spots left
          </SeatsAvailable>
        )}
      </Footer>
    </Card>
  );
};

const Card = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 20px;
  color: white;
  transition: transform 0.2s ease, background-color 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const DateBadge = styled.div`
  background: #154C79;
  color: white;
  padding: 15px;
  text-align: center;
  min-width: 80px;
  display: flex;
  flex-direction: column;
`;

const Month = styled.div`
  font-size: 14px;
  text-transform: uppercase;
`;

const Day = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

const EventTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 15px;
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin-bottom: 15px;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.8);
  margin: 8px 0;
  
  svg {
    color: #154C79;
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

const Tag = styled.span`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  background: ${props => {
    if (props.isVirtual) return '#e3f2fd';
    if (props.isFree) return '#e8f5e9';
    return '#f5f5f5';
  }};
  color: ${props => {
    if (props.isVirtual) return '#1976d2';
    if (props.isFree) return '#2e7d32';
    return '#666';
  }};
`;

const Footer = styled.div`
  padding: 15px 20px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RegisterButton = styled.a`
  display: inline-block;
  padding: 8px 24px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const SeatsAvailable = styled.span`
  color: #666;
  font-size: 14px;
`;

export default EventCard;