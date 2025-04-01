import React from 'react';
import styled from 'styled-components';

const PrivacyPolicy = () => {
  return (
    <PolicyContainer>
      <PolicyTitle>SheConnects Privacy Policy</PolicyTitle>
      <PolicyContent>
        <Section>
          <h3>Introduction</h3>
          <p>Welcome to SheConnects. We value your privacy the most, and we're dedicated to keeping safe the personal information that you share with us. This Privacy Policy describes how we collect, use, store, and defend your information while using our site. By accessing and utilizing SheConnects, you consent to the terms of this policy.</p>
        </Section>

        <Section>
          <h3>Information We Collect</h3>
          <p>We gather the following kinds of information:</p>
          <ul>
            <li>Personal Data: We can collect information like your name, email, and work history during the registration process.</li>
            <li>Usage Data: We gather statistics about your utilization of our site, including what pages you access and how long you spend on our site.</li>
            <li>Cookies and Tracking Technologies: We use cookies to improve the user experience and to analyze website traffic.</li>
          </ul>
        </Section>

        <Section>
          <h3>How We Use Your Information</h3>
          <p>Your details are used for the reasons stated below:</p>
          <ul>
            <li>To facilitate the access of students to internships, scholarships, and networks.</li>
            <li>To improve our platform and user experience</li>
            <li>To communicate updates and relevant opportunities</li>
            <li>To ensure security and prevent fraud</li>
          </ul>
        </Section>

        <Section>
          <h3>Data Protection & Security</h3>
          <p>We take the privacy of your data very seriously and utilize:</p>
          <ul>
            <li>Encryption protocols serve to safeguard sensitive data.</li>
            <li>Role-based access control functions to hinder unwanted access.</li>
            <li>Regular security audits to identify and neutralize threats</li>
          </ul>
        </Section>

        <Section>
          <h3>User Rights & Choices</h3>
          <p>You have the following rights regarding your data:</p>
          <ul>
            <li>Right to Access: Request a copy of your data</li>
            <li>Right to Be Forgotten: Request deletion of your personal information</li>
            <li>Data Portability: Receive your data in a structured format</li>
            <li>Opt-Out: Choose not to receive communications from us</li>
          </ul>
        </Section>

        <Section>
          <h3>Sharing & Third-Party Services</h3>
          <p>We do not sell or rent your personal data. However, we may share information with:</p>
          <ul>
            <li>Various stakeholders for platform maintenance and analytics</li>
            <li>Legal authorities if required by law</li>
          </ul>
        </Section>

        <Section>
          <h3>Retention & Deletion Policy</h3>
          <p>We hold your data for as long as we feel is necessary to fulfill the purposes of this policy. If you request us to, we will delete your information from our systems unless it is lawfully required for us to retain it.</p>
        </Section>

        <Section>
          <h3>Updates to This Policy</h3>
          <p>We may update this Privacy Policy from time to time. Any significant changes will be communicated via email or through our platform.</p>
        </Section>

        <Section>
          <h3>Contact and Support</h3>
          <p>Support Email: admin@sheconects.com</p>
          <p>Last Updated: 30/03/2025</p>
        </Section>

        <Section>
          <h3>Declaration of Understanding</h3>
          <p>By using SheConnects, you acknowledge that you have read, understood, and voluntarily agreed to the terms outlined in this comprehensive User Agreement and Privacy Policy.</p>
        </Section>
      </PolicyContent>
    </PolicyContainer>
  );
};

const PolicyContainer = styled.div`
  max-height: 600px; // Increased from 400px
  overflow-y: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f9f9f9;
  margin: 15px 0;
  font-size: 14px;
  line-height: 1.6;
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