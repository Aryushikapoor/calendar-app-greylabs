import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useEvents from "../hooks/useEvents";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin: 10px 0 5px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 15px;
  border: none;
  background-color: #28a745;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
`;

const EventForm = ({ selectedDate, onClose, existingEvent }) => {
  const { addEvent, editEvent } = useEvents();

  const [title, setTitle] = useState(existingEvent ? existingEvent.title : "");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState(existingEvent ? existingEvent.hour : "12");
  const [minute, setMinute] = useState(
    existingEvent ? existingEvent.minute : "00"
  );
  const [ampm, setAmpm] = useState(existingEvent ? existingEvent.ampm : "AM");
  const [category, setCategory] = useState(
    existingEvent ? existingEvent.category : "Work"
  );
  const [description, setDescription] = useState(
    existingEvent ? existingEvent.description : ""
  );

  useEffect(() => {
    // Set the date from selectedDate if it's provided
    if (selectedDate) {
      const localDate = new Date(selectedDate);
      const utcDate = new Date(
        localDate.getTime() - localDate.getTimezoneOffset() * 60000
      );
      const formattedDate = utcDate.toISOString().split("T")[0];
      setDate(formattedDate);
    } else {
      // Set date to today if no date is provided
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      setDate(formattedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    // Set the current system time if no existing event is provided
    if (!existingEvent) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      setHour(currentHour % 12 === 0 ? 12 : currentHour % 12); // convert to 12-hour format
      setMinute(currentMinute.toString().padStart(2, "0"));
      setAmpm(currentHour >= 12 ? "PM" : "AM");
    }
  }, [existingEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert time to 24-hour format
    let formattedHour = parseInt(hour);
    if (ampm === "PM" && formattedHour !== 12) {
      formattedHour += 12;
    }
    if (ampm === "AM" && formattedHour === 12) {
      formattedHour = 0;
    }
    const time = `${formattedHour.toString().padStart(2, "0")}:${minute}`;

    const event = {
      id: existingEvent ? existingEvent.id : Date.now(),
      title,
      date,
      time,
      category,
      description,
    };

    if (existingEvent) {
      editEvent(existingEvent.id, event); // Edit existing event
      console.log("Event edited: ", event);
    } else {
      addEvent(event); // Add new event
      console.log("Event added: ", event);
    }
    onClose();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>Title</Label>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Label>Date</Label>
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <Label>Time</Label>
      <div style={{ display: "flex", gap: "10px" }}>
        <Select value={hour} onChange={(e) => setHour(e.target.value)} required>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={(i + 1).toString()}>
              {i + 1}
            </option>
          ))}
        </Select>
        :
        <Select
          value={minute}
          onChange={(e) => setMinute(e.target.value)}
          required
        >
          {Array.from({ length: 60 }, (_, i) => (
            <option key={i} value={i.toString().padStart(2, "0")}>
              {i.toString().padStart(2, "0")}
            </option>
          ))}
        </Select>
        <Select value={ampm} onChange={(e) => setAmpm(e.target.value)} required>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </Select>
      </div>

      <Label>Category</Label>
      <Select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Others">Others</option>
      </Select>

      <Label>Description</Label>
      <TextArea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="4"
      />

      <Button type="submit">
        {existingEvent ? "Update Event" : "Add Event"}
      </Button>
    </Form>
  );
};

export default EventForm;
