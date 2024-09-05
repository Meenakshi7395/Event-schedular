import React, { useState } from 'react';
import Calendar from './Calendar';
import EventForm from './EventForm';
import EventsList from './EventsList';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  const addEvent = (event) => {
    setEvents([...events, event]);
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
