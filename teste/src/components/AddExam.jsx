import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AddExam.css';

const AddExam = ({ addExam }) => {
  const { patientId } = useParams();
  const [examData, setExamData] = useState({
    examType: '',
    date: '',
    anamnesis: '',
    meemsTest: '',
    medications: '',
    diseaseHistory: '',
    paSitting: '',
    paOrthostasis: '',
    fc: '',
    fr: '',
    inspection: '',
    palpation: '',
    proprioceptionAssessment: '',
    muscleLength: '',
    muscleStrength: '',
    vestibularSystem: '',
    tugTask1: '',
    pomaBalance: '',
    pomaGait: '',
    pomaTotal: '',
    singleLegStanceRight: '',
    singleLegStanceLeft: '',
    tandemWalk: '',
    balanceObservation: '',
    lawtonScale: '',
    barthelIndex: '',
    functionalityObservation: '',
    gaitObservation: '',
    gaitAid: '',
    gaitSpeed: '',
    stepLengthRight: '',
    stepLengthLeft: '',
    posturalAssessment: '',
    additionalAssessments: '',
    physiotherapyDiagnosis: '',
    prognosis: '',
    treatmentGoals: '',
    treatmentProgram: '',
  });

  const [sheets, setSheets] = useState([
    { name: 'Planilha 1', rows: [{ joint: '', movement: '', right: '', left: '' }] }
  ]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamData({ ...examData, [name]: value });
  };

  const handleRowChange = (sheetIndex, rowIndex, e) => {
    const { name, value } = e.target;
    const newSheets = [...sheets];
    newSheets[sheetIndex].rows[rowIndex][name] = value;
    setSheets(newSheets);
  };

  const addRow = (sheetIndex) => {
    const newSheets = [...sheets];
    newSheets[sheetIndex].rows.push({ joint: '', movement: '', right: '', left: '' });
    setSheets(newSheets);
  };

  const removeRow = (sheetIndex, rowIndex) => {
    const newSheets = [...sheets];
    newSheets[sheetIndex].rows = newSheets[sheetIndex].rows.filter((_, i) => i !== rowIndex);
    setSheets(newSheets);
  };

  const addSheet = () => {
    setSheets([...sheets, { name: `Planilha ${sheets.length + 1}`, rows: [{ joint: '', movement: '', right: '', left: '' }] }]);
  };

  const removeSheet = (sheetIndex) => {
    const newSheets = sheets.filter((_, i) => i !== sheetIndex);
    setSheets(newSheets);
  };

  const handleSheetNameChange = (sheetIndex, e) => {
    const { value } = e.target;
    const newSheets = [...sheets];
    newSheets[sheetIndex].name = value;
    setSheets(newSheets);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExam = {
      id: Date.now(),
      ...examData,
      physicalExam: sheets,
    };
    addExam(parseInt(patientId), newExam);
    navigate(`/patient/${patientId}`);
  };

  return (
    <div className="form-container">
      <h2>Adicionar Exame</h2>
      <form onSubmit={handleSubmit}>
        <label>Tipo de Exame:</label>
        <input
          type="text"
          name="examType"
          value={examData.examType}
          onChange={handleChange}
          required
        />
        <label>Data:</label>
        <input
          type="date"
          name="date"
          value={examData.date}
          onChange={handleChange}
          required
        />

        <h3>ANAMNESE</h3>
        <textarea name="anamnesis" value={examData.anamnesis} onChange={handleChange}></textarea>

        <h3>Teste MEEM</h3>
        <textarea name="meemsTest" value={examData.meemsTest} onChange={handleChange}></textarea>

        <h3>MEDICAMENTOS</h3>
        <textarea name="medications" value={examData.medications} onChange={handleChange}></textarea>

        <h3>HISTÓRICO DE DOENÇAS</h3>
        <textarea name="diseaseHistory" value={examData.diseaseHistory} onChange={handleChange}></textarea>

        <h3>EXAME FÍSICO</h3>
        <label>PA Sentado:</label>
        <input type="text" name="paSitting" value={examData.paSitting} onChange={handleChange} />
        <label>PA Ortostatismo:</label>
        <input type="text" name="paOrthostasis" value={examData.paOrthostasis} onChange={handleChange} />
        <label>FC:</label>
        <input type="text" name="fc" value={examData.fc} onChange={handleChange} />
        <label>FR:</label>
        <input type="text" name="fr" value={examData.fr} onChange={handleChange} />
        <label>INSPEÇÃO:</label>
        <textarea name="inspection" value={examData.inspection} onChange={handleChange}></textarea>
        <label>PALPAÇÃO:</label>
        <textarea name="palpation" value={examData.palpation} onChange={handleChange}></textarea>
        <label>ACALIAÇÃO SENSORIAL - Propriocepção (Senso de Posição Articular):</label>
        <textarea name="proprioceptionAssessment" value={examData.proprioceptionAssessment} onChange={handleChange}></textarea>

        <h4>Planilhas de Exame Físico</h4>
        {sheets.map((sheet, sheetIndex) => (
          <div key={sheetIndex} className="physical-exam-sheet">
            <input
              type="text"
              value={sheet.name}
              onChange={(e) => handleSheetNameChange(sheetIndex, e)}
              placeholder="Nome da Planilha"
            />
            <button type="button" className="remove-button" onClick={() => removeSheet(sheetIndex)}>Remover Planilha</button>
            {sheet.rows.map((row, rowIndex) => (
              <div key={rowIndex} className="physical-exam-row">
                <input
                  type="text"
                  name="joint"
                  placeholder="Articulação"
                  value={row.joint}
                  onChange={(e) => handleRowChange(sheetIndex, rowIndex, e)}
                />
                <input
                  type="text"
                  name="movement"
                  placeholder="Movimento"
                  value={row.movement}
                  onChange={(e) => handleRowChange(sheetIndex, rowIndex, e)}
                />
                <input
                  type="text"
                  name="right"
                  placeholder="Direito"
                  value={row.right}
                  onChange={(e) => handleRowChange(sheetIndex, rowIndex, e)}
                />
                <input
                  type="text"
                  name="left"
                  placeholder="Esquerdo"
                  value={row.left}
                  onChange={(e) => handleRowChange(sheetIndex, rowIndex, e)}
                />
                <button type="button" className="remove-button" onClick={() => removeRow(sheetIndex, rowIndex)}>Remover</button>
              </div>
            ))}
            <button type="button" className="add-row-button" onClick={() => addRow(sheetIndex)}>Adicionar Linha</button>
          </div>
        ))}
        <button type="button" onClick={addSheet}>Adicionar Nova Planilha</button>

        <h3>Comprimento Muscular</h3>
        <textarea name="muscleLength" value={examData.muscleLength} onChange={handleChange}></textarea>

        <h3>Força Muscular</h3>
        <textarea name="muscleStrength" value={examData.muscleStrength} onChange={handleChange}></textarea>

        <h3>Equilíbrio</h3>
        <label>Sistema Vestibular – Romberg:</label>
        <textarea name="vestibularSystem" value={examData.vestibularSystem} onChange={handleChange}></textarea>
        <label>TUG Tarefa 1:</label>
        <input type="text" name="tugTask1" value={examData.tugTask1} onChange={handleChange} />
        <label>POMA Tinetti Equilíbrio:</label>
        <input type="text" name="pomaBalance" value={examData.pomaBalance} onChange={handleChange} />
        <label>POMA Tinetti Marcha:</label>
        <input type="text" name="pomaGait" value={examData.pomaGait} onChange={handleChange} />
        <label>POMA Total:</label>
        <input type="text" name="pomaTotal" value={examData.pomaTotal} onChange={handleChange} />
        <label>Teste Apoio Unipodal D:</label>
        <input type="text" name="singleLegStanceRight" value={examData.singleLegStanceRight} onChange={handleChange} />
        <label>Teste Apoio Unipodal E:</label>
        <input type="text" name="singleLegStanceLeft" value={examData.singleLegStanceLeft} onChange={handleChange} />
        <label>Teste Caminhada Tandem:</label>
        <input type="text" name="tandemWalk" value={examData.tandemWalk} onChange={handleChange} />
        <label>Interpretação/observação:</label>
        <textarea name="balanceObservation" value={examData.balanceObservation} onChange={handleChange}></textarea>

        <h3>Funcionalidade</h3>
        <label>Escala de Lawton:</label>
        <textarea name="lawtonScale" value={examData.lawtonScale} onChange={handleChange}></textarea>
        <label>Índice de Barthel:</label>
        <textarea name="barthelIndex" value={examData.barthelIndex} onChange={handleChange}></textarea>
        <label>Interpretação/Observações:</label>
        <textarea name="functionalityObservation" value={examData.functionalityObservation} onChange={handleChange}></textarea>

        <h3>Marcha</h3>
        <label>Observação:</label>
        <textarea name="gaitObservation" value={examData.gaitObservation} onChange={handleChange}></textarea>
        <label>Dispositivo de Auxílio à Marcha:</label>
        <input type="text" name="gaitAid" value={examData.gaitAid} onChange={handleChange} />
        <label>Velocidade da Marcha:</label>
        <input type="text" name="gaitSpeed" value={examData.gaitSpeed} onChange={handleChange} />
        <label>Comprimento da Passada Direito:</label>
        <input type="text" name="stepLengthRight" value={examData.stepLengthRight} onChange={handleChange} />
        <label>Comprimento da Passada Esquerdo:</label>
        <input type="text" name="stepLengthLeft" value={examData.stepLengthLeft} onChange={handleChange} />

        <h3>Avaliação Postural</h3>
        <textarea name="posturalAssessment" value={examData.posturalAssessment} onChange={handleChange}></textarea>

        <h3>Avaliação Complementares</h3>
        <textarea name="additionalAssessments" value={examData.additionalAssessments} onChange={handleChange}></textarea>

        <h3>Diagnóstico Fisioterapêutico</h3>
        <textarea name="physiotherapyDiagnosis" value={examData.physiotherapyDiagnosis} onChange={handleChange}></textarea>

        <h3>Prognóstico</h3>
        <textarea name="prognosis" value={examData.prognosis} onChange={handleChange}></textarea>

        <h3>Objetivos de Tratamento</h3>
        <textarea name="treatmentGoals" value={examData.treatmentGoals} onChange={handleChange}></textarea>

        <h3>Programa de Tratamento</h3>
        <textarea name="treatmentProgram" value={examData.treatmentProgram} onChange={handleChange}></textarea>

        <button type="submit">Adicionar Exame</button>
      </form>
    </div>
  );
};

export default AddExam;
