// src/components/CandidatesList.jsx
import React from 'react';
import CandidateCard from './CandidateCard';

const CandidatesList = ({ candidates, isSelectionMode, selectedIds, setSelectedIds, onDeleteSelected }) => {
  const handleSelect = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  return (
    <div className="candidates-list">
      {isSelectionMode && (
        <button
          className="delete-selected-button"
          onClick={onDeleteSelected}
          disabled={selectedIds.length === 0}
        >
          Delete Selected
        </button>
      )}
      {candidates.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          candidate={candidate}
          isSelected={selectedIds.includes(candidate.id)}
          onSelect={handleSelect}
          isSelectionMode={isSelectionMode}
        />
      ))}
    </div>
  );
};

export default CandidatesList;
