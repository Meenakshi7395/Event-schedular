const express = require('express');
const app = express();
const port = 3001;

app.use(express.json()); // For parsing JSON requests

// In-memory events array
let events = [];

function checkConflict(date,startTime,endTime)
{
    const isConflicting = events.some(event => {
        return event.date === date && (
          (startTime >= event.startTime && startTime < event.endTime) || 
          (endTime > event.startTime && endTime <= event.endTime) ||
          (startTime <= event.startTime && endTime >= event.endTime)
        );
      });
return isConflicting
}

// Create Event (POST /events)
app.post('/events', (req, res) => {
  const { title, description, date, startTime, endTime } = req.body;
  
  if (!title || !date || !startTime || !endTime) {
    return res.json({ success:false,message: 'Missing required fields' });
  }
  
  const newEvent = {
    id: events.length + 1,
    title,
    description,
    date,
    startTime,
    endTime
  };

  const isConflicting = checkConflict(date,startTime,endTime)
  
  if(isConflicting)
  {
    return res.json({success:false, message: 'Event conflicts with an existing event' });
  }

  events.push(newEvent);
  res.json({success:true, message: 'Event created successfully',newEvent: newEvent});
});

// Read All Events (GET /events)
app.get('/events', (req, res) => {
  res.json({success:true, message: 'Event list',events:events});
});

// Get Events by Date (GET /events/by-date/:date)
app.get('/events/by-date/:date', (req, res) => {
  const { date } = req.params;

  // Filter events based on the provided date
  const eventsOnDate = events.filter(event => event.date === date);

  if (eventsOnDate.length === 0) {
    return res.json({ success:false, message: 'No events found on this date' });
  }

  res.json({success:true, message: 'Events Found',events: eventsOnDate});
});

// Read Single Event (GET /events/:id)
app.get('/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const event = events.find(ev => ev.id === eventId);
  
  if (!event) {
    return res.json({ success:false, message: 'Event not found' });
  }

  res.json({success:true,message:"Event Found",event:event});
});

// Update Event (PUT /events/:id)
app.put('/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const eventIndex = events.findIndex(ev => ev.id === eventId);

  if (eventIndex === -1) {
    return res.json({ success:false,message: 'Event not found' });
  }

  const { title, description, date, startTime, endTime } = req.body;
  const updatedEvent = {
    ...events[eventIndex],
    title: title || events[eventIndex].title,
    description: description || events[eventIndex].description,
    date: date || events[eventIndex].date,
    startTime: startTime || events[eventIndex].startTime,
    endTime: endTime || events[eventIndex].endTime
  };

  events[eventIndex] = updatedEvent;
  res.json({ success:false,message: 'Event not found',updatedEvent:updatedEvent});
});

// Delete Event (DELETE /events/:id)
app.delete('/events/:id', (req, res) => {
  const eventId = parseInt(req.params.id);
  const eventIndex = events.findIndex(ev => ev.id === eventId);

  if (eventIndex === -1) {
    return res.json({ success:false,message: 'Event not found' });
  }

  events.splice(eventIndex, 1);
  res.json({ success:true,message: 'Event Deleted' });
});


// Check if an event conflicts with existing events (POST /events/check-conflict)
app.post('/events/check-conflict', (req, res) => {
    const { date, startTime, endTime } = req.body;
  
    if (!date || !startTime || !endTime) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  
    const isConflicting = checkConflict(date,startTime,endTime)
  
    res.json({ isConflicting});
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
