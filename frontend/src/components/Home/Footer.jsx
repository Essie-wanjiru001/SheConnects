import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <SectionTitle>SheConnects</SectionTitle>
          <Description>
            Empowering women through opportunities, mentorship, and community.
          </Description>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Quick Links</SectionTitle>
          <LinkList>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/resources">Resources</FooterLink>
            <FooterLink to="/login">Login</FooterLink>
            <FooterLink to="/register">Sign Up</FooterLink>
          </LinkList>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Connect</SectionTitle>
          <SocialLinks>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>
      </FooterContent>
      
      <Divider />
      
      <Copyright>
        © {new Date().getFullYear()} SheConnects. All rights reserved.
      </Copyright>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background: linear-gradient(135deg, #1a2a6c, #b21f1f);
  padding: 3rem 0 1.5rem 0;
  margin-top: auto;
  width: 100%;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SectionTitle = styled.h3`
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.6;
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: white;
    transform: translateY(-2px);
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 2rem 0;
  width: 100%;
`;

const Copyright = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  text-align: center;
  margin: 0;
  padding: 0 2rem;
`;

export default Footer;