import React from 'react';

function Calendar({ events }) {
  const renderEvents = (day) => {
    const dayEvents = events.filter(event => new Date(event.date).getDate() === day);
    return dayEvents.map((event, index) => (
      <div key={index} className="event">
        <strong>{event.time}</strong>: {event.title}
      </div>
    ));
  };

  const daysInMonth = 30; // For simplicity, assuming 30 days in the month

  return (
    <div className="calendar">
      {Array.from({ length: daysInMonth }, (_, i) => (
        <div key={i} className="day">
          <h4>Day {i + 1}</h4>
          {renderEvents(i + 1)}
        </div>
      ))}
    </div>
  );
}

export default Calendar;
