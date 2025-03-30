import React from "react";
import styled from "styled-components";
import { FaGraduationCap, FaBriefcase, FaUsers, FaBook, FaLightbulb } from 'react-icons/fa';
import Logo from "../Home/Logo";
import NavigationMenu from "../Home/NavigationMenu";
import Footer from "../Home/Footer";
import { CommonWrapper, CommonHeader } from '../../styles/CommonStyles';

const ResourcesAndSupport = () => {
  return (
    <GuideWrapper>
      <CommonHeader>
        <Logo />
        <NavigationMenu />
      </CommonHeader>
      <MainSection>
        <Title>Resources & Support</Title>
        <Subtitle>Empowering tools and resources to help you succeed</Subtitle>

        <ResourceGrid>
          <ResourceCard>
            <IconWrapper>
              <FaGraduationCap />
            </IconWrapper>
            <ResourceTitle>Application Tips</ResourceTitle>
            <ResourceContent>
              <ul>
                <li>How to write a winning scholarship essay</li>
                <li>Common application mistakes to avoid</li>
                <li>Documents you'll typically need</li>
                <li>Tips for recommendation letters</li>
              </ul>
            </ResourceContent>
          </ResourceCard>

          <ResourceCard>
            <IconWrapper>
              <FaBriefcase />
            </IconWrapper>
            <ResourceTitle>Career Development</ResourceTitle>
            <ResourceContent>
              <ul>
                <li>Resume writing guidelines</li>
                <li>Interview preparation tips</li>
                <li>Professional networking advice</li>
                <li>Personal branding strategies</li>
              </ul>
            </ResourceContent>
          </ResourceCard>

          <ResourceCard>
            <IconWrapper>
              <FaUsers />
            </IconWrapper>
            <ResourceTitle>Mentorship Program</ResourceTitle>
            <ResourceContent>
              <ul>
                <li>How to find a mentor</li>
                <li>Making the most of mentorship</li>
                <li>Peer support opportunities</li>
                <li>Success stories</li>
              </ul>
            </ResourceContent>
          </ResourceCard>

          <ResourceCard>
            <IconWrapper>
              <FaBook />
            </IconWrapper>
            <ResourceTitle>Educational Resources</ResourceTitle>
            <ResourceContent>
              <ul>
                <li>Free online courses</li>
                <li>Study materials and guides</li>
                <li>Skills development workshops</li>
                <li>Educational podcasts & blogs</li>
              </ul>
            </ResourceContent>
          </ResourceCard>
        </ResourceGrid>
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

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin-bottom: 3rem;
  text-align: center;
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const ResourceCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  svg {
    color: #154C79;
    font-size: 1.5rem;
  }
`;

const ResourceTitle = styled.h3`
  color: white;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const ResourceContent = styled.div`
  color: rgba(255, 255, 255, 0.9);
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 0.8rem;
      position: relative;
      padding-left: 1.2rem;
      
      &:before {
        content: "•";
        position: absolute;
        left: 0;
        color: #154C79;
      }
    }
  }
`;

export default ResourcesAndSupport;