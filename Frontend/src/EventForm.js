import React, { useState } from 'react';

function EventForm({ addEvent }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isConflicting,setIsConflicting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { title, date, startTime, endTime };

    if(!isConflicting)
      addEvent(newEvent);

    setTitle('');
    setDate('');
    setStartTime('');
    setEndTime('');
  };

  function checkConflict()
  {
    // check the conflict of enent usin check-conflict api
    //console.log("yes")
    if(date!= null && startTime!=null && endTime!=null)
    {
      //console.log("yes")

     var data = {date,startTime,endTime} 
     console.log(data)

     //fetch()
    }

  }

  return (
    <form onSubmit={handleSubmit} onChange={checkConflict} className="event-form">
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
      {isConflicting ? <p style={{color:"red"}}>The Event has conflicts!!</p> : <></>}
      
    </form>
  );
}

export default EventForm;
