import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('nurse');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const endpoint = userType === 'nurse' ? '/api/nurses' : '/api/patients';
      const response = await axios.post(`http://localhost:3000${endpoint}`, { name, email, password });
      setMessage('Registration successful!');
    } catch (err) {
      setMessage('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="glass-card">
        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
        {message && <p className="success-message text-center">{message}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="glass-input"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Register as</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="glass-input"
            >
              <option value="nurse">Nurse</option>
              <option value="patient">Patient</option>
            </select>
          </div>
          <button
            type="submit"
            className="glass-button"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
