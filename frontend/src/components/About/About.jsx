import React from "react";
import styled from "styled-components";
import Logo from "../Home/Logo";
import NavigationMenu from "../Home/NavigationMenu";
import Footer from "../Home/Footer";
import { CommonWrapper, CommonHeader, ContentContainer } from '../../styles/CommonStyles';

const About = () => {
  return (
    <AboutWrapper>
      <CommonHeader>
        <Logo />
        <NavigationMenu />
      </CommonHeader>
      <ContentContainer>
        <MainSection>
          <AboutTitle>About SheConnects</AboutTitle>
          <Description>
            SheConnects is a digital platform dedicated to empowering Kenyan 
            women by connecting them with scholarships, career opportunities, 
            and mentorship. We believe that every woman deserves the chance 
            to achieve her full potential, regardless of financial or 
            sociocultural barriers. We're building a community where women 
            can access the resources they need to succeed in education and 
            their careers, contributing to a more equitable and prosperous Kenya.
          </Description>
        </MainSection>
      </ContentContainer>
      <Footer />
    </AboutWrapper>
  );
};

const AboutWrapper = styled(CommonWrapper)``;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 40px 20px;
  margin-top: 60px;
`;

const AboutTitle = styled.h1`
  color: #ffffff;
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 40px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Description = styled.p`
  color: #ffffff;
  text-align: center;
  font: 400 24px 'Jomolhari', sans-serif;
  line-height: 1.8;
  margin: 0;
  max-width: 1000px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 20px;
  }
`;

export default About;