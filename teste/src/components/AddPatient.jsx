import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPatient = ({ addPatient }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let imageUrl;
    if (gender === 'male') {
      imageUrl = 'img63ed7613ddf030.75805827.jpg'; // URL da imagem para homem
    } else if (gender === 'female') {
      imageUrl = '346401489780673.jpg'; // URL da imagem para mulher
    } else {
      imageUrl = '/assets/621bbbd5217e5.jpeg'; // URL da imagem para outro gênero
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
