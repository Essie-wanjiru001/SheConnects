import React from "react";
import styled from "styled-components";

const DueDateComponent = ({ date }) => {
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <DateColumn>
      <DateWrapper>
        <DueLabel>Due</DueLabel>
        <DueDate>{formatDate(date)}</DueDate>
      </DateWrapper>
    </DateColumn>
  );
};

const DateColumn = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 22%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Inter, sans-serif;
  @media (max-width: 991px) {
    margin-top: 39px;
  }
`;

const DueLabel = styled.div`
  color: #000101;
  font-size: 32px;
  font-weight: 700;
  align-self: center;
`;

const DueDate = styled.div`
  color: #000000;
  font-size: 24px;
  font-weight: 400;
  margin-top: 54px;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

export default DueDateComponent;