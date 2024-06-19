import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';

const PatientDetail = ({ patients, updatePatient, deletePatient }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = patients.find((patient) => patient.id === parseInt(id));
  const [selectedExamId, setSelectedExamId] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (!patient) {
    return <div>Paciente não encontrado</div>;
  }

  const [name, setName] = useState(patient.name);
  const [age, setAge] = useState(patient.age);
  const [gender, setGender] = useState(patient.gender);
  const [image, setImage] = useState(patient.image);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPatient = {
      ...patient,
      name,
      age,
      gender,
      image,
    };
    updatePatient(updatedPatient);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    deletePatient(patient.id);
    navigate('/');
  };

  const handleViewExam = () => {
    if (selectedExamId) {
      navigate(`/patient/${patient.id}/exam/${selectedExamId}`);
    }
  };

  return (
    <div className="form-container">
      {isEditing ? (
        <>
          <h2>Editar Paciente</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Idade"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="" disabled>Selecione o Gênero</option>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="other">Outro</option>
            </select>
            <div className="image-input-container">
              <input
                type="text"
                placeholder="URL da Imagem"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
              <img src={image} alt="Paciente" className="patient-image-preview" />
            </div>
            <button type="submit">Atualizar Paciente</button>
          </form>
        </>
      ) : (
        <>
          <h2>Detalhes do Paciente</h2>
          <div className="patient-detail-view">
            <img src={patient.image} alt={patient.name} className="patient-image-preview" />
            <h3>{patient.name}</h3>
            <p><strong>Idade:</strong> {patient.age}</p>
            <p><strong>Gênero:</strong> {patient.gender}</p>
          </div>
          <div className="exams-section">
            <h3>Exames</h3>
            {patient.exams && patient.exams.length > 0 ? (
              <div>
                <select onChange={(e) => setSelectedExamId(e.target.value)} value={selectedExamId}>
                  <option value="" disabled>Selecione um Exame</option>
                  {patient.exams.map(exam => (
                    <option key={exam.id} value={exam.id}>
                      {exam.examType} - {exam.date}
                    </option>
                  ))}
                </select>
                {selectedExamId && (
                  <div className="exam-details">
                    {patient.exams.filter(exam => exam.id === parseInt(selectedExamId)).map(exam => (
                      <div key={exam.id}>
                        <p><strong>Tipo:</strong> {exam.examType}</p>
                        <p><strong>Data:</strong> {exam.date}</p>
                        <button onClick={handleViewExam}>Visualizar Exame</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p>Nenhum exame encontrado.</p>
            )}
            <Link to={`/patient/${patient.id}/add-exam`}>
              <button className="add-exam-button">Adicionar Exame</button>
            </Link>
          </div>
          <button onClick={handleEditClick} className="edit-button">Editar</button>
          <button onClick={handleDeleteClick} className="delete-button">Excluir</button>
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

export default PatientDetail;
  