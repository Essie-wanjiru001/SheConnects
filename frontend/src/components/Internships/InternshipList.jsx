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
  background: linear-gradient(135deg, #1a2a6c, #b21f1f);
  min-height: 60vh;
`;

const Title = styled.h2`
  text-align: center;
  color: white;
  margin-bottom: 40px;
  font-size: 2rem;
  font-weight: 600;
`;

const CardsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 25px;
  padding: 20px;
  margin: 0 -20px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  
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
`;

const Card = styled.div`
  flex: 0 0 350px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 20px;
  color: white;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
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

const CompanyName = styled.span`
  color: rgba(255, 255, 255, 0.8);
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
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin: 8px 0;
  
  svg {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 12px 0;
  max-height: 4.8rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const ApplyButton = styled.a`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const Deadline = styled.span`
  color: rgba(255, 255, 255, 0.7);
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