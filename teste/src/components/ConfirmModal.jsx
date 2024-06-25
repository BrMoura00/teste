import React from 'react';
import './ConfirmModal.css';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const ConfirmModal = ({ show, onClose, onConfirm }) => {
  const { toast } = useToast();

  if (!show) {
    return null;
  }

  const handleConfirmClick = () => {
    toast({
      description: "Pacientes excluídos com sucesso.",
    });
    onConfirm();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Tem certeza de que deseja excluir esses pacientes?</h3>
        <div className="modal-actions">
          <Button onClick={handleConfirmClick} className="confirm-button">Sim</Button>
          <Button onClick={onClose} className="cancel-button">Não</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
