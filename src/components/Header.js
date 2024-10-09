// src/components/Header.js
import React from "react";
import styled from "styled-components";
import { ReactComponent as SunIcon } from "../assets/headers/sun.svg";
import { ReactComponent as MoonIcon } from "../assets/headers/moon.svg";

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 30px; /* Increased size */
    height: 30px; /* Increased size */
  }

  &:focus {
    outline: none;
  }
`;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between; /* Keep spacing between items */
  align-items: center;
  padding: 10px 20px;
  background-color: ${({ themeMode }) =>
    themeMode === "light"
      ? "#f0f0f0"
      : "#333"}; /* Change background color based on theme */
  color: ${({ themeMode }) =>
    themeMode === "light"
      ? "#333"
      : "#fff"}; /* Change text color based on theme */
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  flex-grow: 1; /* Allow the title to grow and take available space */
  text-align: center; /* Center the title */
`;

const Header = ({ themeMode, onToggleTheme }) => {
  return (
    <HeaderContainer themeMode={themeMode}>
      <Title>Calendar</Title>
      <div style={{ width: "40px" }} />{" "}
      {/* Empty div to maintain spacing for the icon */}
      <IconButton onClick={onToggleTheme}>
        {themeMode === "light" ? <MoonIcon /> : <SunIcon />}
      </IconButton>
    </HeaderContainer>
  );
};

export default Header;
