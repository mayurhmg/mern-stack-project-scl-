import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { BsPower, BsGraphUp, BsPeople, BsPerson, BsFileText, BsBook, BsGraphDown, BsCalendar, BsGear, BsChatDots, BsCalendarEvent } from 'react-icons/bs';
import '../../styles/Sidebar.css'; 
import logo from '../../assets/bg1.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear stored authentication data
    sessionStorage.clear();
    navigate('/'); // Redirect to Home Page
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="sidebar-logo" />
      </div>
      <div className="sidebar-header">Admin</div>
      <ul className="sidebar-nav">
        <li className="sidebar-nav-item">
          <BsGraphUp className="sidebar-icon" />
          <Link to="/admin/dashboard" className="sidebar-link">Dashboard</Link>
        </li>
        <li className="sidebar-nav-item">
          <BsPeople className="sidebar-icon" />
          <Link to="/admin/classes" className="sidebar-link">Classes</Link>
        </li>
        <li className="sidebar-nav-item">
          <BsPeople className="sidebar-icon" />
          <Link to="/admin/students" className="sidebar-link">Students</Link>
        </li>
        <li className="sidebar-nav-item">
          <BsPerson className="sidebar-icon" />
          <Link to="/admin/teachers" className="sidebar-link">Teachers</Link>
        </li>
      {/*   <li className="sidebar-nav-item">
          <BsFileText className="sidebar-icon" />
          <Link to="/admin/assignments" className="sidebar-link">Assignments</Link>
        </li> */}
        <li className="sidebar-nav-item">
          <BsBook className="sidebar-icon" />
          <Link to="/admin/exams" className="sidebar-link">Exams</Link>
        </li>
       {/*  <li className="sidebar-nav-item">
          <BsGraphDown className="sidebar-icon" />
          <Link to="/admin/performance" className="sidebar-link">Performance</Link>
        </li> */}
        <li className="sidebar-nav-item">
          <BsCalendar className="sidebar-icon" />
          <Link to="/admin/attendance" className="sidebar-link">Attendance</Link>
        </li>
        <li className="sidebar-nav-item">
          <BsBook className="sidebar-icon" />
          <Link to="/admin/library" className="sidebar-link">Library</Link>
        </li>
       {/*  <li className="sidebar-nav-item">
          <BsChatDots className="sidebar-icon" />
          <Link to="/admin/communication" className="sidebar-link">Announcement</Link>
        </li> */}
       {/*  <li className="sidebar-nav-item">
          <BsCalendarEvent className="sidebar-icon" />
          <Link to="/admin/events" className="sidebar-link">Events & Calendar</Link>
        </li> */}
        <li className="sidebar-nav-item">
          <BsGear className="sidebar-icon" />
          <Link to="/admin/settings" className="sidebar-link">Settings & Profile</Link>
        </li>
      </ul>
      
      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        <BsPower className="sidebar-icon" /> Logout
      </button>

      {/* Toggle Sidebar Button */}
   {/*    <div className="toggle-button" onClick={toggleSidebar}>
        <span className="toggle-icon">{isOpen ? '▲' : '▼'}</span>
      </div> */}
    </div>
  );
};

export default Sidebar;
