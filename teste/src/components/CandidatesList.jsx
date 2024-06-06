// src/components/CandidatesList.jsx
import React from 'react';
import CandidateCard from './CandidateCard';

const CandidatesList = ({ candidates }) => {
  return (
    <div className="candidates-list">
      {candidates.map(candidate => (
        <CandidateCard key={candidate.id} candidate={candidate} />
      ))}
    </div>
  );
};

export default CandidatesList;
