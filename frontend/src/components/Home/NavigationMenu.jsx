import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const NavigationMenu = () => {
  const location = useLocation();
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "User Guide", path: "/user-guide" },
    { name: "Login", path: "/login" },
  ];

  return (
    <NavContainer>
      {menuItems.map((item) => (
        <NavItem 
          key={item.name} 
          to={item.path}
          $isActive={location.pathname === item.path}
        >
          {item.name}
        </NavItem>
      ))}
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  gap: 22px;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: center;
  color: #000;
  font: 400 24px "Inter", sans-serif;
  
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
    padding: 15px;
  }
`;

const NavItem = styled(Link)`
  border-radius: 20px;
  background-color: ${props => props.$isActive ? '#f0e4d3' : '#fff6e9'};
  padding: 11px 24px;
  cursor: pointer;
  text-decoration: none;
  color: #000;
  font-weight: ${props => props.$isActive ? '600' : '400'};
  transition: all 0.3s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f0e4d3;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 991px) {
    padding: 11px 20px;
    width: 80%;
    text-align: center;
  }

  @media (max-width: 576px) {
    width: 90%;
    font-size: 20px;
  }
`;

export default NavigationMenu;
