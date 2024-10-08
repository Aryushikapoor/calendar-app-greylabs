// src/components/Filter.js
import React, { useState } from 'react';
import styled from 'styled-components';
import useEvents from '../hooks/useEvents';

const Select = styled.select`
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ccc;
`;

const Filter = () => {
    const [category, setCategory] = useState('All');
    const { fetchEvents } = useEvents();

    const handleFilterChange = (e) => {
        setCategory(e.target.value);
        // Implement filtering logic based on category
        // Since we're using a mock API, filtering can be done client-side
        // Alternatively, set up different endpoints in Beeceptor for categories
    };

    return (
        <Select value={category} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Others">Others</option>
        </Select>
    );
};

export default Filter;
