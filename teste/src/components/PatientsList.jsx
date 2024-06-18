import React from 'react';
import PatientCard from './PatientCard';

const PatientsList = ({ patients, isSelectionMode, selectedIds, setSelectedIds, onDeleteSelected }) => {
  const handleSelect = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  return (
    <div className="patients-list">
      {isSelectionMode && (
        <button
          className="delete-selected-button"
          onClick={onDeleteSelected}
          disabled={selectedIds.length === 0}
        >
          Delete Selected
        </button>
      )}
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          isSelected={selectedIds.includes(patient.id)}
          onSelect={handleSelect}
          isSelectionMode={isSelectionMode}
        />
      ))}
    </div>
  );
};

export default PatientsList;
