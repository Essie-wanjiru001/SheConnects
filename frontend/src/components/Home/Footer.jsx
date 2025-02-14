import React from 'react';
import styled from 'styled-components';
import SocialIcons from './SocialIcons';

const Footer = () => {
  return (
    <FooterWrapper>
      <SocialIcons />
      <Copyright>© 2024 SheConnects. All rights reserved.</Copyright>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  background-color: #0d9276;
  display: flex;
  margin-top: 53px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 13px 70px;
  
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
    padding: 0 20px;
  }
`;

const Copyright = styled.p`
  color: white;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

export default Footer;