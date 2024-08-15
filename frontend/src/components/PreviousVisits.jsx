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
    <div className="bg-white-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">Previous Clinical Visits</h2>
      <ul className="divide-y divide-gray-600">
        {vitalSigns.map((vital, index) => (
          <li key={index} className="py-4">
            <p className="text-gray-900">Date: {new Date(vital.visitDate).toLocaleDateString()}</p>
            <p className="text-gray-900">Temperature: {vital.temperature} °C</p>
            <p className="text-gray-900">Heart Rate: {vital.heartRate} bpm</p>
            <p className="text-gray-900">Blood Pressure: {vital.bloodPressure}</p>
            <p className="text-gray-900">Respiratory Rate: {vital.respiratoryRate} breaths/min</p>
            <p className="text-gray-900">Nurse: {vital.nurseId.name}</p>
            <p className={`text-lg ${vital.conditions.length > 0 ? 'text-red-500' : 'text-green-400'}`}>
              Condition: {vital.conditions.length > 0 ? vital.conditions.join(', ') : 'Normal'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PreviousVisits;
