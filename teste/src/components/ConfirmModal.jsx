// src/components/ConfirmModal.jsx
import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Tem certeza de deseja excluir esses pacientes?</h3>
        <div className="modal-actions">
          <button onClick={onConfirm} className="confirm-button">Sim</button>
          <button onClick={onClose} className="cancel-button">Não</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
