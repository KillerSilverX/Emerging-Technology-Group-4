// src/components/DailyInfoForm.jsx
import React, { useState } from "react";
import axios from "axios";

function DailyInfoForm() {
  const [pulseRate, setPulseRate] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [weight, setWeight] = useState("");
  const [temperature, setTemperature] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const patientId = localStorage.getItem("patientId");
      const response = await axios.post(
        "http://localhost:3000/api/daily-info",
        {
          patientId,
          pulseRate,
          bloodPressure,
          weight,
          temperature,
          respiratoryRate,
        }
      );
      setMessage("Daily information saved successfully!");
    } catch (err) {
      setMessage("Error saving daily information");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Enter Daily Information
      </h2>
      {message && (
        <p
          className={`mb-4 text-center text-lg ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Pulse Rate (bpm)
        </label>
        <input
          type="number"
          value={pulseRate}
          onChange={(e) => setPulseRate(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
          placeholder="Enter your pulse rate"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Blood Pressure (mmHg)
        </label>
        <input
          type="text"
          value={bloodPressure}
          onChange={(e) => setBloodPressure(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
          placeholder="Enter your blood pressure"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Weight (kg)
        </label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
          placeholder="Enter your weight"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Temperature (°C)
        </label>
        <input
          type="number"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
          placeholder="Enter your temperature"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Respiratory Rate (breaths/min)
        </label>
        <input
          type="number"
          value={respiratoryRate}
          onChange={(e) => setRespiratoryRate(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
          placeholder="Enter your respiratory rate"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-3 px-4 rounded-md text-lg font-medium hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Save Daily Information
      </button>
    </form>
  );
}

export default DailyInfoForm;
