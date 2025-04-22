import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import '../../styles/Teachers.css'; // Import CSS file

const Teachers = () => {
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', subject: '' });
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(' http://localhost:3000/api/v1/teachers/getall');
      setTeachers(response.data.teachers || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      setError('Failed to fetch teachers');
    }
    setLoading(false);
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    if (!newTeacher.name || !newTeacher.email || !newTeacher.subject) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post(' http://localhost:3000/api/v1/teachers', newTeacher);
      setTeachers([...teachers, response.data.teacher]);
      setNewTeacher({ name: '', email: '', subject: '' });
      setError(null);
    } catch (error) {
      console.error('Error adding teacher:', error);
      setError(error.response?.data?.message || 'Failed to add teacher');
    }
  };

  return (
    <div className="teachers-container">
      <Sidebar />
      <div className="teachers-content">
        <h2>Teachers</h2>

        {loading && <p className="loading-text">Loading teachers...</p>}
        {error && <p className="error-text">{error}</p>}

        <form className="add-teacher-form" onSubmit={handleAddTeacher}>
          <input
            type="text"
            placeholder="Enter teacher name"
            value={newTeacher.name}
            onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Enter teacher email"
            value={newTeacher.email}
            onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter teacher subject"
            value={newTeacher.subject}
            onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
          />
          <button type="submit">Add Teacher</button>
        </form>

        <ul className="teacher-list">
          {teachers.length > 0 ? (
            teachers.map((teacher) => (
              <li key={teacher.id}>
                {teacher.name} - {teacher.email} - {teacher.subject}
              </li>
            ))
          ) : (
            !loading && <li className="no-teachers">No teachers available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Teachers;
