import React from "react";
import styled from "styled-components";
import logoImage from "../../assets/images/logo.png";

const Logo = () => {
  return (
    <LogoContainer>
      <LogoImage loading="lazy" src={logoImage} alt="SheConnects Logo" />
      <BrandName>SheConnects</BrandName>
    </LogoContainer>
  );
};

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const LogoImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  object-position: center;

  @media (max-width: 991px) {
    width: 150px;
    height: 150px;
  }

  @media (max-width: 576px) {
    width: 120px;
    height: 120px;
  }
`;

const BrandName = styled.h1`
  color: #000;
  font: 400 96px 'Jomhuria', sans-serif;
  margin: 0;
  transition: font-size 0.3s ease;
  
  @media (max-width: 991px) {
    font-size: 72px;
  }
  
  @media (max-width: 768px) {
    font-size: 60px;
  }
`;

export default Logo;