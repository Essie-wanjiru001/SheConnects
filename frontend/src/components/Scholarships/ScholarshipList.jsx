import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ScholarshipCard from './ScholarshipCard';
import { getScholarships } from '../../services/scholarshipService';

const ScholarshipList = ({ isDashboard }) => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        setLoading(true);
        const response = await getScholarships();
        if (response && response.scholarships) {
          setScholarships(response.scholarships);
        } else {
          throw new Error('Invalid response format');
        }
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
    <Container isDashboard={isDashboard}>
      {isDashboard && (
        <Header>
          <h1>Scholarships</h1>
          <SearchBar onSearch={handleSearch} />
        </Header>
      )}
      <ListContainer>
        {scholarships.length === 0 ? (
          <NoResults>No scholarships available</NoResults>
        ) : (
          scholarships.map(scholarship => (
            <ScholarshipCard 
              key={scholarship.id} 
              scholarship={scholarship}
              isDashboard={isDashboard}
            />
          ))
        )}
      </ListContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: ${props => props.isDashboard ? '20px' : '0'};
  width: 100%;
`;

const Header = styled.div`
  margin-bottom: 30px;
  
  h1 {
    color: #154C79;
    margin-bottom: 20px;
  }
`;

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