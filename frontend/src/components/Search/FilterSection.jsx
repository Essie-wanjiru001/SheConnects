import React from 'react';
import styled from 'styled-components';
import FilterOptions from './FilterOptions';
import { useSearchParams } from 'react-router-dom';

const FilterSection = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (filters) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  return (
    <FilterSectionWrapper>
      <FilterHeading>Filter By Category</FilterHeading>
      <FilterOptions onFilterChange={handleFilterChange} />
    </FilterSectionWrapper>
  );
};

const FilterSectionWrapper = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const FilterHeading = styled.h2`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export default FilterSection;