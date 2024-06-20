import React, { useState } from 'react';
import './ExerciseList.css';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddExercise = (e) => {
    e.preventDefault();
    const newExercise = {
      id: Date.now(),
      name,
      description,
    };
    setExercises([...exercises, newExercise]);
    setName('');
    setDescription('');
  };

  return (
    <div className="form-container">
      <h2>Criar Novo Exercício</h2>
      <form onSubmit={handleAddExercise}>
        <input
          type="text"
          placeholder="Nome do Exercício"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição do Exercício"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Adicionar Exercício</button>
      </form>
      <h3>Lista de Exercícios</h3>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>
            <h4>{exercise.name}</h4>
            <p>{exercise.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
