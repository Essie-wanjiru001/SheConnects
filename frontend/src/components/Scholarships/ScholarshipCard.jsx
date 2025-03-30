import React from "react";
import styled from "styled-components";
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';

const ScholarshipCard = ({ scholarship }) => {
  return (
    <Card>
      <CardContent>
        <IconContainer>
          <FaGraduationCap size={24} />
        </IconContainer>
        <ContentSection>
          <Title>{scholarship.name}</Title>
          <Description>{scholarship.description}</Description>
          <DetailsList>
            <DetailItem>
              <FaCalendarAlt />
              <span>Deadline: {new Date(scholarship.application_deadline).toLocaleDateString()}</span>
            </DetailItem>
            <DetailItem>
              <FaMapMarkerAlt />
              <span>{scholarship.location || 'Location not specified'}</span>
            </DetailItem>
            <DetailItem>
              <FaDollarSign />
              <span>{scholarship.amount || 'Amount varies'}</span>
            </DetailItem>
          </DetailsList>
          <ApplyButton 
            href={scholarship.apply_link} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Apply Now
          </ApplyButton>
        </ContentSection>
      </CardContent>
    </Card>
  );
};

const Title = styled.h3`
  color: #154C79;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, background-color 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
`;

const IconContainer = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #154C79;
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
`;

const DetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;

  svg {
    color: #154C79;
  }
`;

const ApplyButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: fit-content;
  margin-top: auto;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

export default ScholarshipCard;