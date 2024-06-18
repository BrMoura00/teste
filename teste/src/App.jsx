import React, { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import PatientsList from './components/PatientsList';
import AddPatient from './components/AddPatient';
import PatientDetail from './components/PatientDetail';
import AddExam from './components/AddExam';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import ConfirmModal from './components/ConfirmModal';
import './App.css';

const initialPatients = [
  {
    id: 1,
    image: 'https://via.placeholder.com/100',
    name: 'John Doe',
    age: 30,
    gender: 'male',
    exams: [],
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/100',
    name: 'Jane Smith',
    age: 25,
    gender: 'female',
    exams: [],
  },
];

const App = () => {
  const [patients, setPatients] = useState(() => {
    const savedPatients = localStorage.getItem('patients');
    return savedPatients ? JSON.parse(savedPatients) : initialPatients;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const addPatient = (patient) => {
    setPatients([...patients, { ...patient, exams: [] }]);
  };

  const updatePatient = (updatedPatient) => {
    setPatients(
      patients.map((patient) =>
        patient.id === updatedPatient.id ? updatedPatient : patient
      )
    );
  };

  const deletePatient = (id) => {
    setPatients(patients.filter(patient => patient.id !== id));
  };

  const addExam = (patientId, exam) => {
    setPatients(
      patients.map(patient => 
        patient.id === patientId ? { ...patient, exams: [...(patient.exams || []), exam] } : patient
      )
    );
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteSelected = () => {
    setShowConfirmModal(true);
  };

  const confirmDeleteSelected = () => {
    setPatients(patients.filter(patient => !selectedIds.includes(patient.id)));
    setSelectedIds([]);
    setShowConfirmModal(false);
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <SearchBar setSearchTerm={setSearchTerm} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="filters">
                  <button onClick={() => setIsSelectionMode(!isSelectionMode)}>
                    {isSelectionMode ? 'Cancel' : 'Selection Mode'}
                  </button>
                </div>
                <PatientsList
                  patients={filteredPatients}
                  isSelectionMode={isSelectionMode}
                  selectedIds={selectedIds}
                  setSelectedIds={setSelectedIds}
                  onDeleteSelected={handleDeleteSelected}
                />
              </>
            }
          />
          <Route path="/add-patient" element={<AddPatient addPatient={addPatient} />} />
          <Route path="/patient/:id" element={<PatientDetail patients={patients} updatePatient={updatePatient} deletePatient={deletePatient} />} />
          <Route path="/patient/:patientId/add-exam" element={<AddExam addExam={addExam} />} />
        </Routes>
        <Link to="/add-patient">
          <button className="add-patient-button">Add</button>
        </Link>
      </div>
      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDeleteSelected}
      />
    </div>
  );
};

export default App;
