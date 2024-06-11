// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CandidatesList from './components/CandidatesList';
import AddCandidate from './components/AddCandidate';
import CandidateDetail from './components/CandidateDetail';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
import ConfirmModal from './components/ConfirmModal';
import './App.css';

const initialCandidates = [
  {
    id: 1,
    image: 'https://via.placeholder.com/100',
    name: 'Caroline Howard',
    role: 'Social Media Marketing',
    experience: '2 years',
    rate: 63,
    function: 'Director',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/100',
    name: 'Samantha Cindy',
    role: 'Plumber',
    experience: '4 years',
    rate: 89,
    function: 'Director',
  },
];

const App = () => {
  const [candidates, setCandidates] = useState(() => {
    const savedCandidates = localStorage.getItem('candidates');
    return savedCandidates ? JSON.parse(savedCandidates) : initialCandidates;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  const addCandidate = (candidate) => {
    setCandidates([...candidates, candidate]);
  };

  const updateCandidate = (updatedCandidate) => {
    setCandidates(
      candidates.map((candidate) =>
        candidate.id === updatedCandidate.id ? updatedCandidate : candidate
      )
    );
  };

  const deleteCandidate = (id) => {
    setCandidates(candidates.filter(candidate => candidate.id !== id));
  };

  const deleteMultipleCandidates = (ids) => {
    setCandidates(candidates.filter(candidate => !ids.includes(candidate.id)));
    setSelectedIds([]);
    setIsSelectionMode(false);
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteSelected = () => {
    setShowConfirmModal(true);
  };

  const confirmDeleteSelected = () => {
    deleteMultipleCandidates(selectedIds);
    setShowConfirmModal(false);
  };

  return (
    <Router>
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
                      {isSelectionMode ? 'Cancelar' : 'Modo de Seleção'}
                    </button>
                  </div>
                  <CandidatesList
                    candidates={filteredCandidates}
                    isSelectionMode={isSelectionMode}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                    onDeleteSelected={handleDeleteSelected}
                  />
                </>
              }
            />
            <Route path="/add-candidate" element={<AddCandidate addCandidate={addCandidate} />} />
            <Route path="/candidate/:id" element={<CandidateDetail candidates={candidates} updateCandidate={updateCandidate} deleteCandidate={deleteCandidate} />} />
          </Routes>
          <Link to="/add-candidate">
            <button className="add-candidate-button">Add</button>
          </Link>
        </div>
      </div>
      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={confirmDeleteSelected}
      />
    </Router>
  );
};

export default App;
