import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/Assignments.css'; // Link to CSS file

const Assignments = () => {
  const [newAssignment, setNewAssignment] = useState({ title: '', description: '', grade: '', deadline: '' });
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(' http://localhost:3000/api/v1/assignments/getall');
      setAssignments(response.data.assignments);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleAddAssignment = async (e) => {
    e.preventDefault();
    if (newAssignment.title && newAssignment.description && newAssignment.grade && newAssignment.deadline) {
      try {
        const response = await axios.post(' http://localhost:3000/api/v1/assignments', newAssignment);
        toast.success('Assignment added successfully');
        setAssignments([...assignments, response.data.assignment]);
        setNewAssignment({ title: '', description: '', grade: '', deadline: '' });
      } catch (error) {
        console.error('Error adding assignment:', error);
        toast.error('Error adding assignment');
      }
    }
  };

  return (
    <div className="assignments-container">
      <ToastContainer />
      <Sidebar />
      <div className="assignments-content">
        <h2>Assignments</h2>
        <form className="assignment-form" onSubmit={handleAddAssignment}>
          <input type="text" placeholder="Title" value={newAssignment.title} onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })} required />
          <textarea placeholder="Description" value={newAssignment.description} onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })} required />
          <input type="text" placeholder="Grade" value={newAssignment.grade} onChange={(e) => setNewAssignment({ ...newAssignment, grade: e.target.value })} required />
          <input type="date" value={newAssignment.deadline} onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })} required />
          <button type="submit">Add Assignment</button>
        </form>
        <ul className="assignment-list">
          {assignments.map((assignment) => (
            <li key={assignment.id} className="assignment-item">
              <strong>{assignment.title}:</strong> {assignment.description}, Grade: {assignment.grade}, Deadline: {assignment.deadline}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Assignments;
