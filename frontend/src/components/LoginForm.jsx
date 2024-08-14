import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('nurse');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = userType === 'nurse' ? '/api/nurses/login' : '/api/patients/login';
      const response = await axios.post(`http://localhost:3000${endpoint}`, { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('nurseId', response.data.nurseId);
        localStorage.setItem('patientId', response.data.patientId);
        const dashboard = userType === 'nurse' ? '/nurse-dashboard' : '/patient-dashboard';
        navigate(dashboard);
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg">
      <div className="glass-card-dark">
        <h1 className="text-5xl font-extrabold mb-10 text-center gradient-text">Login</h1>
        {error && <p className="text-red-600 text-center mb-6">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-8 form-group">
            <label className="block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input-dark form-input"
              placeholder="ale@ale.ca"
              required
            />
          </div>
          <div className="mb-8 form-group">
            <label className="block text-lg font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input-dark form-input"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="mb-10 form-group">
            <label className="block text-lg font-medium mb-2">Login as</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="glass-input-dark form-input"
            >
              <option value="nurse">Nurse</option>
              <option value="patient">Patient</option>
            </select>
          </div>
          <button
            type="submit"
            className="glass-button-dark form-button"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
