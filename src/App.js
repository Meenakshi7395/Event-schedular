import React, { useState } from 'react';
import Calendar from './Calendar';
import EventForm from './EventForm';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  return (
    <div className="App">
      <h1>Simple Calendar</h1>
      <EventForm addEvent={addEvent} />
      <Calendar events={events} />
    </div>
  );
}

export default App;
