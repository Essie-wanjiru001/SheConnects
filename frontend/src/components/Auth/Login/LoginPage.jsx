import React from "react";
import styled from "styled-components";
import Logo from "../../Home/Logo";
import NavigationMenu from "../../Home/NavigationMenu";
import LoginForm from "./LoginForm";
import { CommonHeader } from '../../../styles/CommonStyles';

const LoginPage = () => {
  return (
    <PageContainer>
      <CommonHeader>
        <Logo />
        <NavigationMenu />
      </CommonHeader>
      <MainContent>
        <LoginForm />
      </MainContent>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f);
`;

const MainContent = styled.main`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  margin-top: 70px;
`;

export default LoginPage;