import React from 'react';
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

const HomePage = () => {
  return (
    <CommonWrapper>
      <CommonHeader>
        <Logo />
        <NavigationMenu />
      </CommonHeader>
      <SearchSection>
        <SearchBar />
        <FilterSection />
      </SearchSection>
      <MainContent>
        <CategorySection>
          <SectionHeader>
            <SectionTitle>Scholarships</SectionTitle>
            <ViewAllButton to="/scholarships">View All</ViewAllButton>
          </SectionHeader>
          <RowContainer>
            <ScholarshipList isHomePage={true} />
          </RowContainer>
        </CategorySection>

        <CategorySection>
          <SectionHeader>
            <SectionTitle>Internships</SectionTitle>
            <ViewAllButton to="/internships">View All</ViewAllButton>
          </SectionHeader>
          <RowContainer>
            <InternshipList isHomePage={true} />
          </RowContainer>
        </CategorySection>

        <CategorySection>
          <SectionHeader>
            <SectionTitle>Events</SectionTitle>
            <ViewAllButton to="/events">View All</ViewAllButton>
          </SectionHeader>
          <RowContainer>
            <EventList isHomePage={true} />
          </RowContainer>
        </CategorySection>
      </MainContent>
      <Footer />
    </CommonWrapper>
  );
};

const SearchSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  margin-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const MainContent = styled(ContentContainer)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 2rem;
`;

const CategorySection = styled.section`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ViewAllButton = styled(Link)`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
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

export default HomePage;