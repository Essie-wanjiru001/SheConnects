import React from 'react';
import styled from 'styled-components';

const PrivacyPolicy = () => {
  return (
    <PolicyContainer>
      <PolicyTitle>Privacy Policy</PolicyTitle>
      <PolicyContent>
        <p>Last updated: March 28, 2025</p>
        
        <Section>
          <h3>1. Information We Collect</h3>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Name and email address</li>
            <li>Profile information (gender, phone number)</li>
            <li>Career interests and preferences</li>
            <li>Application data for scholarships and internships</li>
          </ul>
        </Section>

        <Section>
          <h3>2. How We Use Your Information</h3>
          <ul>
            <li>To provide and maintain our services</li>
            <li>To notify you about changes to our services</li>
            <li>To provide customer support</li>
            <li>To match you with relevant opportunities</li>
          </ul>
        </Section>

        <Section>
          <h3>3. Information Sharing</h3>
          <p>We do not sell your personal information. We may share your information with:</p>
          <ul>
            <li>Scholarship providers and internship organizations you apply to</li>
            <li>Service providers who assist our operations</li>
          </ul>
        </Section>

        <Section>
          <h3>4. Data Security</h3>
          <p>We implement appropriate security measures to protect your personal information.</p>
        </Section>
      </PolicyContent>
    </PolicyContainer>
  );
};

const PolicyContainer = styled.div`
  max-height: 200px;
  overflow-y: auto;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f9f9f9;
  margin: 10px 0;
  font-size: 14px;
`;

const PolicyTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
`;

const PolicyContent = styled.div`
  color: #666;
  
  p {
    margin-bottom: 10px;
  }
`;

const Section = styled.div`
  margin-bottom: 15px;
  
  h3 {
    font-size: 16px;
    color: #444;
    margin-bottom: 8px;
  }
  
  ul {
    padding-left: 20px;
    
    li {
      margin-bottom: 5px;
    }
  }
`;

export default PrivacyPolicy;