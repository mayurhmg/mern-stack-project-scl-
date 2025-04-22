import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import '../../styles/EventCalendar.css'; // Import CSS

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const [error, setError] = useState(null);

  // Function to fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get(' http://localhost:3000/api/v1/events/getall');
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Error fetching events');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Function to add a new event
  const addEvent = async (e) => {
    e.preventDefault();
    if (newEvent.trim() === '') {
      setError('Event name cannot be empty');
      return;
    }
    try {
      const response = await axios.post(' http://localhost:3000/api/v1/events', { event: newEvent });
      setEvents([...events, response.data.event]);
      setNewEvent('');
      setError(null);
    } catch (error) {
      console.error('Error adding event:', error);
      setError(error.response?.data?.error || 'Error adding event');
    }
  };

  return (
    <div className="event-calendar-container">
      <Sidebar />
      <div className="event-content">
        <h1>Events & Calendar</h1>
        <div className="current-time">Current Time: {new Date().toLocaleString()}</div>
        <div className="calendar-container">📅 Calendar Placeholder</div>

        {/* Event Form */}
        <form className="add-event-form" onSubmit={addEvent}>
          <h2>Add New Event</h2>
          <input
            type="text"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            placeholder="Enter Event"
            className="event-input"
          />
          <button type="submit" className="add-event-button">Add Event</button>
        </form>

        {error && <p className="error-text">{error}</p>}

        {/* Display Events */}
        <div className="events">
          <h2>Upcoming Events</h2>
          {events.length > 0 ? (
            <ul className="event-list">
              {events.map((event, index) => (
                <li key={index} className="event-item">{event}</li>
              ))}
            </ul>
          ) : (
            <p>No events available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
