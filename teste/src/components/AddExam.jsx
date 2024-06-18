import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddExam = ({ addExam }) => {
  const { patientId } = useParams();
  const [examType, setExamType] = useState('');
  const [date, setDate] = useState('');
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExam = {
      id: Date.now(),
      examType,
      date,
      result,
    };
    addExam(parseInt(patientId), newExam);
    navigate(`/patient/${patientId}`);
  };

  return (
    <div className="form-container">
      <h2>Add New Exam</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Exam Type"
          value={examType}
          onChange={(e) => setExamType(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <textarea
          placeholder="Result"
          value={result}
          onChange={(e) => setResult(e.target.value)}
          required
        />
        <button type="submit">Add Exam</button>
      </form>
    </div>
  );
};

export default AddExam;
