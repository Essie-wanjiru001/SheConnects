import React from "react";
import styled from "styled-components";
import logoImage from "../../assets/images/logo.png";

const Logo = () => {
  return (
    <LogoWrapper>
      <LogoImage loading="lazy" src={logoImage} alt="SheConnects Logo" />
      <BrandName>SheConnects</BrandName>
    </LogoWrapper>
  );
};

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoImage = styled.img`
  height: 50px; // Reduced height
  width: auto;
`;

const BrandName = styled.h1`
  color: #000000;
  font-family: Moul, -apple-system, Roboto, Helvetica, sans-serif;
  font-size: 32px; // Reduced font size
  font-weight: 400;
  margin: 0;
`;

export default Logo;