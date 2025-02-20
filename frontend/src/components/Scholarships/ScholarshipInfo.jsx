import React from "react";
import styled from "styled-components";
import DueDateComponent from './DueDate' ;
import ApplyButton from './ApplyButton';

const ScholarshipShort = ({ scholarship }) => {
  return (
    <ScholarshipCard>
      <ImageColumn>
        {scholarship.image && (
          <ScholarshipImage src={scholarship.image} alt={scholarship.name} />
        )}
      </ImageColumn>
      <InfoColumn>
        <ScholarshipName>{scholarship.name}</ScholarshipName>
        <Description>{scholarship.description}</Description>
        <DeadlineInfo>
          Deadline: {new Date(scholarship.application_deadline).toLocaleDateString()}
        </DeadlineInfo>
        <ApplyButton applyLink={scholarship.apply_link} />
      </InfoColumn>
    </ScholarshipCard>
  );
};

const ScholarshipCard = styled.div`
  display: flex;
  padding: 20px;
  background-color: #fff6e9;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

const ImageColumn = styled.div`
  width: 200px;
  margin-right: 20px;

  @media (max-width: 991px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const ScholarshipImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
`;

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 15px;
`;

const ScholarshipName = styled.h3`
  color: #000000;
  font: 600 28px Inter, sans-serif;
  margin: 0;
`;

const Description = styled.p`
  color: #000000;
  font: 400 16px Inter, sans-serif;
  line-height: 1.5;
  margin: 0;
`;

const DeadlineInfo = styled.p`
  color: #0d9276;
  font: 500 14px Inter, sans-serif;
  margin: 0;
`;

export default ScholarshipShort;