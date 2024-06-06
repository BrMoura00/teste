// src/components/CandidateCard.jsx
import React from 'react';

const CandidateCard = ({ candidate }) => {
  return (
    <div className="candidate-card">
      <img src={candidate.image} alt={candidate.name} />
      <h3>{candidate.name}</h3>
      <p>{candidate.role}</p>
      <p>Experience: {candidate.experience}</p>
      <p>Rate: {candidate.rate}%</p>
      <p>Function: {candidate.function}</p>
    </div>
  );
};

export default CandidateCard;
