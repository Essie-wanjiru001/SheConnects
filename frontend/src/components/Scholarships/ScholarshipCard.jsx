import React from "react";
import styled from "styled-components";
import ApplyButton from "./ApplyButton";

const ScholarshipCard = ({ scholarship }) => {
  return (
    <CardContainer>
      <CardContent>
        <Title>{scholarship.name}</Title>
        <Description>{scholarship.description}</Description>
        <Eligibility>Eligibility: {scholarship.eligibility}</Eligibility>
        <Deadline>Deadline: {new Date(scholarship.application_deadline).toLocaleDateString()}</Deadline>
        <ApplyButton href={scholarship.apply_link} target="_blank" rel="noopener noreferrer">
          Apply Now
        </ApplyButton>
      </CardContent>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  background-color:rgba(255, 246, 233, 0.93);
  border-radius: 12px;
  padding: 20px;
  margin: 15px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h3`
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

const Eligibility = styled.p`
  font: 400 16px 'Inter', sans-serif;
  color: #000;
  line-height: 1.6;
  margin: 0;
`;

const Deadline = styled.p`
  font: 400 16px 'Inter', sans-serif;
  color: #000;
  line-height: 1.6;
  margin: 0;
`;

export default ScholarshipCard;