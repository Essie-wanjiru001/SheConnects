import React from "react";
import styled from "styled-components";
import menuIcon from "../../assets/icons/menu.png";

const Header = ({ toggleSidebar }) => (
  <HeaderWrapper>
    <MenuIcon 
      src={menuIcon} 
      alt="Menu" 
      onClick={toggleSidebar}
      role="button"
      aria-label="Toggle sidebar"
    />
    <Title>SheConnects</Title>
  </HeaderWrapper>
);

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-color: rgba(0, 0, 0, 1);
  border-style: solid;
  border-width: 1px;
  width: 100%;
  background-color: rgba(13, 146, 118, 1);
  padding: 31px 0;
  position: relative;
`;

const MenuIcon = styled.img`
  position: absolute;
  left: 20px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  margin: 0;
  color: rgba(255, 255, 255, 1);
  font-family: Moul, -apple-system, Roboto, Helvetica, sans-serif;
  font-size: 55px;
  font-weight: 400;
  text-align: center;

  @media (max-width: 991px) {
    font-size: 40px;
  }
`;

export default Header;
