import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ScholarshipCard from './ScholarshipCard';
import { getScholarships } from '../../services/scholarshipService';

const ScholarshipList = ({ filters }) => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);
        const data = await getScholarships();
        
        // Ensure we have the scholarships array
        const allScholarships = data?.scholarships || [];
        console.log('All scholarships:', allScholarships);

        // Apply filters
        const filteredScholarships = filters.scholarshipLevel
          ? allScholarships.filter(s => s.type === filters.scholarshipLevel)
          : allScholarships;
        
        console.log('Filtered scholarships:', filteredScholarships);
        setScholarships(filteredScholarships);
      } catch (err) {
        console.error('Error fetching scholarships:', err);
        setError(err.message || 'Failed to fetch scholarships');
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, [filters]);

  if (loading) return <LoadingMessage>Loading scholarships...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!scholarships || scholarships.length === 0) {
    return <NoDataMessage>No scholarships found for the selected filters</NoDataMessage>;
  }

  return (
    <ListContainer>
      {scholarships.map(scholarship => (
        <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #0d9276;
  font: 500 18px 'Inter', sans-serif;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: #ff0033;
  font: 500 18px 'Inter', sans-serif;
`;

const NoDataMessage = styled.p`
  text-align: center;
  color: #666;
  font: 500 18px 'Inter', sans-serif;
`;

export default ScholarshipList;