import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ExamDetail = ({ patients }) => {
  const { patientId, examId } = useParams();
  const navigate = useNavigate();
  const patient = patients.find((patient) => patient.id === parseInt(patientId));
  const exam = patient.exams.find((exam) => exam.id === parseInt(examId));

  const [comparisonExamId, setComparisonExamId] = useState(null);

  if (!patient || !exam) {
    return <div>Exame não encontrado</div>;
  }

  const comparisonExam = comparisonExamId
    ? patient.exams.find((exam) => exam.id === parseInt(comparisonExamId))
    : null;

  const renderComparison = (field) => {
    if (comparisonExam) {
      return (
        <>
          <p><strong>{field} Atual:</strong> {exam[field]}</p>
          <p><strong>{field} Comparação:</strong> {comparisonExam[field]}</p>
        </>
      );
    } else {
      return <p><strong>{field}:</strong> {exam[field]}</p>;
    }
  };

  return (
    <div className="form-container">
      <h2>Detalhes do Exame</h2>
      <div className="exam-detail-view">
        <h3>{exam.name}</h3>
        <div>
          <label>Selecionar Exame para Comparação:</label>
          <select onChange={(e) => setComparisonExamId(e.target.value)} value={comparisonExamId}>
            <option value="" disabled>Selecione um exame</option>
            {patient.exams.filter(e => e.id !== exam.id).map(e => (
              <option key={e.id} value={e.id}>
                {e.examType} - {e.date}
              </option>
            ))}
          </select>
        </div>
        <div>
          {renderComparison('anamnesis')}
          {renderComparison('meemsTest')}
          {renderComparison('medications')}
          {renderComparison('diseaseHistory')}
          {renderComparison('paSitting')}
          {renderComparison('paOrthostasis')}
          {renderComparison('fc')}
          {renderComparison('fr')}
          {renderComparison('inspection')}
          {renderComparison('palpation')}
          {renderComparison('proprioceptionAssessment')}
          {exam.physicalExam.map((sheet, sheetIndex) => (
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
          {renderComparison('muscleLength')}
          {renderComparison('muscleStrength')}
          {renderComparison('vestibularSystem')}
          {renderComparison('tugTask1')}
          {renderComparison('pomaBalance')}
          {renderComparison('pomaGait')}
          {renderComparison('pomaTotal')}
          {renderComparison('singleLegStanceRight')}
          {renderComparison('singleLegStanceLeft')}
          {renderComparison('tandemWalk')}
          {renderComparison('balanceObservation')}
          {renderComparison('lawtonScale')}
          {renderComparison('barthelIndex')}
          {renderComparison('functionalityObservation')}
          {renderComparison('gaitObservation')}
          {renderComparison('gaitAid')}
          {renderComparison('gaitSpeed')}
          {renderComparison('stepLengthRight')}
          {renderComparison('stepLengthLeft')}
          {renderComparison('posturalAssessment')}
          {renderComparison('additionalAssessments')}
          {renderComparison('physiotherapyDiagnosis')}
          {renderComparison('prognosis')}
          {renderComparison('treatmentGoals')}
          {renderComparison('treatmentProgram')}
        </div>
      </div>
      <button onClick={() => navigate(-1)} className="back-button">Voltar</button>
    </div>
  );
};

export default ExamDetail;
