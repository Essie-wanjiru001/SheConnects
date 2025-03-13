import React from "react";
import styled from "styled-components";
import { CardBase } from '../../styles/CardStyles';

const ScholarshipCard = ({ scholarship }) => {
  return (
    <Card>
      <ImageContainer>
        <ScholarshipImage 
          src={scholarship.image || '/placeholder-scholarship.jpg'} 
          alt={scholarship.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/placeholder-scholarship.jpg';
          }}
        />
      </ImageContainer>
      <CardContent>
        <Title>{scholarship.name}</Title>
        <Description>{scholarship.description}</Description>
        <InfoSection>
          <DeadlineInfo>
            <DeadlineLabel>Deadline</DeadlineLabel>
            <DeadlineDate>
              {new Date(scholarship.application_deadline).toLocaleDateString()}
            </DeadlineDate>
          </DeadlineInfo>
          <ApplyButton 
            href={scholarship.apply_link} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Apply Now
          </ApplyButton>
        </InfoSection>
      </CardContent>
    </Card>
  );
};

const Card = styled(CardBase)`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 180px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
  }
`;

const ScholarshipImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h3`
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const InfoSection = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const DeadlineInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DeadlineLabel = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const DeadlineDate = styled.span`
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ApplyButton = styled.a`
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  padding: 0.5rem 1.25rem;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }
`;

export default ScholarshipCard;