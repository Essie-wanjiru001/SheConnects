import React from "react";
import styled from "styled-components";
import menuIcon from "../../assets/icons/menu.png";
import { useSidebar } from "../../contexts/SidebarContext";

const Header = () => {
  const { toggleSidebar } = useSidebar();

  return (
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
};

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f);
  padding: 10px 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 70px;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const MenuIcon = styled.img`
  position: absolute;
  left: 20px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: transform 0.3s ease;
  filter: brightness(0) invert(1);

  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  margin: 0;
  color: #ffffff;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  letter-spacing: 1px;

  @media (max-width: 991px) {
    font-size: 1.8rem;
  }
`;

export default Header;
