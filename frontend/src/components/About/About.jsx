import React from "react";
import styled from "styled-components";
import Logo from "../Home/Logo";
import NavigationMenu from "../Home/NavigationMenu";
import Footer from "../Home/Footer";
import { CommonWrapper, CommonHeader, ContentContainer } from '../../styles/CommonStyles';
import { FaGraduationCap, FaHandshake, FaUsers, FaLightbulb } from 'react-icons/fa';

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
            SheConnects is more than just a platform - it's a movement dedicated to 
            empowering women across Kenya. We bridge the gap between talented women 
            and life-changing opportunities, creating pathways for success in education 
            and careers.
          </Description>

          <VisionMissionGrid>
            <VisionCard>
              <CardTitle>
                <FaLightbulb />
                Our Vision
              </CardTitle>
              <CardContent>
                A Kenya where every woman has equal access to educational and career 
                opportunities, enabling them to reach their full potential and contribute 
                to society's development.
              </CardContent>
            </VisionCard>

            <MissionCard>
              <CardTitle>
                <FaUsers />
                Our Mission
              </CardTitle>
              <CardContent>
                To create a comprehensive support ecosystem that connects women with 
                scholarships, internships, mentorship, and networking opportunities, 
                fostering their personal and professional growth.
              </CardContent>
            </MissionCard>
          </VisionMissionGrid>

          <ApproachSection>
            <SectionTitle>Our Approach</SectionTitle>
            <ApproachGrid>
              <ApproachCard>
                <IconCircle>
                  <FaGraduationCap />
                </IconCircle>
                <ApproachTitle>Educational Access</ApproachTitle>
                <ApproachText>
                  Curating and providing access to scholarships and educational 
                  opportunities specifically designed for women.
                </ApproachText>
              </ApproachCard>

              <ApproachCard>
                <IconCircle>
                  <FaHandshake />
                </IconCircle>
                <ApproachTitle>Career Development</ApproachTitle>
                <ApproachText>
                  Connecting women with internships, mentorship programs, and 
                  professional development resources.
                </ApproachText>
              </ApproachCard>

              <ApproachCard>
                <IconCircle>
                  <FaUsers />
                </IconCircle>
                <ApproachTitle>Community Building</ApproachTitle>
                <ApproachText>
                  Creating a supportive network where women can share experiences, 
                  learn from each other, and grow together.
                </ApproachText>
              </ApproachCard>
            </ApproachGrid>
          </ApproachSection>
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
  gap: 3rem;
`;

const AboutTitle = styled.h1`
  color: #ffffff;
  font-size: 3.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Description = styled.p`
  color: #ffffff;
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.8;
  margin: 0 auto;
  max-width: 800px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const VisionMissionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 2rem 0;
`;

const Card = styled.div`
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

const VisionCard = styled(Card)``;
const MissionCard = styled(Card)``;

const CardTitle = styled.h2`
  color: #ffffff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #FFD700;
  }
`;

const CardContent = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
`;

const ApproachSection = styled.section`
  width: 100%;
  max-width: 1200px;
`;

const SectionTitle = styled.h2`
  color: #ffffff;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const ApproachGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
`;

const ApproachCard = styled(Card)`
  text-align: center;
`;

const IconCircle = styled.div`
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;

  svg {
    color: #FFD700;
    font-size: 1.8rem;
  }
`;

const ApproachTitle = styled.h3`
  color: #ffffff;
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const ApproachText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  line-height: 1.6;
`;

export default About;