import React, { useState, useEffect } from 'react';
import { Routes,Route } from 'react-router';
import Calendar from './Calendar';
import EventForm from './EventForm';
import EventsList from './EventsList.js';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    // Fetch events from the backend
    fetch('http://localhost:3001/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const addEvent = (event) => {
    setEvents([...events, event]);

    // send to backend

  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const eventsForSelectedDay = events.filter(
    (event) => new Date(event.date).getDate() === selectedDay
  );



  return (
    <div className="App">
      <h1>Simple Calendar</h1>
      <EventForm addEvent={addEvent} />
      <Calendar events={events} onDayClick={handleDayClick} />
      {selectedDay && (
        <div>
          <h2>Events for Day {selectedDay}</h2>
          <EventsList events={eventsForSelectedDay} />
        </div>
      )}
    </div>
  );
}

export default App;
