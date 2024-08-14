// src/components/PatientDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import EmergencyAlertForm from "./EmergencyAlertForm";
import DailyInfoForm from "./DailyInfoForm";
import RewardSystem from "./RewardSystem";
import RewardProgress from "./RewardProgress";

function PatientDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold text-gray-800 mb-8">
          Patient Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <EmergencyAlertForm />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <DailyInfoForm />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-2">
            <RewardSystem />
          </div>

          {/* <div className="bg-white p-6 rounded-lg shadow-lg">
            <RewardProgress />
          </div> */}
        </div>

        <div className="mt-8 flex justify-end">
          <Link
            to="/fitness-games"
            className="inline-block bg-green-500 text-white py-3 px-6 rounded-lg shadow hover:bg-green-600 transition duration-200"
          >
            Go to Fitness Games
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
