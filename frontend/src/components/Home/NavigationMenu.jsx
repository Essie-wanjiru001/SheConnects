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
  color: #000000;
  font-family: Inter, sans-serif;
  font-size: 16px; // Reduced font size
  font-weight: 500;
  text-decoration: none;
  padding: 5px 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #0d9276;
  }

  &.active {
    color: #0d9276;
    font-weight: 600;
  }
`;

export default NavigationMenu;
