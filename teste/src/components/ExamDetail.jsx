import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ExamDetail.css';

const ExamDetail = ({ patients }) => {
  const { patientId, examId } = useParams();
  const navigate = useNavigate();
  const patient = patients.find((patient) => patient.id === parseInt(patientId));

  if (!patient) {
    return <div>Paciente não encontrado</div>;
  }

  const [selectedExamId, setSelectedExamId] = useState(examId);
  const exam = patient.exams.find((exam) => exam.id === parseInt(selectedExamId));

  if (!exam) {
    return <div>Exame não encontrado</div>;
  }

  const handleExamChange = (e) => {
    setSelectedExamId(e.target.value);
  };

  const renderDetail = (field, label) => {
    return (
      <p><strong>{label}:</strong> {exam[field]}</p>
    );
  };

  return (
    <div className="form-container">
      <h2>Detalhes do Exame</h2>
      <div className="exam-detail-view">
        <div className="select-exam">
          <label>Selecionar Exame:</label>
          <select onChange={handleExamChange} value={selectedExamId}>
            {patient.exams.map(e => (
              <option key={e.id} value={e.id}>
                {e.examType} - {e.date}
              </option>
            ))}
          </select>
        </div>
        <h3>{exam.name}</h3>
        {renderDetail('anamnesis', 'Anamnese')}
        {renderDetail('meemsTest', 'Teste MEEM')}
        {renderDetail('medications', 'Medicamentos')}
        {renderDetail('diseaseHistory', 'Histórico de Doenças')}
        {renderDetail('paSitting', 'PA Sentado')}
        {renderDetail('paOrthostasis', 'PA Ortostatismo')}
        {renderDetail('fc', 'FC')}
        {renderDetail('fr', 'FR')}
        {renderDetail('inspection', 'Inspeção')}
        {renderDetail('palpation', 'Palpação')}
        {renderDetail('proprioceptionAssessment', 'Avaliação da Propriocepção')}
        {exam.physicalExam && exam.physicalExam.map((sheet, sheetIndex) => (
          <div key={sheetIndex} className="physical-exam-sheet">
            <h4>{sheet.name}</h4>
            {sheet.rows.map((row, rowIndex) => (
              <div key={rowIndex} className="physical-exam-row">
                <p><strong>Articulação:</strong> {row.joint}</p>
                <p><strong>Movimento:</strong> {row.movement}</p>
                <p><strong>Direito:</strong> {row.right}</p>
                <p><strong>Esquerdo:</strong> {row.left}</p>
              </div>
            ))}
          </div>
        ))}
        {renderDetail('muscleLength', 'Comprimento Muscular')}
        {renderDetail('muscleStrength', 'Força Muscular')}
        {renderDetail('vestibularSystem', 'Sistema Vestibular')}
        {renderDetail('tugTask1', 'TUG Task 1')}
        {renderDetail('pomaBalance', 'POMA Balance')}
        {renderDetail('pomaGait', 'POMA Gait')}
        {renderDetail('pomaTotal', 'POMA Total')}
        {renderDetail('singleLegStanceRight', 'Apoio Unilateral Direito')}
        {renderDetail('singleLegStanceLeft', 'Apoio Unilateral Esquerdo')}
        {renderDetail('tandemWalk', 'Caminhada Tandem')}
        {renderDetail('balanceObservation', 'Observação do Equilíbrio')}
        {renderDetail('lawtonScale', 'Escala de Lawton')}
        {renderDetail('barthelIndex', 'Índice de Barthel')}
        {renderDetail('functionalityObservation', 'Observação da Funcionalidade')}
        {renderDetail('gaitObservation', 'Observação da Marcha')}
        {renderDetail('gaitAid', 'Auxílio de Marcha')}
        {renderDetail('gaitSpeed', 'Velocidade da Marcha')}
        {renderDetail('stepLengthRight', 'Comprimento do Passo Direito')}
        {renderDetail('stepLengthLeft', 'Comprimento do Passo Esquerdo')}
        {renderDetail('posturalAssessment', 'Avaliação Postural')}
        {renderDetail('additionalAssessments', 'Avaliações Adicionais')}
        {renderDetail('physiotherapyDiagnosis', 'Diagnóstico Fisioterapêutico')}
        {renderDetail('prognosis', 'Prognóstico')}
        {renderDetail('treatmentGoals', 'Objetivos do Tratamento')}
        {renderDetail('treatmentProgram', 'Programa de Tratamento')}
      </div>
      <button onClick={() => navigate(-1)} className="back-button">Voltar</button>
    </div>
  );
};

export default ExamDetail;
