import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaSearch, FaGraduationCap, FaHandsHelping } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <MainTitle>
          Your Gateway to
          <GradientSpan> Endless Possibilities</GradientSpan>
        </MainTitle>
        <Subtitle>
          Discover opportunities, find mentorship, and connect with a community that supports your journey. 
          From scholarships to career guidance, we're here to help you thrive in every aspect of life.
        </Subtitle>
        <FeatureGrid>
          <FeatureItem>
            <FaSearch color="#154C79" size={24} />
            <FeatureText>Find Opportunities</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FaGraduationCap color="#154C79" size={24} />
            <FeatureText>Get Guidance</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <FaHandsHelping color="#154C79" size={24} />
            <FeatureText>Connect & Grow</FeatureText>
          </FeatureItem>
        </FeatureGrid>
        <CallToAction>
          <CTAButton to="/register">
            Start Your Journey <FaArrowRight style={{ marginLeft: '8px' }} />
          </CTAButton>
        </CallToAction>
      </HeroContent>
      <WaveShape />
    </HeroContainer>
  );
};

const HeroContainer = styled.section`
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f);
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  text-align: center;
  z-index: 1;
`;

const MainTitle = styled.h1`
  font-size: 3.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const GradientSpan = styled.span`
  display: block;
  background: linear-gradient(90deg, #FFD700, #FFA500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const FeatureGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  flex-wrap: wrap;
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  min-width: 200px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const FeatureText = styled.span`
  color: white;
  font-size: 1.1rem;
  font-weight: 500;
`;

const CallToAction = styled.div`
  margin-top: 3rem;
`;

const CTAButton = styled(Link)`
  background: #154C79;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 30px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(21, 76, 121, 0.4);
    color: white;
  }
`;

const WaveShape = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: white;
  clip-path: polygon(
    0% 100%,
    100% 100%,
    100% 0%,
    75% 50%,
    50% 0%,
    25% 50%,
    0% 0%
  );
  opacity: 0.1;
`;

export default HeroSection;