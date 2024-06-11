// src/components/AddCandidate.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddCandidate = ({ addCandidate }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [rate, setRate] = useState('');
  const [functionRole, setFunctionRole] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCandidate = {
      id: Date.now(),
      name,
      role,
      experience,
      rate,
      function: functionRole,
      image,
    };
    addCandidate(newCandidate);
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Add New Candidate</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Function"
          value={functionRole}
          onChange={(e) => setFunctionRole(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <button type="submit">Add Candidate</button>
      </form>
    </div>
  );
};

export default AddCandidate;
