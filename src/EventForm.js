import React, { useState } from 'react';

function EventForm({ addEvent }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { title, date, startTime, endTime };
    addEvent(newEvent);
    setTitle('');
    setDate('');
    setStartTime('');
    setEndTime('');
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />
      <input
      type="time"
      value={endTime}
      onChange={(e) => setEndTime(e.target.value)}
      required
    />
      <button type="submit">Add Event</button>
    </form>
  );
}

export default EventForm;
