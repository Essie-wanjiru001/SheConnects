import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { searchAll } from '../../services/searchService';
import ScholarshipCard from '../Scholarships/ScholarshipCard';
import InternshipCard from '../Internships/InternshipCard';
import EventCard from '../Events/EventCard';

const SearchResults = ({ searchTerm, filters }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await searchAll({
          search: searchTerm,
          type: filters.type,
          category: filters.category
        });
        setResults(response.results);
        setError(null);
      } catch (error) {
        setError('Search failed. Please try again.');
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm, filters]);

  const renderCard = (item) => {
    switch (item.category) {
      case 'scholarship':
        return <ScholarshipCard key={`sch-${item.id}`} scholarship={item} />;
      case 'internship':
        return <InternshipCard key={`int-${item.id}`} internship={item} />;
      case 'event':
        return <EventCard key={`evt-${item.id}`} event={item} />;
      default:
        return null;
    }
  };

  if (loading) return <Loading>Searching...</Loading>;
  if (error) return <Error>{error}</Error>;

  return (
    <ResultsContainer>
      {results.length === 0 ? (
        <NoResults>No results found</NoResults>
      ) : (
        <Grid>{results.map(renderCard)}</Grid>
      )}
    </ResultsContainer>
  );
};

const ResultsContainer = styled.div`
  padding: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const Loading = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

const Error = styled.div`
  text-align: center;
  padding: 20px;
  color: #ff4444;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

export default SearchResults;