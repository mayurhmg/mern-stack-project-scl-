import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import EventCalendar from './EventCalendar';
import Announcement from './Announcement';
import Performance from './Performance';
import '../../styles/Dashboard.css';


const AdminDashboard = () => {
    const [isOpen] = useState(false);
    const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [studentPerformance, setStudentPerformance] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchAnnouncements();
    fetchStudentPerformance();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(' http://localhost:3000/api/v1/events/getall');
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(' http://localhost:3000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const fetchStudentPerformance = async () => {
    try {
      const response = await axios.get(' http://localhost:3000/api/v1/performance/getall');
      setStudentPerformance(response.data.performance || []);
    } catch (error) {
      console.error('Error fetching student performance:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className={`dashboard-content ${isOpen ? 'open' : ''}`}>
        <div className="top-content">
          <div className="section">
            <h2>Overview</h2>
            <div className="card-container">
              <div className="card">
                <h3>Total Students</h3>
                <p>500</p>
              </div>
              <div className="card">
                <h3>Total Teachers</h3>
                <p>50</p>
              </div>
              <div className="card">
                <h3>Total Classes</h3>
                <p>50</p>
              </div>
            </div>
          </div>

          <div className="section">
{/*             <EventCalendar events={events} />
 */}          </div>
        </div>

        <div className="bottom-content">
         {/*  <Performance studentPerformance={studentPerformance} />
          <Announcement announcements={announcements} /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
