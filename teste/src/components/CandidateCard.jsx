// src/components/CandidateCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CandidateCard = ({ candidate, isSelected, onSelect, isSelectionMode }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (isSelectionMode) {
      onSelect(candidate.id);
    } else {
      navigate(`/candidate/${candidate.id}`);
    }
  };

  return (
    <div className={`candidate-card ${isSelected ? 'selected' : ''}`} onClick={handleCardClick}>
      {isSelectionMode && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(candidate.id)}
          onClick={(e) => e.stopPropagation()}
        />
      )}
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
