import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/Announcement.css';

const Announcement = () => {
  // State for managing announcements
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([]);

  // Function to fetch announcements
  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(' http://localhost:3000/api/v1/announcements/getall');
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(' http://localhost:3000/api/v1/announcements', {
        announcement: announcement,
      });
      console.log('Announcement sent:', response.data);
      toast.success('Announcement sent successfully');
      setAnnouncement('');
      fetchAnnouncements();
    } catch (error) {
      console.error('Error sending announcement:', error);
      toast.error('Error sending announcement');
    }
  };

  return (
    <div className="announcement-container">
      <ToastContainer />
      <Sidebar />
      <div className="content">
        <h2 className="title">Announcement</h2>
        
        {/* Announcement Form */}
        <form className="announcement-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="announcement">Announcement:</label>
            <textarea
              id="announcement"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              required
              rows={4}
              cols={50}
              className="text-area"
            />
          </div>
          <button type="submit" className="submit-button">Send Announcement</button>
        </form>

        {/* Display Announcements */}
        <h2>Announcements</h2>
        <ul className="announcement-list">
          {announcements.map((announcement) => (
            <li key={announcement._id} className="announcement-item">
              <p className="announcement-content">{announcement.announcement}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Announcement;
