// src/components/Header.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "./Filter";
import { ReactComponent as SunIcon } from "../assets/headers/sun.svg";
import { ReactComponent as MoonIcon } from "../assets/headers/moon.svg";
// import { IconButton } from "./Button";
const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
  }

  &:focus {
    outline: none;
  }
`;
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;

const Header = ({ themeMode, selectedCategory, onFilterChange }) => {
  const [theme, setTheme] = useState("light");
  const categories = ["All", "Work", "Personal", "Others"];

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <HeaderContainer>
      <Title>Calendar</Title>
      <IconButton onClick={toggleTheme}>
        {theme === "light" ? <MoonIcon /> : <SunIcon />}
      </IconButton>
      {/* <Filter /> */}
    </HeaderContainer>
  );
};

export default Header;
