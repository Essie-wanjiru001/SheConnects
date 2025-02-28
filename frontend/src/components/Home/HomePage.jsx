import React, { useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import NavigationMenu from "./NavigationMenu";
import Footer from "./Footer";
import SearchBar from "../Search/SearchBar";
import FilterOptions from "../Search/FilterOptions";
import ScholarshipList from "../Scholarships/ScholarshipList";
import { CommonWrapper, CommonHeader, ContentContainer } from '../../styles/CommonStyles';

const HomePage = () => {
  const [filters, setFilters] = useState({
    scholarshipLevel: '',
    internshipField: '',
    eventType: ''
  });

  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
  };

  const handleFilter = (newFilters) => {
    console.log('Applying filters:', newFilters);
    setFilters(newFilters);
  };

  return (
    <HomeWrapper>
      <CommonHeader>
        <Logo />
        <NavigationMenu />
      </CommonHeader>
      <ContentContainer>
        <SearchBarContainer>
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search for scholarships and opportunities..."
          />
        </SearchBarContainer>
        <FilterContainer>
          <FilterOptions onFilterChange={handleFilter} />
        </FilterContainer>
        <ScholarshipList filters={filters} />
      </ContentContainer>
      <Footer />
    </HomeWrapper>
  );
};

const HomeWrapper = styled(CommonWrapper)``;

const SearchBarContainer = styled.div`
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const FilterContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%; // Set equal width
  height: 500px; // Set fixed height
  padding: 20px;
  background-color: #fff6e9;
  border-radius: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden; // Add this to contain the image

  @media (max-width: 991px) {
    width: 100%;
    height: 400px;
  }
`;

const Tagline = styled.p`
  color: #000;
  text-align: left;
  font: 400 42px 'Jomolhari', sans-serif; // Slightly reduced font size
  line-height: 1.3;
  margin: 0;
  padding: 25px;
  max-width: 100%; // Ensure text stays within container

  @media (max-width: 991px) {
    font-size: 36px;
    text-align: center;
  }

  @media (max-width: 768px) {
    font-size: 28px;
    padding: 15px;
  }
`;

export default HomePage;