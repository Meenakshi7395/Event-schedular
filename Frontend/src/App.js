import React, { useState, useEffect } from 'react';
import { Routes,Route } from 'react-router';
import Calendar from './Calendar.js';
import EventForm from './EventForm.js';
import EventsList from './EventsList.js';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    // Fetch events from the backend
    fetch('http://localhost:3001/events',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }

    )
    .then(response => response.json())
      .then(data => {

        if(data.success)
        {
          setEvents(data.events)
        }
       console.log('Success:',);
      }
        )
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const addEvent = (event) => {
    //setEvents([...events, event]);

    // send to backend
    fetch('http://localhost:3001/events',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(event),
    }

    )
    .then(response => response.json())
      .then(data => {

        if(data.success)
        {
          console.log('Success:',data);
          setEvents([...events, data.newEvent]);
        }
      
      }
        )
      .catch(error => console.error('Error fetching events:', error));

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
