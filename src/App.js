// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { EventProvider } from "./context/EventContext";
import Calendar from "./components/Calendar";
import EventDetails from "./components/EventDetails";
import Header from "./components/Header";
import "./App.css";

const App = () => {
  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    document.body.className = themeMode;
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <EventProvider>
      <Router>
        {}
        <Header themeMode={themeMode} onToggleTheme={toggleTheme} />
        <div className={themeMode}>
          {" "}
          {}
          <Routes>
            <Route path="/" element={<Calendar themeMode={themeMode} />} />
            <Route
              path="/event/:id"
              element={<EventDetails themeMode={themeMode} />}
            />
          </Routes>
        </div>
      </Router>
    </EventProvider>
  );
};

export default App;
