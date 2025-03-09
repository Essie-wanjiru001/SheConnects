import React from "react";
import styled from "styled-components";
import DueDate from "./DueDate";
import ApplyButton from "./ApplyButton";

const ScholarshipCard = ({ scholarship }) => {
  if (!scholarship) return null;

  return (
    <CardWrapper>
      <ContentLayout>
        <ImageSection>
          {scholarship.image && (
            <ScholarshipImage 
              src={`http://localhost:8000${scholarship.image}`} 
              alt={scholarship.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-image.png';
              }}
            />
          )}
        </ImageSection>
        
        <InfoSection>
          <ScholarshipTitle>{scholarship.name}</ScholarshipTitle>
          <Description>{scholarship.description}</Description>
        </InfoSection>

        <ActionSection>
          <DueDate date={scholarship.application_deadline} />
          <ApplyButton applyLink={scholarship.apply_link} />
        </ActionSection>
      </ContentLayout>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  background-color:rgba(255, 246, 233, 0.93);
  border-radius: 12px;
  padding: 20px;
  margin: 15px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr auto;
  gap: 20px;
  align-items: center;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const ImageSection = styled.div`
  width: 100%;
  height: 150px;
`;

const ScholarshipImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ScholarshipTitle = styled.h3`
  font: 600 24px 'Inter', sans-serif;
  color: #000;
  margin: 0;
`;

const Description = styled.p`
  font: 400 16px 'Inter', sans-serif;
  color: #000;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ActionSection = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 991px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export default ScholarshipCard;