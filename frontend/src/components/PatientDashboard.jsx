// src/components/PatientDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import EmergencyAlertForm from './EmergencyAlertForm';
import DailyInfoForm from './DailyInfoForm';
import RewardSystem from './RewardSystem';
//import RewardProgress from './RewardProgress';


function PatientDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>
      <EmergencyAlertForm />
      <DailyInfoForm />
      <RewardSystem />
      {/* <RewardProgress /> */}
      <Link to="/fitness-games" className="block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 mt-4">
        Go to Fitness Games
      </Link>
    </div>
  );
}

export default PatientDashboard;
