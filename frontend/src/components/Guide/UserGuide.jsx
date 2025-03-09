import React from "react";
import styled from "styled-components";
import Logo from "../Home/Logo";
import NavigationMenu from "../Home/NavigationMenu";
import Footer from "../Home/Footer";
import { CommonWrapper, CommonHeader } from '../../styles/CommonStyles';

const UserGuide = () => {
  return (
    <GuideWrapper>
      <CommonHeader>
        <Logo />
        <NavigationMenu />
      </CommonHeader>
      <MainSection>
        <GuideTitle>How to Use SheConnects</GuideTitle>
        <GuideSection>
          <SubTitle>Finding Scholarships</SubTitle>
          <Description>
            Browse through our curated list of scholarships specifically 
            designed for Kenyan women. Filter by education level, field 
            of study, and application deadlines.
          </Description>
        </GuideSection>

        <GuideSection>
          <SubTitle>Career Opportunities</SubTitle>
          <Description>
            Explore internships and job opportunities from our partner 
            organizations. Create a profile to receive notifications 
            about positions matching your skills and interests.
          </Description>
        </GuideSection>

        <GuideSection>
          <SubTitle>Mentorship Connection</SubTitle>
          <Description>
            Connect with experienced professionals in your field of 
            interest. Our mentorship program pairs you with mentors 
            who can guide your educational and career journey.
          </Description>
        </GuideSection>
      </MainSection>
      <Footer />
    </GuideWrapper>
  );
};

const GuideWrapper = styled(CommonWrapper)``;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 40px 20px;
  margin-top: 60px;
`;

const GuideTitle = styled.h1`
  color: #ffffff;
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 40px;
`;

const GuideSection = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
`;

const SubTitle = styled.h2`
  color: #000;
  font: 500 24px 'Inter', sans-serif;
  margin-bottom: 15px;
`;

const Description = styled.p`
  color: #000;
  text-align: left;
  font: 400 18px 'Jomolhari', sans-serif;
  line-height: 1.6;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 10px;
  }
`;

export default UserGuide;