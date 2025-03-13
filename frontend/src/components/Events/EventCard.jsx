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
        <Title>{event.title}</Title>
        <Description>{event.description}</Description>

        <Details>
          <DetailItem>
            <FaCalendarAlt />
            <span>{formatDate(event.event_date)}</span>
          </DetailItem>
          <DetailItem>
            <FaClock />
            <span>{formatTime(event.start_time)} - {formatTime(event.end_time)}</span>
          </DetailItem>
          <DetailItem>
            <FaMapMarkerAlt />
            <span>{event.location}</span>
          </DetailItem>
          <DetailItem>
            <FaTag />
            <span>{event.event_type}</span>
          </DetailItem>
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

const Card = styled(CardBase)`
  // Additional event-specific styling
`;

const DateBadge = styled.div`
  background: #154C79;
  color: white;
  padding: 15px;
  text-align: center;
  min-width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const Title = styled.h3`
  color: #154C79;
  margin: 0 0 10px;
  font-size: 18px;
`;

const Description = styled.p`
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 15px;
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  margin-bottom: 15px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  font-size: 14px;

  svg {
    margin-right: 8px;
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
  background: #154C79;
  color: white;
  padding: 8px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: #0d3251;
  }
`;

const SeatsAvailable = styled.span`
  color: #666;
  font-size: 14px;
`;

export default EventCard;