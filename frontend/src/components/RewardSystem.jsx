// src/components/RewardSystem.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RewardSystem() {
  const [points, setPoints] = useState(0);
  const [nextGoal, setNextGoal] = useState(null);
  const [completedGoals, setCompletedGoals] = useState([]);

  useEffect(() => {
    const fetchRewardsAndGoals = async () => {
      try {
        const patientId = localStorage.getItem('patientId');
        const response = await axios.get(`http://localhost:3000/api/rewards/${patientId}`);
        
        const sortedGoals = response.data.goals.sort((a, b) => a.pointsRequired - b.pointsRequired);
        const nextUnachievedGoal = sortedGoals.find(goal => !goal.achieved);
        const achievedGoals = sortedGoals.filter(goal => goal.achieved);

        setPoints(response.data.points);
        setNextGoal(nextUnachievedGoal);
        setCompletedGoals(achievedGoals);
      } catch (err) {
        console.error('Error fetching rewards and goals:', err);
      }
    };

    fetchRewardsAndGoals();
  }, []);

  const renderGoalProgress = () => {
    if (!nextGoal) {
      return points > 0 ? (
        <p className="text-green-500">All goals achieved!</p>
      ) : (
        <p className="text-gray-500">No goals achieved yet. Start earning points to unlock rewards!</p>
      );
    }

    const progress = (points / nextGoal.pointsRequired) * 100;

    return (
      <div className="mb-4">
        <p className="font-medium mb-2">
          Next Goal: {nextGoal.name} ({points}/{nextGoal.pointsRequired} points)
        </p>
        <div className="w-full bg-gray-200 rounded-full h-8">
          <div
            className="bg-blue-500 h-8 rounded-full"
            style={{ width: `${progress > 100 ? 100 : progress}%` }}
          ></div>
        </div>
        {progress >= 100 && (
          <p className="text-green-500 mt-2">Goal Achieved! New goal activated.</p>
        )}
      </div>
    );
  };

  const renderCompletedGoals = () => {
    if (completedGoals.length === 0) {
      return <p className="text-gray-500">No goals achieved yet.</p>;
    }

    return (
      <ul className="list-disc list-inside mb-4">
        {completedGoals.map((goal, index) => (
          <li key={index} className="text-green-600">
            <p className="font-medium">{goal.name} - Achieved!</p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Your Rewards</h2>
      {renderGoalProgress()}
      <h3 className="text-xl font-semibold mb-4">Completed Goals</h3>
      {renderCompletedGoals()}
    </div>
  );
}

export default RewardSystem;
