import React from "react";
import styled from "styled-components";
import Logo from "../Home/Logo";
import NavigationMenu from "../Home/NavigationMenu";
import Footer from "../Home/Footer";
import { CommonWrapper, CommonHeader, ContentContainer } from '../../styles/CommonStyles';

const UserGuide = () => {
  return (
    <GuideWrapper>
      <CommonHeader>
        <Logo />
        <NavigationMenu />
      </CommonHeader>
      <ContentContainer>
        <MainSection>
          <GuideContent>
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
          </GuideContent>
        </MainSection>
      </ContentContainer>
      <Footer />
    </GuideWrapper>
  );
};

const GuideWrapper = styled(CommonWrapper)``;

const MainSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin: 20px 0;
`;

const GuideContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: #fff6e9;
  border-radius: 50px;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  min-height: 400px;
`;

const GuideTitle = styled.h1`
  color: #000;
  text-align: center;
  font: 600 36px 'Inter', sans-serif;
  margin-bottom: 30px;
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