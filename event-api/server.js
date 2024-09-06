const express = require('express');

const app = express();
const port = 3001;

const cors = require('cors');
app.use(cors());

app.use(express.json());  //for parsing json request

let events =[];

function checkConflict(date, startTime, endTime){
    const isConflicting = events.some(event =>{
        return event.date === date && (
            (startTime >= event.startTime && startTime < event.endTime) ||
            (endTime > event.startTime && endTime <= event.endTime) ||
            (startTime <= event.startTime && endTime >= event.endTime)
        );
    });
    return isConflicting
}

//Create event 
app.post('/events', (req, res) =>{
    const{title, description, date, startTime, endTime} = req.body;

    if(!title || !date || !startTime || !endTime){
        return res.json({"success":false, "message": "Missing required field"});
    }
    const newEvent = {
        id: events.length + 1,
        title,
        description,
        date,
        startTime,
        endTime,
    };

    const isConflicting = checkConflict(date, startTime, endTime)

    if(isConflicting)
    {
        return res.json({ "success":true, "message": 'Event conflicts with an existing event'});
    }
    events.push(newEvent);
    res.status(201).json(newEvent);
});

// read all events
app.get('/events',(req, res) =>{
    res.json(events);
})

//read single event
app.get('/events/:id', (req, res)=>{
    const eventId = parseInt(req.params.id);
    const event = events.find(ev => ev.id === eventId);

    if(!event) {
        return res.json({"success":false, "message": 'Event not found'});
    }
    res.json(event);
});

//update event 
app.put('events/:id',(req,res)=>{
    const eventId = parseInt(req.params.id);
    const eventIndex = events.findIndex(ev => ev.id === eventId);

    if(eventIndex === -1){
        return res.json({"success":false, "message": 'Event not found'});
    }

    const {title, description, date, startTime, endTime} = req.body;
    const updateEvent = {
        ...events[eventIndex],
        title : title || events[eventIndex].title,
        description : description || events[eventIndex].description,
        date: date || events[eventIndex].date,
        startTime: startTime || events[eventIndex].startTime,
        endTime: endTime || events[eventIndex].endTime
    };
    events[eventIndex] = updateEvent;
    res.json(updateEvent);
});

//delete event
app.delete('/events/:id', (req, res) => {
    const eventId= parseInt(req.params.id);
    const eventIndex = events.findIndex(ev => ev.id === eventId);

    if(eventIndex === -1){
        return res.json({ "success":false, "message":'Event not found'});
    }
    events.splice(eventIndex, 1);
    res.status(204).send();
});

// check if an event conflicts with existing events 
app.post('/events/check-conflict', (req,res)=>{
    const {date, startTime, endTime}= req.body;

    if(!date || !startTime || !endTime){
        return res.json({"success":false, "message": 'missing required field'});
    }
    const isConflicting = checkConflict(date, startTime, endTime)

    res.json({isConflicting});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});