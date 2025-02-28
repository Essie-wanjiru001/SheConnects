import React, { useState } from 'react';
import styled from 'styled-components';

const FilterOptions = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    scholarshipLevel: '',
    internshipField: '',
    eventType: ''
  });

  const handleChange = (type, value) => {
    const newFilters = {
      ...filters,
      [type]: value
    };
    console.log('New filters:', newFilters);
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <FilterContainer>
      <FilterGroup>
        <FilterLabel>Scholarships</FilterLabel>
        <Select 
          value={filters.scholarshipLevel}
          onChange={(e) => handleChange('scholarshipLevel', e.target.value)}
        >
          <option value="">All Levels</option>
          <option value="Undergraduate">Undergraduate</option>
          <option value="Masters">Masters</option>
          <option value="PhD">PhD</option>
        </Select>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>Internships</FilterLabel>
        <Select
          value={filters.internshipField}
          onChange={(e) => handleChange('internshipField', e.target.value)}
        >
          <option value="">All Fields</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
          <option value="engineering">Engineering</option>
          <option value="healthcare">Healthcare</option>
        </Select>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>Events</FilterLabel>
        <Select
          value={filters.eventType}
          onChange={(e) => handleChange('eventType', e.target.value)}
        >
          <option value="">All Events</option>
          <option value="workshop">Workshop</option>
          <option value="conference">Conference</option>
          <option value="seminar">Seminar</option>
          <option value="networking">Networking</option>
        </Select>
      </FilterGroup>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  padding: 20px;
  background-color:rgba(255, 246, 233, 0.93);
  border-radius: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterLabel = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #000;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 25px;
  border: 1px solid #0d9276;
  background-color: white;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  min-width: 200px;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #0a7960;
    box-shadow: 0 0 0 2px rgba(13, 146, 118, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default FilterOptions;