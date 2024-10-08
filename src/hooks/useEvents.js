import { useContext } from "react";
import { EventContext } from "../context/EventContext";

const useEvents = () => {
  const { events, loading, error, addEvent, editEvent, deleteEvent } =
    useContext(EventContext);

  return { events, loading, error, addEvent, editEvent, deleteEvent };
};

export default useEvents;
