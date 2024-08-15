import React, { useState } from "react";
import axios from "axios";

function EmergencyAlertForm() {
  const [alertMessage, setAlertMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const patientId = localStorage.getItem("patientId"); // Obteniendo patientId del localStorage
      const response = await axios.post(
        "http://localhost:3000/api/patients/alerts",
        {
          patientId,
          alertMessage,
        }
      );
      setMessage("Emergency alert sent successfully!");
    } catch (err) {
      setMessage("Error sending emergency alert: " + err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        Send Emergency Alert
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
          Alert Message
        </label>
        <textarea
          value={alertMessage}
          onChange={(e) => setAlertMessage(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 text-lg"
          rows="4"
          placeholder="Type your alert message here..."
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-red-500 text-white py-3 px-4 rounded-md text-lg font-medium hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Send Alert
      </button>
    </form>
  );
}

export default EmergencyAlertForm;
