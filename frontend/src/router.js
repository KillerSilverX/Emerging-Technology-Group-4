import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import NurseDashboard from './components/NurseDashboard';
import PatientDashboard from './components/PatientDashboard';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/nurse-dashboard" element={<NurseDashboard />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
      </Routes>
    </Router>
  );
}
