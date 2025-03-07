import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logoImage from "../../assets/images/logo.png";

const Logo = () => {
  return (
    <LogoLink to="/">
      <LogoWrapper>
        <LogoImage loading="lazy" src={logoImage} alt="SheConnects Logo" />
        <BrandName>SheConnects</BrandName>
      </LogoWrapper>
    </LogoLink>
  );
};

const LogoLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoImage = styled.img`
  height: 50px;
  width: auto;
  filter: brightness(1.2);
`;

const BrandName = styled.h1`
  color: #ffffff;
  font-family: Moul, -apple-system, Roboto, Helvetica, sans-serif;
  font-size: 32px;
  font-weight: 400;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

export default Logo;