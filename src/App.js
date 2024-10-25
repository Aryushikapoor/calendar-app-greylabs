// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { EventProvider } from "./context/EventContext";
import Calendar from "./components/Calendar";
import EventDetails from "./components/EventDetails";
import Header from "./components/Header";
import Loader from "./components/Loader";
import "./App.css";

const App = () => {
  const [themeMode, setThemeMode] = useState("dark");
  const [loading, setLoading] = useState(true);

  // Loader timeout for simulation of content loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 2 seconds delay
    return () => clearTimeout(timer);
  }, []);

  // Update theme mode on body
  useEffect(() => {
    document.body.className = themeMode;
  }, [themeMode]);

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setThemeMode((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <EventProvider>
      {loading ? ( // Show loader while loading is true
        <Loader />
      ) : ( // Show main content once loading is complete
        <Router>
          <Header themeMode={themeMode} onToggleTheme={toggleTheme} />
          <div className={themeMode}>
            <Routes>
              <Route path="/" element={<Calendar themeMode={themeMode} />} />
              <Route path="/event/:id" element={<EventDetails themeMode={themeMode} />} />
            </Routes>
          </div>
        </Router>
      )}
    </EventProvider>
  );
};

export default App;
