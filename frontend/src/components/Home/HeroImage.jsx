import React from "react";
import styled from "styled-components";
import heroImage from "../../assets/images/hero-image.png";

const HeroImage = () => {
  return (
    <ImageContainer>
      <HeroImageWrapper 
        src={heroImage} 
        alt="Women in tech illustration" 
        loading="lazy"
      />
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroImageWrapper = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain; // This will maintain aspect ratio
  object-position: center;
`;

export default HeroImage;