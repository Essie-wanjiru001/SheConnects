import React from "react";
import styled from "styled-components";
import Logo from "../../Home/Logo";
import NavigationMenu from "../../Home/NavigationMenu";
import LoginForm from "./LoginForm";
import { CommonWrapper, CommonHeader, ContentContainer } from '../../../styles/CommonStyles';
import { login } from '../../../services/authService';

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

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await login({ email, password });
    // ...rest of your code...
  } catch (error) {
    setError('Invalid credentials');
  }
};

const LoginWrapper = styled(CommonWrapper)``;

export default LoginPage;