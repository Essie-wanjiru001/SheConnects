import React from 'react';
import styled from 'styled-components';
import facebookIcon from '../../assets/icons/facebook.svg';
import instagramIcon from '../../assets/icons/instagram.svg';
import githubIcon from '../../assets/icons/github.svg';
import slackIcon from '../../assets/icons/slack.svg';
import twitterIcon from '../../assets/icons/twitter.svg';

const SocialIcons = () => {
  const socialLinks = [
    { icon: facebookIcon, url: 'https://facebook.com/sheconnects', alt: 'Facebook' },
    { icon: instagramIcon, url: 'https://instagram.com/sheconnects', alt: 'Instagram' },
    { icon: githubIcon, url: 'https://github.com/sheconnects', alt: 'GitHub' },
    { icon: slackIcon, url: 'https://sheconnects.slack.com', alt: 'Slack' },
    { icon: twitterIcon, url: 'https://twitter.com/sheconnects', alt: 'Twitter' }
  ];

  return (
    <IconsContainer>
      {socialLinks.map((social, index) => (
        <IconLink 
          key={index} 
          href={social.url} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Icon src={social.icon} alt={social.alt} />
        </IconLink>
      ))}
    </IconsContainer>
  );
};

const IconsContainer = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  justify-content: center;
  padding: 10px 0;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const IconLink = styled.a`
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  filter: brightness(0) invert(1);
`;

export default SocialIcons;