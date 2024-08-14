import React, { useState, useEffect } from "react";
import axios from "axios";
import VitalSignsForm from "./VitalSignsForm";
import PreviousVisits from "./PreviousVisits";

function NurseDashboard() {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/patients"); // Endpoint para obtener la lista de pacientes
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handlePatientChange = (e) => {
    setSelectedPatientId(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold text-gray-800 mb-8">
          Nurse Dashboard
        </h1>

        <div className="mb-6">
          <label
            htmlFor="patientSelect"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Select Patient:
          </label>
          <select
            id="patientSelect"
            value={selectedPatientId}
            onChange={handlePatientChange}
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <VitalSignsForm patientId={selectedPatientId} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <PreviousVisits patientId={selectedPatientId} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NurseDashboard;
