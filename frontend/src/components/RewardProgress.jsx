// src/components/RewardProgress.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RewardProgress() {
  const [rewards, setRewards] = useState({ points: 0, goals: [] });

  useEffect(() => {
    const fetchRewards = async () => {
      const patientId = localStorage.getItem('patientId');
      const response = await axios.get(`http://localhost:3000/api/rewards/${patientId}`);
      setRewards(response.data);
    };
    fetchRewards();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Reward Progress</h2>
      <p>Total Points: {rewards.points}</p>
      <h3 className="text-xl font-bold mb-2">Goals</h3>
      <ul>
        {rewards.goals.map((goal, index) => (
          <li key={index} className={`mb-2 ${goal.achieved ? 'text-green-500' : 'text-gray-700'}`}>
            {goal.name} - {goal.pointsRequired} points ({goal.achieved ? 'Achieved' : `${goal.pointsRequired - rewards.points} points to go`})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RewardProgress;
