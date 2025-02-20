import React from "react";
import styled from "styled-components";
import ScholarshipInfo from "./ScholarshipInfo";
import DueDate from "./DueDate";
import ApplyButton from "./ApplyButton";

const ScholarshipCard = ({ scholarship }) => {
  if (!scholarship) return null;

  return (
    <CardWrapper>
      <CardContent>
        <CardLayout>
          <ScholarshipColumn>
            <ScholarshipTitle>Scholarships</ScholarshipTitle>
            {scholarship.image && (
              <ScholarshipImage>
                <img 
                  src={scholarship.image} 
                  alt={scholarship.name} 
                  loading="lazy"
                />
              </ScholarshipImage>
            )}
          </ScholarshipColumn>
          <ScholarshipInfo 
            name={scholarship.name}
            description={scholarship.description} 
          />
          <DueDate date={scholarship.application_deadline} />
          <ApplyButton applyLink={scholarship.apply_link} />
        </CardLayout>
      </CardContent>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  max-width: 929px;
  flex-direction: column;
  margin: 20px 0;
  border-radius: 12px;
  overflow: hidden;
`;

const CardContent = styled.div`
  background-color: #fff;
  width: 100%;
  padding: 15px 50px 69px;
  
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 20px;
  }
`;

const CardLayout = styled.div`
  gap: 20px;
  display: flex;
  
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 20px;
  }
`;

const ScholarshipColumn = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 32%;
  margin-left: 0px;
  
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const ScholarshipTitle = styled.h2`
  color: #000101;
  font: 700 32px Inter, sans-serif;
  align-self: start;
  margin: 0;
`;

const ScholarshipImage = styled.div`
  margin-top: 16px;
  width: 223px;
  height: 93px;
  overflow: hidden;
  border-radius: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default ScholarshipCard;