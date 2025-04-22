import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import '../../styles/Performance.css';

const Performance = () => {
  const [individualPerformanceData, setIndividualPerformanceData] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', score: '' });

  // Fetch performance data from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/performance/all')
      .then(response => {
        setIndividualPerformanceData(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Handle input change for new student
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  // Add new student performance
  const addStudent = () => {
    if (newStudent.name && newStudent.score) {
      axios.post('http://localhost:5000/api/performance/add', {
        studentId: "STUDENT_ID_HERE", // Replace with actual student ID
        name: newStudent.name,
        score: parseInt(newStudent.score, 10),
      }).then(() => {
        window.location.reload(); // Reload to update the list
      }).catch(error => console.error('Error adding performance:', error));
    }
  };

  // Update student score
  const updateScore = (id, newScore) => {
    axios.put(`http://localhost:5000/api/performance/update/${id}`, {
      score: parseInt(newScore, 10),
    }).then(() => {
      window.location.reload(); // Reload to update UI
    }).catch(error => console.error('Error updating score:', error));
  };

  // Delete student performance
  const deleteStudent = (id) => {
    axios.delete(`http://localhost:5000/api/performance/delete/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch(error => console.error('Error deleting performance:', error));
  };

  return (
    <div className="performance-container">
      <Sidebar />
      <div className="performance-content">
        <h2 className="performance-header">Individual Performance</h2>
        <div className="individual-performance">
          {individualPerformanceData.map((student) => (
            <div key={student._id} className="performance-card">
              <p><strong>{student.name}</strong>: 
                <input 
                  type="number" 
                  value={student.score} 
                  onChange={(e) => updateScore(student._id, e.target.value)} 
                  className="score-input"
                />
              </p>
              <button onClick={() => deleteStudent(student._id)} className="delete-btn">Delete</button>
            </div>
          ))}
        </div>

        <h2 className="performance-header">Add Student Performance</h2>
        <div className="add-student-form">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={newStudent.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="score"
            placeholder="Score"
            value={newStudent.score}
            onChange={handleInputChange}
          />
          <button onClick={addStudent} className="add-btn">Add Student</button>
        </div>
      </div>
    </div>
  );
};

export default Performance;
