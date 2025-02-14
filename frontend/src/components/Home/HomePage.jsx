import React from "react";
import styled from "styled-components";
import Logo from "./Logo";
import NavigationMenu from "./NavigationMenu";
import HeroImage from "./HeroImage";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <HomeWrapper>
      <ContentContainer>
        <Header>
          <Logo />
          <NavigationMenu />
        </Header>
        <MainSection>
          <Section>
            <Tagline>
            Empowering young women to break barriers through a digital platform that unlocks their potential for higher education and beyond: Connecting them to scholarship resources, and career opportunities
            </Tagline>
          </Section>
          <Section>
            <HeroImage />
          </Section>
        </MainSection>
      </ContentContainer>
      <Footer />
    </HomeWrapper>
  );
};

const HomeWrapper = styled.div`
  background-color: #9ad0c2;
  min-height: 100vh; // Changed back to min-height
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto; // Allow vertical scrolling
  border: 1px solid #000;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 30px; // Increased gap for better spacing
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 20px 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
`;

const MainSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch; // Changed to stretch to ensure equal height
  width: 100%;
  gap: 40px;
  padding: 20px;
  margin: 20px 0;

  @media (max-width: 991px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Section = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%; // Set equal width
  height: 500px; // Set fixed height
  padding: 20px;
  background-color: #fff6e9;
  border-radius: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden; // Add this to contain the image

  @media (max-width: 991px) {
    width: 100%;
    height: 400px;
  }
`;

const Tagline = styled.p`
  color: #000;
  text-align: left;
  font: 400 42px 'Jomolhari', sans-serif; // Slightly reduced font size
  line-height: 1.3;
  margin: 0;
  padding: 25px;
  max-width: 100%; // Ensure text stays within container

  @media (max-width: 991px) {
    font-size: 36px;
    text-align: center;
  }

  @media (max-width: 768px) {
    font-size: 28px;
    padding: 15px;
  }
`;

export default HomePage;