import React from "react";
import styled from "styled-components";
import Logo from "../../Home/Logo";
import NavigationMenu from "../../Home/NavigationMenu";
import LoginForm from "./LoginForm";
import { CommonWrapper, CommonHeader, ContentContainer } from '../../../styles/CommonStyles';

const LoginPage = () => {
  return (
    <LoginWrapper>
      <CommonHeader>
        <Logo />
        <NavigationMenu />
      </CommonHeader>
      <ContentContainer>
        <LoginForm />
      </ContentContainer>
    </LoginWrapper>
  );
};

const LoginWrapper = styled(CommonWrapper)``;

export default LoginPage;