import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from "./Logo";
import NavigationMenu from "./NavigationMenu";
import Footer from "./Footer";
import SearchBar from '../Search/SearchBar';
import FilterSection from '../Search/FilterSection';
import { CommonWrapper, CommonHeader, ContentContainer } from '../../styles/CommonStyles';
import ScholarshipList from '../Scholarships/ScholarshipList';
import InternshipList from '../Internships/InternshipList';
import EventList from '../Events/EventList';
import HeroSection from './HeroSection';

const HomePage = () => {
  const [searchResults, setSearchResults] = useState(null);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <CommonWrapper>
      <CommonHeader>
        <Logo />
        <NavigationMenu />
      </CommonHeader>

      <HeroSection onSearchResults={handleSearchResults} />
      
      {searchResults ? (
        <ContentContainer>
          <SearchResults results={searchResults} />
        </ContentContainer>
      ) : (
        <ContentContainer>
          <CategorySection>
            <SectionHeader>
              <h2>Featured Scholarships</h2>
              <ViewAllButton to="/scholarships">View All</ViewAllButton>
            </SectionHeader>
            <ScholarshipList />
          </CategorySection>

          <CategorySection>
            <SectionHeader>
              <h2>Latest Internships</h2>
              <ViewAllButton to="/internships">View All</ViewAllButton>
            </SectionHeader>
            <InternshipList />
          </CategorySection>

          <CategorySection>
            <SectionHeader>
              <h2>Upcoming Events</h2>
              <ViewAllButton to="/events">View All</ViewAllButton>
            </SectionHeader>
            <EventList />
          </CategorySection>
        </ContentContainer>
      )}
      
      <Footer />
    </CommonWrapper>
  );
};

const MainContent = styled(ContentContainer)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem;
`;

const CategorySection = styled.section`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ViewAllButton = styled(Link)`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const SectionTitle = styled.h2`
  color: #ffffff;
  font-size: 1.8rem;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const RowContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 1rem 0;

  /* Hide scrollbar but keep functionality */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SearchResults = styled.section`
  padding: 20px;
  
  h2 {
    margin-bottom: 20px;
    color: #1a2a6c;
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ResultCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const TypeBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${props => {
    switch(props.type) {
      case 'scholarship': return '#1a2a6c';
      case 'internship': return '#b21f1f';
      case 'event': return '#4a1042';
      default: return '#666';
    }
  }};
  color: white;
`;

export default HomePage;