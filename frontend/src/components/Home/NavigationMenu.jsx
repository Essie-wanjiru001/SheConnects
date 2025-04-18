import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const NavigationMenu = () => {
  const location = useLocation();
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Resources", path: "/resources" },
    { name: "Login", path: "/login" },
  ];

  return (
    <Nav>
      {menuItems.map((item) => (
        <NavLink 
          key={item.name} 
          to={item.path}
          className={location.pathname === item.path ? 'active' : ''}
        >
          {item.name}
        </NavLink>
      ))}
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  padding: 5px 10px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
  }

  &.active {
    color: #ffffff;
    font-weight: 600;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 70%;
      height: 2px;
      background-color: #ffffff;
      border-radius: 2px;
    }
  }
`;

export default NavigationMenu;
