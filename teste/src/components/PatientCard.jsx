import React from 'react';
import { useNavigate } from 'react-router-dom';

const PatientCard = ({ patient, isSelected, onSelect, isSelectionMode }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (isSelectionMode) {
      onSelect(patient.id);
    } else {
      navigate(`/patient/${patient.id}`);
    }
  };

  return (
    <div className={`patient-card ${isSelected ? 'selected' : ''}`} onClick={handleCardClick}>
      {isSelectionMode && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(patient.id)}
          onClick={(e) => e.stopPropagation()}
        />
      )}
      <div className="patient-image-container">
        <img src={patient.image} alt={patient.name} className="patient-image" />
      </div>
      <h3>{patient.name}</h3>
      <p>Age: {patient.age}</p>
      <p>Gender: {patient.gender}</p>
    </div>
  );
};

export default PatientCard;
