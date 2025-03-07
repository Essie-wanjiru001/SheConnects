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
  background: linear-gradient(135deg, rgb(13, 57, 75) 0%, rgb(21, 76, 121) 100%);
  display: flex;
  margin-top: 53px;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 13px 70px;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
    padding: 0 20px;
  }
`;

const Copyright = styled.p`
  color: #ffffff;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

export default Footer;