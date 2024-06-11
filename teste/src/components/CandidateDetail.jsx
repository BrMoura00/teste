// src/components/CandidateDetail.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';

const CandidateDetail = ({ candidates, updateCandidate, deleteCandidate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const candidate = candidates.find((candidate) => candidate.id === parseInt(id));

  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (!candidate) {
    return <div>Candidate not found</div>;
  }

  const [name, setName] = useState(candidate.name);
  const [role, setRole] = useState(candidate.role);
  const [experience, setExperience] = useState(candidate.experience);
  const [rate, setRate] = useState(candidate.rate);
  const [functionRole, setFunctionRole] = useState(candidate.function);
  const [image, setImage] = useState(candidate.image);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCandidate = {
      ...candidate,
      name,
      role,
      experience,
      rate,
      function: functionRole,
      image,
    };
    updateCandidate(updatedCandidate);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    deleteCandidate(candidate.id);
    navigate('/');
  };

  return (
    <div className="form-container">
      {isEditing ? (
        <>
          <h2>Edit Candidate</h2>
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
            <div className="image-input-container">
              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
              <img src={image} alt="Candidate" className="candidate-image-preview" />
            </div>
            <button type="submit">Update Candidate</button>
          </form>
        </>
      ) : (
        <>
          <h2>Candidate Details</h2>
          <div className="candidate-detail-view">
            <img src={candidate.image} alt={candidate.name} className="candidate-image-preview" />
            <h3>{candidate.name}</h3>
            <p><strong>Role:</strong> {candidate.role}</p>
            <p><strong>Experience:</strong> {candidate.experience}</p>
            <p><strong>Rate:</strong> {candidate.rate}%</p>
            <p><strong>Function:</strong> {candidate.function}</p>
          </div>
          <button onClick={handleEditClick} className="edit-button">Edit</button>
          <button onClick={handleDeleteClick} className="delete-button">Delete</button>
        </>
      )}
      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default CandidateDetail;
