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
          <AboutContent>
            <Description>
              SheConnects is a digital platform dedicated to empowering Kenyan 
              women by connecting them with scholarships, career opportunities, 
              and mentorship. We believe that every woman deserves the chance 
              to achieve her full potential, regardless of financial or 
              sociocultural barriers. We're building a community where women 
              can access the resources they need to succeed in education and 
              their careers, contributing to a more equitable and prosperous Kenya.
            </Description>
          </AboutContent>
        </MainSection>
      </ContentContainer>
      <Footer />
    </AboutWrapper>
  );
};

const AboutWrapper = styled(CommonWrapper)``;

const MainSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin: 20px 0;
`;

const AboutContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff6e9;
  border-radius: 50px;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  min-height: 400px;
`;

const Description = styled.p`
  color: #000;
  text-align: center;
  font: 400 24px 'Jomolhari', sans-serif;
  line-height: 1.6;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 20px;
  }
`;

export default About;