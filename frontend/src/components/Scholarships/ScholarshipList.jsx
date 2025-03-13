import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ScholarshipCard from './ScholarshipCard';
import { getTopScholarships } from '../../services/scholarshipService';

const ScholarshipList = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);
        const data = await getTopScholarships();
        console.log('Scholarships data:', data);
        setScholarships(data); // Use the array directly
      } catch (error) {
        console.error('Error fetching scholarships:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  if (loading) return <Loading>Loading scholarships...</Loading>;
  if (error) return <Error>{error}</Error>;

  return (
    <ListContainer>
      {!scholarships || scholarships.length === 0 ? (
        <NoResults>No scholarships available</NoResults>
      ) : (
        scholarships.map(scholarship => (
          <ScholarshipCard 
            key={scholarship.id} 
            scholarship={scholarship} 
          />
        ))
      )}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
`;

const Loading = styled.div`
  text-align: center;
  padding: 20px;
  color: #ffffff;
`;

const Error = styled.div`
  text-align: center;
  padding: 20px;
  color: #ff4444;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 20px;
  color: #ffffff;
`;

export default ScholarshipList;