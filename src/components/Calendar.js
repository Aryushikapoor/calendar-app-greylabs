import React, { useState } from "react";
import styled from "styled-components";
import useEvents from "../hooks/useEvents";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import EventForm from "./EventForm";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Loader from "./Loader";

const CalendarContainer = styled.div`
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: ${({ themeMode }) =>
    themeMode === "dark" ? "#333" : "#fff"};
  color: ${({ themeMode }) => (themeMode === "dark" ? "white" : "black")};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 10px;
    border-radius: 8px;
  }

  @media (max-width: 500px) {
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
  }
`;

const FloatingButton = styled(Fab)`
  position: fixed;
  top: 5px;
  left: 5px;
  background-color: #ffff00 !important;
  &:hover {
    background-color: #ffcc00 !important;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 1.6rem;
    color: ${({ themeMode }) => (themeMode === "dark" ? "white" : "#333")};
    font-family: "Rowdies", cursive;

    @media (max-width: 500px) {
      font-size: 1.2rem;
    }
  }

  select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    cursor: pointer;

    @media (max-width: 500px) {
      font-size: 0.8rem;
    }
  }
`;

const CenteredHeading = styled.div`
  flex: 1;
  text-align: center;

  @media (max-width: 500px) {
    margin-bottom: 10px;
  }
`;

const Button = styled.button`
  padding: 8px 12px;
  margin: 5px;
  border: none;
  border: 1px solid #ffd700;
  background-color: #ffff00;
  color: black;
  border-radius: 4px;

  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffcc00;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px;
  }
  @media (max-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 5px;
  }
  @media (max-width: 200px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 5px;
  }
`;

const Day = styled.div`
  padding: 10px;
  background-color: ${({ isCurrentMonth, themeMode }) =>
    isCurrentMonth
      ? themeMode === "dark"
        ? "#444"
        : "#f9f9f9"
      : "transparent"};
  border: 1px solid
    ${({ themeMode }) => (themeMode === "dark" ? "#555" : "#ccc")};
  border-radius: 5px;
  min-height: 120px;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ themeMode }) =>
      themeMode === "dark" ? "#555" : "#e6e6e6"};
  }

  ${(props) =>
    props.hasEvent &&
    `
 
       background-color: ${({ themeMode }) =>
         themeMode === "dark" ? "white" : "black"};
    `}
`;

const EventBadge = styled.span`
  display: block;
  background-color: ${({ color }) => color || "#28a745"};
  color: #fff;
  padding: 7px 6px;
  border-radius: 3px;
  font-size: 0.9rem;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Roboto", sans-serif;
  a {
    text-decoration: none; /* Remove underline */
  }
`;

const ExtraEvents = styled.div`
  font-size: 0.75rem;
  color: #1b72e8;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 3px;
  margin-top: 5px;
  text-align: center;
`;

const Calendar = ({ themeMode }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { events, loading, error, addEvent } = useEvents();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const generateCalendar = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);

    for (let i = 0; i < firstDay; i++) {
      days.push(<Day key={`empty-${i}`} isCurrentMonth={false}></Day>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        const isSameDate = eventDate.toDateString() === date.toDateString();
        const isSelectedCategory =
          selectedCategory === "All" || event.category === selectedCategory;
        return isSameDate && isSelectedCategory;
      });

      const sortedDayEvents = dayEvents.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      const visibleEvents = sortedDayEvents.slice(0, 2);
      const additionalEventCount =
        sortedDayEvents.length - visibleEvents.length;

      days.push(
        <Day
          key={day}
          isCurrentMonth={true}
          hasEvent={dayEvents.length > 0}
          onClick={() => handleDayClick(date)}
          themeMode={themeMode}
        >
          <span>{day}</span>
          {visibleEvents.map((event) => (
            <Link
              to={`/event/${event.id}`}
              key={event.id}
              style={{ textDecoration: "none" }}
            >
              <EventBadge color={getEventColor(event.category)}>
                {event.title}
              </EventBadge>
            </Link>
          ))}
          {additionalEventCount > 0 && (
            <ExtraEvents>+{additionalEventCount} more</ExtraEvents>
          )}
        </Day>
      );
    }
    return days;
  };

  const getEventColor = (category) => {
    switch (category) {
      case "Work":
        return "#039be5";
      case "Personal":
        return "#32b579";
      case "Others":
        return "#4284f3";
      default:
        return "#17a2b8";
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleDayClick = (date) => {
    console.log("Clicked Date: ", date);
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    console.log("Normalized Date: ", normalizedDate);
    setSelectedDate(normalizedDate);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDate(null);
  };

  const handleAddEvent = (event) => {
    addEvent(event);
    closeModal();
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <CalendarContainer themeMode={themeMode}>
      <Header themeMode={themeMode}>
        <Button className="button" onClick={prevMonth}>
          Previous
        </Button>
        <CenteredHeading>
          <h2>
            {months[currentMonth]} {currentYear}
          </h2>
        </CenteredHeading>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Others">Others</option>
        </select>
        <Button className="button" onClick={nextMonth}>
          Next
        </Button>
      </Header>

      {loading ? <Loader /> : <Grid>{generateCalendar()}</Grid>}

      <FloatingButton onClick={() => setShowModal(true)}>
        <AddIcon />
      </FloatingButton>

      {showModal && (
        <Modal onClose={closeModal}>
          <EventForm
            selectedDate={selectedDate}
            onClose={closeModal}
            onSubmit={handleAddEvent}
            themeMode={themeMode}
          />
        </Modal>
      )}
    </CalendarContainer>
  );
};

export default Calendar;
