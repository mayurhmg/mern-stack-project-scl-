import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import '../../styles/Attendance.css'; // Import CSS file

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(' http://localhost:3000/api/v1/students/getall');
      const fetchedStudents = response.data.students || [];
      setStudents(fetchedStudents);
      initializeAttendanceData(fetchedStudents);
      setError(null);
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to fetch students');
    }
    setLoading(false);
  };

  const initializeAttendanceData = (students) => {
    const initialData = students.map((student) => ({
      id: student.id,
      name: student.name,
      status: 'Present',
    }));
    setAttendanceData(initialData);
  };

  const handleStatusChange = (id, status) => {
    setAttendanceData((prevData) =>
      prevData.map((student) =>
        student.id === id ? { ...student, status } : student
      )
    );
  };

  const handleSubmit = async () => {
    try {
      const formattedData = attendanceData.map(({ id, name, status }) => ({
        studentId: id,
        name,
        status,
      }));
      await axios.post(' http://localhost:3000/api/v1/attendance', { attendanceData: formattedData });
      console.log('Attendance data submitted successfully');
      setError(null);
    } catch (error) {
      console.error('Error submitting attendance data:', error);
      setError('Failed to submit attendance');
    }
  };

  return (
    <div className="attendance-container">
      <Sidebar />
      <div className="attendance-content">
        <h2>Attendance</h2>

        {loading && <p className="loading-text">Loading students...</p>}
        {error && <p className="error-text">{error}</p>}

        <ul className="attendance-list">
          {students.length > 0 ? (
            students.map((student) => (
              <li key={student.id} className="attendance-item">
                <span className="student-name">{student.name}</span>
                <label className="checkbox-label">
                  <input
                    type="radio"
                    name={`attendance-${student.id}`}
                    checked={attendanceData.find((s) => s.id === student.id)?.status === 'Present'}
                    onChange={() => handleStatusChange(student.id, 'Present')}
                  />
                  Present
                </label>
                <label className="checkbox-label">
                  <input
                    type="radio"
                    name={`attendance-${student.id}`}
                    checked={attendanceData.find((s) => s.id === student.id)?.status === 'Absent'}
                    onChange={() => handleStatusChange(student.id, 'Absent')}
                  />
                  Absent
                </label>
                <label className="checkbox-label">
                  <input
                    type="radio"
                    name={`attendance-${student.id}`}
                    checked={attendanceData.find((s) => s.id === student.id)?.status === 'Absent with apology'}
                    onChange={() => handleStatusChange(student.id, 'Absent with apology')}
                  />
                  Absent with apology
                </label>
              </li>
            ))
          ) : (
            !loading && <li className="no-students">No students available</li>
          )}
        </ul>

        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Attendance;
