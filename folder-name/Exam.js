import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import '../../styles/Exam.css'; // Import CSS

const Exam = () => {
  const [exams, setExams] = useState([]);
  const [newExam, setNewExam] = useState({ subject: '', date: '', time: '' });

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get(' http://localhost:3000/api/v1/exams/getall');
      setExams(response.data.exams);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const handleAddExam = async (e) => {
    e.preventDefault();
    if (newExam.subject && newExam.date && newExam.time) {
      try {
        await axios.post(' http://localhost:3000/api/v1/exams', newExam);
        setNewExam({ subject: '', date: '', time: '' });
        fetchExams();
      } catch (error) {
        console.error('Error adding exam:', error);
      }
    }
  };

  return (
    <div className="exam-container">
      <Sidebar />
      <div className="exam-content">
        <h2>Exams</h2>
        <form className="exam-form" onSubmit={handleAddExam}>
          <input type="text" placeholder="Subject" value={newExam.subject} onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })} required />
          <input type="date" value={newExam.date} onChange={(e) => setNewExam({ ...newExam, date: e.target.value })} required />
          <input type="time" value={newExam.time} onChange={(e) => setNewExam({ ...newExam, time: e.target.value })} required />
          <button type="submit">Add Exam</button>
        </form>
        <ul className="exam-list">
          {exams.map((exam) => (
            <li key={exam.id} className="exam-item">{exam.subject} - {exam.date} at {exam.time}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Exam;
