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

const CardBase = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Card = styled(CardBase)`
  // Additional internship-specific styling
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const CompanyLogo = styled.div`
  width: 48px;
  height: 48px;
  background: #f5f5f5;
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
  margin: 0;
  color: #154C79;
  font-size: 18px;
  font-weight: 600;
`;

const Company = styled.p`
  margin: 4px 0 0;
  color: #666;
  font-size: 14px;
`;

const Content = styled.div`
  margin: 16px 0;
`;

const Description = styled.p`
  color: #444;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 16px;
`;

const DetailsList = styled.div`
  margin: 12px 0;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  font-size: 14px;
  margin: 8px 0;

  svg {
    margin-right: 8px;
    color: #154C79;
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
  font-size: 12px;
  background: ${props => props.isPaid ? '#e1f7e1' : '#f0f0f0'};
  color: ${props => props.isPaid ? '#2e7d32' : '#666'};
`;

const Footer = styled.div`
  margin-top: 16px;
  text-align: right;
`;

const ApplyButton = styled.a`
  display: inline-block;
  padding: 8px 24px;
  background-color: #154C79;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0d3251;
  }
`;

export default InternshipCard;