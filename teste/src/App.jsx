// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CandidatesList from './components/CandidatesList';
import AddCandidate from './components/AddCandidate';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';
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

  useEffect(() => {
    localStorage.setItem('candidates', JSON.stringify(candidates));
  }, [candidates]);

  const addCandidate = (candidate) => {
    setCandidates([...candidates, candidate]);
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <SearchBar setSearchTerm={setSearchTerm} />
          <Routes>
            <Route path="/" element={<CandidatesList candidates={filteredCandidates} />} />
            <Route path="/add-candidate" element={<AddCandidate addCandidate={addCandidate} />} />
          </Routes>
          <Link to="/add-candidate">
            <button className="add-candidate-button">Add </button>
          </Link>
        </div>
      </div>
    </Router>
  );
};

export default App;
