// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import
import { EventProvider } from './context/EventContext';
import Calendar from './components/Calendar';
import EventDetails from './components/EventDetails';
import Header from './components/Header';
import './App.css';

const App = () => {
    return (
        <EventProvider>
            <Router>
                <Header />
                <Routes> {/* Replaced Switch with Routes */}
                    <Route path="/" element={<Calendar />} /> {/* Updated Route syntax */}
                    <Route path="/event/:id" element={<EventDetails />} /> {/* Updated Route syntax */}
                </Routes>
            </Router>
        </EventProvider>
    );
};

export default App;
