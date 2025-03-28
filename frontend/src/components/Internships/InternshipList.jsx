import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getInternships } from '../../services/internshipService';
import { FaBriefcase, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const InternshipList = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const data = await getInternships();
      setInternships(data || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching internships:', err);
      setError(err.message || 'Failed to load internships');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  if (loading) return <LoadingWrapper>Loading internships...</LoadingWrapper>;
  if (error) return <ErrorWrapper>{error}</ErrorWrapper>;

  return (
    <CardsContainer>
      {internships.length === 0 ? (
        <EmptyState>No internships available at the moment.</EmptyState>
      ) : (
        internships.map(internship => (
          <Card key={internship.id}>
            <CardHeader>
              <CompanyLogo>
                {internship.company.charAt(0)}
              </CompanyLogo>
              <HeaderText>
                <h3>{internship.title}</h3>
                <CompanyName>{internship.company}</CompanyName>
              </HeaderText>
            </CardHeader>

            <CardDetails>
              <DetailItem>
                <FaBriefcase />
                <span>{internship.type || 'Not specified'}</span>
              </DetailItem>
              <DetailItem>
                <FaMapMarkerAlt />
                <span>{internship.location || 'Remote'}</span>
              </DetailItem>
              <DetailItem>
                <FaClock />
                <span>{internship.duration || 'Not specified'}</span>
              </DetailItem>
            </CardDetails>

            <CardDescription>
              {internship.description?.slice(0, 150)}...
            </CardDescription>

            <CardFooter>
              <ApplyButton href={internship.apply_link || '#'}>
                Apply Now
              </ApplyButton>
              <Deadline>
                Deadline: {new Date(internship.deadline).toLocaleDateString()}
              </Deadline>
            </CardFooter>
          </Card>
        ))
      )}
    </CardsContainer>
  );
};

const Section = styled.section`
  padding: 40px 20px;
  background-color: #f5f7fa;
  min-height: 60vh;
`;

const Title = styled.h2`
  text-align: center;
  color: #1a2a6c;
  margin-bottom: 40px;
  font-size: 2rem;
  font-weight: 600;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
  padding: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const CompanyLogo = styled.div`
  width: 50px;
  height: 50px;
  background: #1a2a6c;
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 15px;
`;

const HeaderText = styled.div`
  h3 {
    margin: 0;
    color: #1a2a6c;
    font-size: 1.2rem;
  }
`;

const CompanyName = styled.p`
  margin: 5px 0 0;
  color: #666;
  font-size: 0.9rem;
`;

const CardDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  font-size: 0.9rem;

  svg {
    margin-right: 8px;
    color: #1a2a6c;
  }
`;

const CardDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const ApplyButton = styled.a`
  background: #1a2a6c;
  color: white;
  padding: 8px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: background 0.2s ease;

  &:hover {
    background: #2a3a7c;
  }
`;

const Deadline = styled.span`
  color: #666;
  font-size: 0.8rem;
`;

const LoadingWrapper = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
`;

const ErrorWrapper = styled.div`
  text-align: center;
  padding: 20px;
  color: #dc3545;
  max-width: 600px;
  margin: 20px auto;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

export default InternshipList;