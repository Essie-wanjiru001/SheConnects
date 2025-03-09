import React from "react";
import styled from "styled-components";

const ApplyButton = ({ applyLink }) => {
  const handleClick = () => {
    window.open(applyLink, '_blank', 'noopener noreferrer');
  };

  return (
    <ButtonColumn>
      <ButtonWrapper>
        <ApplyNowLabel>Apply Now</ApplyNowLabel>
        <StyledButton onClick={handleClick}>
          Apply
        </StyledButton>
      </ButtonWrapper>
    </ButtonColumn>
  );
};

const ButtonColumn = styled.div`
  display: flex;
  flex-direction: column;
  line-height: normal;
  width: 24%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font: 32px Inter, sans-serif;
  @media (max-width: 991px) {
    margin-top: 38px;
  }
`;

const ApplyNowLabel = styled.div`
  color: #000101;
  font-weight: 700;
`;

const StyledButton = styled.button`
  background-color: #40a2e3;
  align-self: start;
  margin-top: 54px;
  color: #010101;
  font-weight: 400;
  white-space: nowrap;
  padding: 12px 34px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3691d2;
  }

  @media (max-width: 991px) {
    margin-top: 40px;
    white-space: initial;
    padding: 10px 20px;
  }
`;

export default ApplyButton;