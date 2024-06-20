import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';
import AddPatient from './AddPatient';

const CustomCalendar = ({ patients, addPatient }) => {
  const [date, setDate] = useState(new Date());
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [selectedPatients, setSelectedPatients] = useState([]);

  const handleDateChange = (date) => {
    setDate(date);
    setShowAddPatient(true);
    const patientsForDay = patients.filter(patient => {
      const patientDate = new Date(patient.date);
      return (
        patientDate.getFullYear() === date.getFullYear() &&
        patientDate.getMonth() === date.getMonth() &&
        patientDate.getDate() === date.getDate()
      );
    });
    setSelectedPatients(patientsForDay);
  };

  const handleAddPatient = (patient) => {
    addPatient({ ...patient, date });
    setShowAddPatient(false);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const patientsForDay = patients.filter(patient => {
        const patientDate = new Date(patient.date);
        return (
          patientDate.getFullYear() === date.getFullYear() &&
          patientDate.getMonth() === date.getMonth() &&
          patientDate.getDate() === date.getDate()
        );
      });
      if (patientsForDay.length > 0) {
        return <span className="badge">{patientsForDay.length}</span>;
      }
    }
    return null;
  };

  return (
    <div className="calendar-container">
      <h2>Calendário</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileContent={tileContent}
      />
      {showAddPatient && <AddPatient addPatient={handleAddPatient} />}
      <div className="patients-list">
        <h3>Pacientes para {date.toLocaleDateString()}</h3>
        {selectedPatients.length > 0 ? (
          selectedPatients.map((patient, index) => (
            <div key={index} className="patient-detail">
              <p><strong>Nome:</strong> {patient.name}</p>
              <p><strong>Idade:</strong> {patient.age}</p>
              <p><strong>Gênero:</strong> {patient.gender}</p>
            </div>
          ))
        ) : (
          <p>Não há pacientes para este dia.</p>
        )}
      </div>
    </div>
  );
};

export default CustomCalendar;
