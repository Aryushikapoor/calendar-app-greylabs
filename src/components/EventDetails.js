import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useEvents from "../hooks/useEvents";
import Modal from "./Modal";
import EventForm from "./EventForm";

const DetailsContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;

  h2,
  p {
    color: black; /* Set header and paragraph text to black */
  }
`;

const Button = styled.button`
  padding: 8px 12px;
  margin-right: 10px;
  border: none;
  background-color: #007bff;
  color: white; /* Keep button text color white */
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;

const EventList = styled.div`
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 10px;

  h3 {
    margin-bottom: 10px;
    color: black; /* Set section header color to black */
  }
`;

const EventItem = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;

  h4,
  p {
    color: black; /* Set item title and description color to black */
  }
`;

const EventDetails = () => {
  const { id } = useParams();
  const { events, deleteEvent } = useEvents();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const event = events.find((event) => event.id === parseInt(id));

  if (!event) {
    return <p style={{ color: "black" }}>Event not found!</p>; // Set color to black for not found message
  }

  const selectedDate = new Date(event.date).toDateString();

  const eventsForTheDay = events.filter((evt) => {
    const eventDate = new Date(evt.date).toDateString();
    return eventDate === selectedDate && evt.id !== event.id;
  });

  const handleDelete = (eventId) => {
    deleteEvent(eventId);
    if (eventId === event.id) {
      navigate("/");
    }
  };

  const handleEditClick = (evt) => {
    setCurrentEvent(evt);
    setShowEditModal(true);
  };

  return (
    <DetailsContainer>
      <h2>{event.title}</h2>
      <p>Date: {event.date}</p>
      <p>Time: {event.time}</p>
      <p>Category: {event.category}</p>
      <p>Description: {event.description}</p>

      <Button onClick={() => handleEditClick(event)}>Edit</Button>
      <Button
        onClick={() => handleDelete(event.id)}
        style={{ backgroundColor: "red" }}
      >
        Delete
      </Button>

      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EventForm
            selectedDate={new Date(currentEvent?.date)}
            existingEvent={currentEvent}
            onClose={() => {
              setShowEditModal(false);
              setCurrentEvent(null);
            }}
          />
        </Modal>
      )}

      <EventList>
        <h3>Other Events on {selectedDate}:</h3>
        {eventsForTheDay.map((evt) => (
          <EventItem key={evt.id}>
            <h4>{evt.title}</h4>
            <p>{evt.time}</p>
            <p>{evt.category}</p>
            <p>{evt.description}</p>
            <Button onClick={() => handleEditClick(evt)}>Edit</Button>
            <Button
              onClick={() => handleDelete(evt.id)}
              style={{ backgroundColor: "red" }}
            >
              Delete
            </Button>
          </EventItem>
        ))}
      </EventList>
    </DetailsContainer>
  );
};

export default EventDetails;
