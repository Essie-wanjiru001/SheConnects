import React from 'react';
import styled from 'styled-components';
import { FaSearch, FaGraduationCap, FaHandsHelping } from 'react-icons/fa';
import SearchBar from '../Search/SearchBar';
import FilterSection from '../Search/FilterSection';

const HeroSection = ({ onSearchResults }) => {
  return (
    <HeroContainer>
      <HeroContent>
        <MainTitle>
          Your Gateway to
          <GradientSpan> Endless Possibilities</GradientSpan>
        </MainTitle>
        <Subtitle>
          Empowering women to reach new heights through access to opportunities, 
          mentorship, and a supportive community. Join thousands of women who are 
          breaking barriers and achieving their dreams.
        </Subtitle>
        
        <SearchBox>
          <SearchBar onSearchResults={onSearchResults} />
        </SearchBox>
        <FilterBox>
          <FilterSection />
        </FilterBox>

        <StatsGrid>
          <StatItem>
            <FaGraduationCap size={24} />
            <StatNumber>500+</StatNumber>
            <StatLabel>Scholarships</StatLabel>
          </StatItem>
          <StatItem>
            <FaSearch size={24} />
            <StatNumber>300+</StatNumber>
            <StatLabel>Internships</StatLabel>
          </StatItem>
          <StatItem>
            <FaHandsHelping size={24} />
            <StatNumber>100+</StatNumber>
            <StatLabel>Events</StatLabel>
          </StatItem>
        </StatsGrid>
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

const SearchBox = styled.div`
  max-width: 900px;
  width: 90%;
  margin: 0 auto 1rem;
`;

const FilterBox = styled.div`
  max-width: 900px;
  width: 90%;
  margin: 0 auto 2rem;
`;

const StatsGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 3rem;
  flex-wrap: wrap;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: white;

  svg {
    color: #154C79;
  }
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #FFD700;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  opacity: 0.9;
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