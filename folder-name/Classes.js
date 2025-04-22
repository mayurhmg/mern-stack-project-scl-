import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import '../../styles/Classes.css'; // Import CSS file

const Classes = () => {
  const [newClassName, setNewClassName] = useState('');
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await axios.get(' http://localhost:3000/api/v1/class/getall');
      if (response.data && Array.isArray(response.data.classes)) {
        setClasses(response.data.classes);
      } else {
        console.error('Error fetching classes: Invalid data format', response.data);
      }
    } catch (error) {
      console.error('Error fetching classes:', error.message);
    }
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    if (newClassName.trim() !== '') {
      try {
        const response = await axios.post(' http://localhost:3000/api/v1/class', { grade: newClassName });
        setClasses((prevClasses) => [...prevClasses, response.data]);
        setNewClassName('');
      } catch (error) {
        console.error('Error adding class:', error);
      }
    }
  };

  return (
    <div className="classes-container">
      <Sidebar />
      <div className="content">
        <div className="classes-content">
          <h2 className="classes-header">Classes</h2>
          <form className="add-class-form" onSubmit={handleAddClass}>
            <input
              type="text"
              placeholder="Enter class name"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              className="add-class-input"
            />
            <button type="submit" className="add-class-button">Add Class</button>
          </form>
          <ul className="class-list">
            {Array.isArray(classes) && classes.map((classItem, index) => (
              <li key={index} className="class-item">{classItem.grade}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Classes;
