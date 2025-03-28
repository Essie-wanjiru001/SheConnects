import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const SearchBar = ({ onSearchResults }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCategory, setSearchCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.get('/api/search', {
                params: {
                    query: searchQuery,
                    category: searchCategory
                }
            });

            if (response.data.success) {
                onSearchResults(response.data.results);
            }
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SearchForm onSubmit={handleSearch}>
            <SearchInput
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search opportunities..."
            />
            <CategorySelect
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
            >
                <option value="all">All Categories</option>
                <option value="scholarships">Scholarships</option>
                <option value="internships">Internships</option>
                <option value="events">Events</option>
            </CategorySelect>
            <SearchButton type="submit" disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search'}
            </SearchButton>
        </SearchForm>
    );
};

const SearchForm = styled.form`
    display: flex;
    gap: 10px;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
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
    background-color: #1a2a6c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #2a3a7c;
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

export default SearchBar;