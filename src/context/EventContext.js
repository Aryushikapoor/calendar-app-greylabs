import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const baseURL = "https://calendar-app-greylabs.free.beeceptor.com"; 

  const saveEventsToLocalStorage = (events) => {
    localStorage.setItem("events", JSON.stringify(events));
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // const response = await axios.get(`${baseURL}/events`);
      // const beeceptorEvents = response.data;

      // console.log("Fetched events from API:", beeceptorEvents);

      const storedEvents = localStorage.getItem("events");
      const existingEvents = storedEvents ? JSON.parse(storedEvents) : [];

      // const allEvents = [...existingEvents, ...beeceptorEvents];

      const uniqueEvents = Array.from(
        new Map(existingEvents.map((event) => [event.id, event])).values()
      );

      setEvents(uniqueEvents);
      saveEventsToLocalStorage(uniqueEvents);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setError("Failed to fetch events.");
      const storedEvents = localStorage.getItem("events");
      setEvents(storedEvents ? JSON.parse(storedEvents) : []);
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (event) => {
    try {
      // const response = await axios.post(`${baseURL}/events`, event);

      const newEvent = { ...event, id: Date.now() };
      setEvents((prevEvents) => {
        const updatedEvents = [...prevEvents, newEvent];
        saveEventsToLocalStorage(updatedEvents);
        return updatedEvents;
      });
    } catch (err) {
      console.error("Failed to add event:", err);
      setError("Failed to add event.");
    }
  };

  const editEvent = async (id, updatedEvent) => {
    try {
      // const response = await axios.put(`${baseURL}/events/${id}`, updatedEvent);
      // const modifiedEvent = response.data;
      setEvents((prevEvents) => {
        const updatedEvents = prevEvents.map((event) =>
          event.id === id ? { ...event, ...updatedEvent } : event
        );
        saveEventsToLocalStorage(updatedEvents);
        return updatedEvents;
      });
    } catch (err) {
      console.error("Failed to edit event:", err);
      setError("Failed to edit event.");
    }
  };

  const deleteEvent = async (id) => {
    try {
      // await axios.delete(`${baseURL}/events/${id}`);
      setEvents((prevEvents) => {
        const updatedEvents = prevEvents.filter((event) => event.id !== id);
        saveEventsToLocalStorage(updatedEvents);
        return updatedEvents;
      });
    } catch (err) {
      console.error("Failed to delete event:", err);
      setError("Failed to delete event.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{ events, loading, error, addEvent, editEvent, deleteEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};
