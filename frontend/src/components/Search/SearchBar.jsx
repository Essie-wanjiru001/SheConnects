import React, { useState } from 'react';
import styled from 'styled-components';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ term: searchTerm, category });
  };

  return (
    <SearchContainer>
      <Form onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="Search opportunities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CategorySelect
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="scholarships">Scholarships</option>
          <option value="internships">Internships</option>
          <option value="events">Events</option>
        </CategorySelect>
        <SearchButton type="submit">Search</SearchButton>
      </Form>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  margin: 20px 0;
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  max-width: 800px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const CategorySelect = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

export default SearchBar;