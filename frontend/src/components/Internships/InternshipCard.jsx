import React from 'react';
import styled from 'styled-components';
import { FaBuilding, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const InternshipCard = ({ internship }) => {
  return (
    <Card>
      <Header>
        <CompanyLogo>
          <FaBuilding size={24} />
        </CompanyLogo>
        <CompanyInfo>
          <Title>{internship.title}</Title>
          <Company>{internship.company}</Company>
        </CompanyInfo>
      </Header>

      <Content>
        <Description>{internship.description}</Description>
        
        <DetailsList>
          <DetailItem>
            <FaMapMarkerAlt />
            <span>{internship.location}</span>
          </DetailItem>
          <DetailItem>
            <FaCalendarAlt />
            <span>Deadline: {new Date(internship.deadline).toLocaleDateString()}</span>
          </DetailItem>
        </DetailsList>

        <Tags>
          {internship.type && <Tag>{internship.type}</Tag>}
          {internship.duration && <Tag>{internship.duration}</Tag>}
          {internship.isPaid && <Tag isPaid>Paid</Tag>}
        </Tags>
      </Content>

      <Footer>
        <ApplyButton href={internship.apply_link} target="_blank" rel="noopener noreferrer">
          Apply Now
        </ApplyButton>
      </Footer>
    </Card>
  );
};

const Card = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 20px;
  transition: transform 0.2s ease, background-color 0.2s ease;
  color: white;

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const CompanyLogo = styled.div`
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  color: #154C79;
`;

const CompanyInfo = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  color: #154C79;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Company = styled.p`
  margin: 4px 0 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
`;

const Content = styled.div`
  margin: 16px 0;
`;

const Description = styled.p`
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

const DetailsList = styled.div`
  margin: 12px 0;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  margin: 8px 0;
  
  svg {
    color: #154C79;
    margin-right: 8px;
    font-size: 1.1rem;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0;
`;

const Tag = styled.span`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.8rem;
  background: ${props => props.isPaid ? 'rgba(46, 125, 50, 0.4)' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.isPaid ? '#98fb98' : 'white'};
  border: 1px solid ${props => props.isPaid ? 'rgba(46, 125, 50, 0.5)' : 'rgba(255, 255, 255, 0.3)'};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const Footer = styled.div`
  margin-top: 16px;
  text-align: right;
`;

const ApplyButton = styled.a`
  display: inline-block;
  padding: 8px 24px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const IconWrapper = styled.div`
  color: #154C79;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  margin-right: 12px;
`;

export default InternshipCard;