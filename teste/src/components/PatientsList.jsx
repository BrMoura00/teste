import React from 'react';
import PatientCard from './PatientCard';


const PatientsList = ({ patients, isSelectionMode, selectedIds, setSelectedIds }) => {
  const handleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="patients-list">
      {patients.map(patient => (
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
