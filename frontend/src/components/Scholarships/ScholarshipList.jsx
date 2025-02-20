import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ScholarshipCard from './ScholarshipCard';
import { getScholarships } from '../../services/scholarshipService';

const ScholarshipList = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const data = await getScholarships();
        setScholarships(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  if (loading) return <LoadingMessage>Loading scholarships...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <ListContainer>
      {scholarships.map(scholarship => (
        <ScholarshipCard 
          key={scholarship.id} 
          scholarship={scholarship} 
        />
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font: 500 18px Inter, sans-serif;
  color: #0d9276;
  padding: 20px;
`;

const ErrorMessage = styled.p`
  text-align: center;
  font: 500 18px Inter, sans-serif;
  color: #ff0033;
  padding: 20px;
`;

export default ScholarshipList;