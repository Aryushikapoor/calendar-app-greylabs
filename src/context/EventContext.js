// import React, { createContext, useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
// import axios from "axios";

// export const EventContext = createContext();

// export const EventProvider = ({ children }) => {
//   const [events, setEvents] = useState([]); // Initialize as empty array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const baseURL = "https://calender.free.beeceptor.com"; // Your Beeceptor base URL

//   // Load events from AsyncStorage
//   const loadEvents = async () => {
//     try {
//       const storedEvents = await AsyncStorage.getItem("events"); // Retrieve events from AsyncStorage
//       if (storedEvents) {
//         setEvents(JSON.parse(storedEvents)); // Parse and set events
//       }
//     } catch (err) {
//       console.error("Failed to load events:", err);
//     }
//   };

//   // Save events to AsyncStorage
//   const saveEvents = async (events) => {
//     try {
//       await AsyncStorage.setItem("events", JSON.stringify(events)); // Save events as a string
//     } catch (err) {
//       console.error("Failed to save events:", err);
//     }
//   };

//   // Fetch events from the API
//   const fetchEvents = async () => {
//     setLoading(true);
//     try {
//       // Uncomment the following line to use the API
//       // const response = await axios.get(`${baseURL}/`);
//       const dummyEvents = [
//         {
//           id: 1,
//           title: "Meeting with John",
//           date: "2024-10-08",
//           time: "10:00 AM",
//           category: "Work",
//           description: "Discussing the Q3 project goals and milestones.",
//         },
//         {
//           id: 2,
//           title: "Lunch with Sarah",
//           date: "2024-10-09",
//           time: "1:00 PM",
//           category: "Personal",
//           description: "Lunch at the new cafe downtown.",
//         },
//         {
//           id: 3,
//           title: "Project Deadline",
//           date: "2024-10-12",
//           time: "11:59 PM",
//           category: "Work",
//           description: "Final submission of the project deliverables.",
//         },
//       ];
//       setEvents(dummyEvents); // Set events with dummy data
//       await saveEvents(dummyEvents); // Save events to AsyncStorage
//     } catch (err) {
//       setError("Failed to fetch events.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add a new event (POST)
//   const addEvent = async (event) => {
//     const newEvent = { ...event, id: Date.now() }; // Create new event with a unique ID
//     try {
//       // Uncomment the following line to use the API
//       // const response = await axios.post(`${baseURL}/`, newEvent);
//       setEvents((prevEvents) => {
//         const updatedEvents = [...prevEvents, newEvent]; // Append new event
//         saveEvents(updatedEvents); // Save updated events to AsyncStorage
//         return updatedEvents;
//       });
//     } catch (err) {
//       setError("Failed to add event.");
//       console.error(err);
//     }
//   };

//   // Edit an existing event (PUT)
//   const editEvent = async (id, updatedEvent) => {
//     try {
//       // Uncomment the following line to use the API
//       // const response = await axios.put(`${baseURL}/${id}`, updatedEvent);
//       setEvents((prevEvents) => {
//         const updatedEvents = prevEvents.map((event) =>
//           event.id === id ? { ...event, ...updatedEvent } : event
//         );
//         saveEvents(updatedEvents); // Save updated events to AsyncStorage
//         return updatedEvents;
//       });
//     } catch (err) {
//       setError("Failed to edit event.");
//       console.error(err);
//     }
//   };

//   // Delete an event (DELETE)
//   const deleteEvent = async (id) => {
//     try {
//       // Uncomment the following line to use the API
//       // await axios.delete(`${baseURL}/${id}`);
//       setEvents((prevEvents) => {
//         const updatedEvents = prevEvents.filter((event) => event.id !== id);
//         saveEvents(updatedEvents); // Save updated events to AsyncStorage
//         return updatedEvents;
//       });
//     } catch (err) {
//       setError("Failed to delete event.");
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     loadEvents(); // Load events from AsyncStorage on mount
//     fetchEvents(); // Fetch events from API
//   }, []);

//   return (
//     <EventContext.Provider
//       value={{ events, loading, error, addEvent, editEvent, deleteEvent }}
//     >
//       {children}
//     </EventContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = "https://calender.free.beeceptor.com"; // Your Beeceptor base URL

  // Load events from local storage
  const loadEventsFromLocalStorage = () => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  };

  // Save events to local storage
  const saveEventsToLocalStorage = (events) => {
    localStorage.setItem("events", JSON.stringify(events));
  };

  // Fetch events from the API
  const fetchEvents = async () => {
    setLoading(true);
    try {
      // Uncomment the following line to use the API
      // const response = await axios.get(`${baseURL}/`);
      loadEventsFromLocalStorage(); // Load events from local storage
    } catch (err) {
      setError("Failed to fetch events.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new event (POST)
  const addEvent = (event) => {
    const newEvent = { ...event, id: Date.now() };
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, newEvent];
      saveEventsToLocalStorage(updatedEvents); // Save to local storage
      return updatedEvents;
    });
  };

  // Edit an existing event (PUT)
  const editEvent = (id, updatedEvent) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.map((event) =>
        event.id === id ? { ...event, ...updatedEvent } : event
      );
      saveEventsToLocalStorage(updatedEvents); // Save to local storage
      return updatedEvents;
    });
  };

  // Delete an event (DELETE)
  const deleteEvent = (id) => {
    setEvents((prevEvents) => {
      const updatedEvents = prevEvents.filter((event) => event.id !== id);
      saveEventsToLocalStorage(updatedEvents); // Save to local storage
      return updatedEvents;
    });
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
