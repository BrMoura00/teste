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
    return <div>Patient not found</div>;
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

  return (
    <div className="form-container">
      {isEditing ? (
        <>
          <h2>Edit Patient</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div className="image-input-container">
              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
              <img src={image} alt="Patient" className="patient-image-preview" />
            </div>
            <button type="submit">Update Patient</button>
          </form>
        </>
      ) : (
        <>
          <h2>Patient Details</h2>
          <div className="patient-detail-view">
            <img src={patient.image} alt={patient.name} className="patient-image-preview" />
            <h3>{patient.name}</h3>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
          </div>
          <div className="exams-section">
            <h3>Exams</h3>
            {patient.exams && patient.exams.length > 0 ? (
              <div>
                <select onChange={(e) => setSelectedExamId(e.target.value)} value={selectedExamId}>
                  <option value="" disabled>Select Exam</option>
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
                        <p><strong>Type:</strong> {exam.examType}</p>
                        <p><strong>Date:</strong> {exam.date}</p>
                        <p><strong>Result:</strong> {exam.result}</p>
                        <Link to={`/patient/${patient.id}/exam/${exam.id}`}>
                          <button className="view-exam-button">View Exam</button>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p>No exams found.</p>
            )}
            <Link to={`/patient/${patient.id}/add-exam`}>
              <button className="add-exam-button">Add Exam</button>
            </Link>
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

export default PatientDetail;
