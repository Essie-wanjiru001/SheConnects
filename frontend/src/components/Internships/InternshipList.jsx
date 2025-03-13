import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InternshipCard from './InternshipCard';
import { getInternships } from '../../services/internshipService';

const InternshipList = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        setLoading(true);
        const response = await getInternships();
        console.log('Internships data:', response);
        
        if (response && response.internships) {
          setInternships(response.internships);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching internships:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  if (loading) return <Loading>Loading internships...</Loading>;
  if (error) return <Error>{error}</Error>;

  return (
    <ListContainer>
      {!internships || internships.length === 0 ? (
        <NoResults>No internships available</NoResults>
      ) : (
        internships.map(internship => (
          <InternshipCard 
            key={internship.id} 
            internship={internship} 
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
  color: #666;
`;

export default InternshipList;