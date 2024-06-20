import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddPatient.css';
import man from '../assets/man.png';
import notman from '../assets/notman.png';
import unknow from '../assets/unknow.png';

const AddPatient = ({ addPatient }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let imageUrl;
    if (gender === 'male') {
      imageUrl = man; 
    } else if (gender === 'female') {
      imageUrl = notman; 
    } else {
      imageUrl = unknow;
    }

    const newPatient = {
      id: Date.now(),
      name,
      age,
      gender,
      image: imageUrl,
      exams: [],
    };
    addPatient(newPatient);
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Adicionar Paciente</h2>
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
          <option value="" disabled>Selecionar Gênero</option>
          <option value="male">Masculino</option>
          <option value="female">Feminino</option>
          <option value="other">Outro</option>
        </select>
        <button type="submit">Adicionar Paciente</button>
      </form>
    </div>
  );
};

export default AddPatient;
