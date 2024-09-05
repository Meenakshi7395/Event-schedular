import React from 'react';

function EventsList({ events }) {
  if (events.length === 0) {
    return <p>No events for this day.</p>;
  }

  return (
    <ul>
      {events.map((event, index) => (
        <li key={index}>
          <strong>{event.time}</strong>: {event.title}
        </li>
      ))}
    </ul>
  );
}

export default EventsList;
