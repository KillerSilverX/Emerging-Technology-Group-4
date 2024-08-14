import React, { useState } from 'react';
import axios from 'axios';

function VitalSignsForm({ patientId }) {
  const [temperature, setTemperature] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [message, setMessage] = useState('');
  const [conditions, setConditions] = useState([]);

  const normalRanges = {
    temperature: { min: 35, max: 42 },
    heartRate: { min: 40, max: 180 },
    systolicBP: { min: 80, max: 200 },
    diastolicBP: { min: 40, max: 120 },
    respiratoryRate: { min: 8, max: 40 }
  };

  const validateInputs = () => {
    const [systolicBP, diastolicBP] = bloodPressure.split('/').map(Number);

    if (
      temperature < normalRanges.temperature.min || temperature > normalRanges.temperature.max ||
      heartRate < normalRanges.heartRate.min || heartRate > normalRanges.heartRate.max ||
      systolicBP < normalRanges.systolicBP.min || systolicBP > normalRanges.systolicBP.max ||
      diastolicBP < normalRanges.diastolicBP.min || diastolicBP > normalRanges.diastolicBP.max ||
      respiratoryRate < normalRanges.respiratoryRate.min || respiratoryRate > normalRanges.respiratoryRate.max
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar el formato de bloodPressure antes de proceder
    if (!/^\d+\/\d+$/.test(bloodPressure)) {
      setMessage('Please enter a valid blood pressure in the format "systolic/diastolic".');
      setConditions([]);
      return;
    }

    const [systolicBP, diastolicBP] = bloodPressure.split('/').map(Number);

    if (
      systolicBP < normalRanges.systolicBP.min || systolicBP > normalRanges.systolicBP.max ||
      diastolicBP < normalRanges.diastolicBP.min || diastolicBP > normalRanges.diastolicBP.max
    ) {
      setMessage(`Please enter blood pressure values within the allowed ranges (${normalRanges.systolicBP.min}-${normalRanges.systolicBP.max}/${normalRanges.diastolicBP.min}-${normalRanges.diastolicBP.max} mmHg).`);
      setConditions([]);
      return;
    }

    if (!validateInputs()) {
      setMessage('Please enter values within the allowed ranges.');
      setConditions([]);
      return;
    }

    try {
      const nurseId = localStorage.getItem('nurseId'); // Obteniendo nurseId del localStorage
      const response = await axios.post('http://localhost:3000/api/vitals', {
        patientId,
        nurseId,
        temperature,
        heartRate,
        bloodPressure,
        respiratoryRate,
      });
      setMessage('Vital signs saved successfully!');
      setConditions(response.data.conditions); // Guardar las condiciones detectadas
    } catch (err) {
      setMessage('Error saving vital signs');
      setConditions([]); // Limpiar las condiciones en caso de error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Enter Vital Signs</h2>
      {message && <p>{message}</p>}
      {conditions.length > 0 && (
        <div className="bg-red-100 p-4 rounded-lg shadow-lg mb-4">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Attention Needed</h3>
          <ul className="list-disc list-inside">
            {conditions.map((condition, index) => (
              <li key={index} className="text-red-600 font-medium">
                {condition}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-2">Temperature (°C)</label>
        <input
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          min={normalRanges.temperature.min}
          max={normalRanges.temperature.max}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Heart Rate (bpm)</label>
        <input
          type="number"
          value={heartRate}
          onChange={(e) => setHeartRate(e.target.value)}
          min={normalRanges.heartRate.min}
          max={normalRanges.heartRate.max}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Blood Pressure (mmHg)</label>
        <input
          type="text"
          value={bloodPressure}
          onChange={(e) => setBloodPressure(e.target.value)}
          placeholder="e.g., 120/80"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Respiratory Rate (breaths/min)</label>
        <input
          type="number"
          value={respiratoryRate}
          onChange={(e) => setRespiratoryRate(e.target.value)}
          min={normalRanges.respiratoryRate.min}
          max={normalRanges.respiratoryRate.max}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Save Vital Signs
      </button>
    </form>
  );
}

export default VitalSignsForm;
