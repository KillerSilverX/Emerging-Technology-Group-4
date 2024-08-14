import React, { useState } from 'react';
import axios from 'axios';

function EmergencyAlertForm() {
  const [alertMessage, setAlertMessage] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const patientId = localStorage.getItem('patientId'); // Obteniendo patientId del localStorage
      const response = await axios.post('http://localhost:3000/api/patients/alerts', {
        patientId,
        alertMessage,
      });
      setMessage('Emergency alert sent successfully!');
    } catch (err) {
      setMessage('Error sending emergency alert');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Send Emergency Alert</h2>
      {message && <p>{message}</p>}
      <div className="mb-4">
        <label className="block mb-2">Alert Message</label>
        <textarea
          value={alertMessage}
          onChange={(e) => setAlertMessage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200"
      >
        Send Alert
      </button>
    </form>
  );
}

export default EmergencyAlertForm;
