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
  color: #ffffff; // Changed to white for better visibility
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  padding: 5px 10px;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: #9ad0c2; // Light mint color on hover
    text-shadow: 0 0 8px rgba(154, 208, 194, 0.4); // Glow effect on hover
  }

  &.active {
    color: #9ad0c2; // Light mint color for active state
    font-weight: 600;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 70%;
      height: 2px;
      background-color: #9ad0c2;
      border-radius: 2px;
    }
  }
`;

export default NavigationMenu;
