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
        setScholarships(data);
      } catch (error) {
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
            key={scholarship.scholarshipID} 
            scholarship={scholarship} 
          />
        ))
      )}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 25px;
  padding: 20px;
  margin: 0 -20px;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }

  & > * {
    flex: 0 0 350px;
  }
`;

const Loading = styled.div`
  text-align: center;
  padding: 20px;
  color: rgba(255, 255, 255, 0.9);
`;

const Error = styled.div`
  text-align: center;
  padding: 20px;
  color: #ff4444;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 20px;
  color: rgba(255, 255, 255, 0.9);
`;

export default ScholarshipList;