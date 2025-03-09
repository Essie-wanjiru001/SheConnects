import React from "react";
import styled from "styled-components";
import Logo from "../../Home/Logo";
import NavigationMenu from "../../Home/NavigationMenu";
import RegisterForm from "./RegisterForm";
import { CommonWrapper, CommonHeader, ContentContainer } from '../../../styles/CommonStyles';

const RegisterPage = () => {
  return (
    <RegisterWrapper>
      <CommonHeader>
        <Logo />
        <NavigationMenu />
      </CommonHeader>
      <ContentContainer>
        <RegisterForm />
      </ContentContainer>
    </RegisterWrapper>
  );
};

const RegisterWrapper = styled(CommonWrapper)``;

export default RegisterPage;