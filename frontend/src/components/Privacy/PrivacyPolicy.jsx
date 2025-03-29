import React from 'react';
import styled from 'styled-components';

const PrivacyPolicy = () => {
  return (
    <PolicyContainer>
      <PolicyTitle>Privacy Policy</PolicyTitle>
      <PolicyContent>
        <p>Last updated: March 29, 2025</p>

        <Section>
          <h3>Introduction</h3>
          <p>Welcome to SheConnects, a platform dedicated to empowering Kenyan women through educational and career opportunities. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.</p>
        </Section>

        <Section>
          <h3>Our Mission</h3>
          <p>At SheConnects, our mission is to bridge the gender gap in education and employment by connecting women with scholarships, internships, and networking opportunities. We believe in:</p>
          <ul>
            <li>Empowering women through equal access to opportunities</li>
            <li>Maintaining transparency in our data practices</li>
            <li>Protecting your privacy while facilitating meaningful connections</li>
            <li>Building a trusted community for career advancement</li>
          </ul>
        </Section>
        
        <Section>
          <h3>1. Information We Collect</h3>
          <p>We collect information that you provide directly to us, including:</p>
          <ul>
            <li>Name and email address</li>
            <li>Profile information (gender, phone number, location)</li>
            <li>Career interests and preferences</li>
            <li>Education history and qualifications</li>
            <li>Application data for scholarships and internships</li>
            <li>Communications between you and SheConnects</li>
          </ul>
          <p>We also automatically collect certain information when you use our platform:</p>
          <ul>
            <li>Device information and IP address</li>
            <li>Browser type and settings</li>
            <li>Usage data and interaction with our services</li>
          </ul>
        </Section>

        <Section>
          <h3>Cookie Policy</h3>
          <p>We use cookies and similar technologies to improve your experience on our platform:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
            <li><strong>Analytical Cookies:</strong> Help us understand how visitors use our site</li>
            <li><strong>Functional Cookies:</strong> Enable enhanced features and personalization</li>
          </ul>
          <p>You can manage your cookie preferences at any time through our cookie settings.</p>
        </Section>

        <Section>
          <h3>2. How We Use Your Information</h3>
          <ul>
            <li>To provide and maintain our services</li>
            <li>To notify you about changes to our services</li>
            <li>To provide customer support and respond to inquiries</li>
            <li>To match you with relevant opportunities</li>
            <li>To improve our platform and user experience</li>
            <li>To send relevant notifications and updates</li>
            <li>To prevent fraud and ensure platform security</li>
            <li>To comply with legal obligations</li>
          </ul>
        </Section>

        <Section>
          <h3>3. Information Sharing</h3>
          <p>We do not sell your personal information. We may share your information with:</p>
          <ul>
            <li>Scholarship providers and internship organizations you apply to</li>
            <li>Service providers who assist our operations</li>
            <li>Legal authorities when required by law</li>
            <li>Professional advisors and auditors</li>
          </ul>
        </Section>

        <Section>
          <h3>4. Data Security</h3>
          <p>We implement appropriate security measures to protect your personal information, including:</p>
          <ul>
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments</li>
            <li>Access controls and authentication</li>
            <li>Secure data backup procedures</li>
          </ul>
        </Section>

        <Section>
          <h3>5. Your Rights</h3>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Export your data</li>
          </ul>
        </Section>

        <Section>
          <h3>6. Data Retention</h3>
          <p>We retain your information for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your account at any time.</p>
        </Section>

        <Section>
          <h3>7. Changes to Privacy Policy</h3>
          <p>We may update this Privacy Policy periodically. We will notify you of any material changes via email or through our platform.</p>
        </Section>

        <Section>
          <h3>8. Contact Us</h3>
          <p>If you have questions about this Privacy Policy, please contact us at:</p>
          <p>Email: privacy@sheconnects.com</p>
          <p>Address: [Your Business Address]</p>
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