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
