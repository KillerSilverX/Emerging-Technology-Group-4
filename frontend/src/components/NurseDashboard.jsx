import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VitalSignsForm from './VitalSignsForm';
import PreviousVisits from './PreviousVisits';

function NurseDashboard() {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/patients'); // Endpoint para obtener la lista de pacientes
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handlePatientChange = (e) => {
    setSelectedPatientId(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Nurse Dashboard</h1>
      
      <div className="mb-4">
        <label htmlFor="patientSelect" className="block mb-2">Select Patient:</label>
        <select
          id="patientSelect"
          value={selectedPatientId}
          onChange={handlePatientChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">-- Select a Patient --</option>
          {patients.map((patient) => (
            <option key={patient._id} value={patient._id}>
              {patient.name}
            </option>
          ))}
        </select>
      </div>

      {selectedPatientId && (
        <>
          <VitalSignsForm patientId={selectedPatientId} />
          <PreviousVisits patientId={selectedPatientId} />
        </>
      )}
    </div>
  );
}

export default NurseDashboard;
