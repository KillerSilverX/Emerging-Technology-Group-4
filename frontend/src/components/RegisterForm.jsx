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
    <div className="form-container">
      <h1>Register</h1>
      {message && <p className={message.includes('successful') ? 'success-message' : 'error-message'}>{message}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          <label>Register as</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="nurse">Nurse</option>
            <option value="patient">Patient</option>
          </select>
        </div>
        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
