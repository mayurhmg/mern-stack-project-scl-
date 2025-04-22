import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import '../../styles/Students.css'; // Import CSS

const Students = () => {
  const [newStudent, setNewStudent] = useState({ name: '', registrationNumber: '', grade: '' });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingApprovals, setPendingApprovals] = useState(
    JSON.parse(localStorage.getItem("pendingApprovals") || "[]")
  );

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(' http://localhost:3000/api/v1/students/getall');
      setStudents(response.data.students || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to fetch students');
    }
    setLoading(false);
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.registrationNumber || !newStudent.grade) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post(' http://localhost:3000/api/v1/students', newStudent);
      setStudents([...students, response.data.student]);
      setNewStudent({ name: '', registrationNumber: '', grade: '' });
      setError(null);
    } catch (error) {
      console.error('Error adding student:', error);
      setError(error.response?.data?.message || 'Failed to add student');
    }
  };

  const handleApprove = (username) => {
    localStorage.setItem(`${username}_approved`, "true");
    const updatedApprovals = pendingApprovals.filter((user) => user.username !== username);
    localStorage.setItem("pendingApprovals", JSON.stringify(updatedApprovals));
    setPendingApprovals(updatedApprovals);
    alert(`${username} approved successfully!`);
  };

  return (
    <div className="students-container">
      <Sidebar />
      <div className="students-content">
        <h2>Admin Dashboard</h2>
        {loading && <p className="loading-text">Loading...</p>}
        {error && <p className="error-text">{error}</p>}

        {/* Add Student Form */}
        <h3>Manage Students</h3>
        <form className="add-student-form" onSubmit={handleAddStudent}>
          <input
            type="text"
            placeholder="Enter student name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter registration number"
            value={newStudent.registrationNumber}
            onChange={(e) => setNewStudent({ ...newStudent, registrationNumber: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter grade"
            value={newStudent.grade}
            onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
          />
          <button type="submit">Add Student</button>
        </form>

        <ul className="student-list">
          {students.length > 0 ? (
            students.map((student) => (
              <li key={student.id}>
                {student.name} - {student.registrationNumber} - {student.grade}
              </li>
            ))
          ) : (
            !loading && <li className="no-students">No students available</li>
          )}
        </ul>

        {/* Pending Approvals Section */}
        <h3>Pending Approvals</h3>
        {pendingApprovals.length === 0 ? (
          <p>No pending approvals.</p>
        ) : (
          <ul className="approval-list">
            {pendingApprovals.map((user) => (
              <li key={user.username}>
                {user.username} ({user.role})
                <button onClick={() => handleApprove(user.username)}>Approve</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Students;