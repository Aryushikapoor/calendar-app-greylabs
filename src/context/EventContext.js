import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = "https://calendar-app-greylabs.free.beeceptor.com"; // Your Beeceptor base URL

  // Save events to local storage
  const saveEventsToLocalStorage = (events) => {
    localStorage.setItem("events", JSON.stringify(events));
  };

  // Fetch events from the API
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/events`);
      const beeceptorEvents = response.data; // Adjust based on your API response structure

      console.log("Fetched events from API:", beeceptorEvents); // Log fetched events

      // Load existing events from local storage
      const storedEvents = localStorage.getItem("events");
      const existingEvents = storedEvents ? JSON.parse(storedEvents) : [];

      // Combine existing events with fetched events
      const allEvents = [...existingEvents, ...beeceptorEvents];

      // Remove duplicates based on event id (assuming id is unique)
      const uniqueEvents = Array.from(
        new Map(allEvents.map((event) => [event.id, event])).values()
      );

      // Update state and local storage
      setEvents(uniqueEvents);
      saveEventsToLocalStorage(uniqueEvents);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setError("Failed to fetch events.");
      const storedEvents = localStorage.getItem("events");
      setEvents(storedEvents ? JSON.parse(storedEvents) : []); // Fallback to local storage
    } finally {
      setLoading(false);
    }
  };

  // Add a new event (POST)
  const addEvent = async (event) => {
    try {
      const response = await axios.post(`${baseURL}/events`, event);
      // const newEvent = response.data; // Adjust based on your API response structure
      const newEvent = { ...event, id: Date.now() };
      setEvents((prevEvents) => {
        const updatedEvents = [...prevEvents, newEvent];
        saveEventsToLocalStorage(updatedEvents); // Save to local storage
        return updatedEvents;
      });
    } catch (err) {
      console.error("Failed to add event:", err);
      setError("Failed to add event.");
    }
  };

  // Edit an existing event (PUT)
  const editEvent = async (id, updatedEvent) => {
    try {
      const response = await axios.put(`${baseURL}/events/${id}`, updatedEvent);
      const modifiedEvent = response.data; // Adjust based on your API response structure
      setEvents((prevEvents) => {
        const updatedEvents = prevEvents.map((event) =>
          event.id === id ? { ...event, ...updatedEvent } : event
        );
        saveEventsToLocalStorage(updatedEvents); // Save to local storage
        return updatedEvents;
      });
    } catch (err) {
      console.error("Failed to edit event:", err);
      setError("Failed to edit event.");
    }
  };

  // Delete an event (DELETE)
  const deleteEvent = async (id) => {
    try {
      await axios.delete(`${baseURL}/events/${id}`);
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
