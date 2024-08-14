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
    <div className="form-container">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Login as</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="nurse">Nurse</option>
            <option value="patient">Patient</option>
          </select>
        </div>
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
