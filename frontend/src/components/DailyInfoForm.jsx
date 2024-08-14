// src/components/DailyInfoForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function DailyInfoForm() {
  const [pulseRate, setPulseRate] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [weight, setWeight] = useState('');
  const [temperature, setTemperature] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const patientId = localStorage.getItem('patientId');
      const response = await axios.post('http://localhost:3000/api/daily-info', {
        patientId,
        pulseRate,
        bloodPressure,
        weight,
        temperature,
        respiratoryRate,
      });
      setMessage('Daily information saved successfully!');
    } catch (err) {
      setMessage('Error saving daily information');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Enter Daily Information</h2>
      {message && <p>{message}</p>}
      <div className="mb-4">
        <label className="block mb-2">Pulse Rate (bpm)</label>
        <input
          type="number"
          value={pulseRate}
          onChange={(e) => setPulseRate(e.target.value)}
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
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Weight (kg)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Temperature (°C)</label>
        <input
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
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
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Save Daily Information
      </button>
    </form>
  );
}

export default DailyInfoForm;
