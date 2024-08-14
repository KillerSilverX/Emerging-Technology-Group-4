import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PreviousVisits({ patientId }) {
  const [vitalSigns, setVitalSigns] = useState([]);
  
  useEffect(() => {
    const fetchVitalSigns = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/vitals/${patientId}`);
        setVitalSigns(response.data);
      } catch (err) {
        console.error('Error fetching vital signs:', err);
      }
    };
    
    fetchVitalSigns();
  }, [patientId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Previous Clinical Visits</h2>
      <ul>
        {vitalSigns.map((vital, index) => (
          <li key={index} className="mb-4">
            <p>Date: {new Date(vital.visitDate).toLocaleDateString()}</p>
            <p>Temperature: {vital.temperature} °C</p>
            <p>Heart Rate: {vital.heartRate} bpm</p>
            <p>Blood Pressure: {vital.bloodPressure}</p>
            <p>Respiratory Rate: {vital.respiratoryRate} breaths/min</p>
            <p>Nurse: {vital.nurseId.name}</p>
            <p className="text-red-500">
              Condition: {vital.conditions.length > 0 ? vital.conditions.join(', ') : 'Normal'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PreviousVisits;
