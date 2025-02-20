import React from "react";
import styled from "styled-components";
import Logo from "../../Home/Logo";
import NavigationMenu from "../../Home/NavigationMenu";
import Footer from "../../Home/Footer";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <LoginWrapper>
      <ContentContainer>
        <Header>
          <Logo />
          <NavigationMenu />
        </Header>
        <MainSection>
          <LoginForm />
        </MainSection>
      </ContentContainer>
      <Footer />
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div`
  background-color: #9ad0c2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;
  border: 1px solid #000;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 30px;
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
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  margin: 20px 0;
`;

export default LoginPage;