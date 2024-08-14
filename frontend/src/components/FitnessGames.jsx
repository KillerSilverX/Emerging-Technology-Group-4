// src/components/FitnessGames.jsx
import React, { useState } from 'react';
import axios from 'axios';
import JumpingJackChallenge from './games/JumpingJackChallenge';
import SquatCounter from './games/SquatCounter';
import YogaPoseTrainer from './games/YogaPoseTrainer';
import PlankChallenge from './games/PlankChallenge';

function FitnessGames() {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameCompletion = async (exerciseType, score) => {
    try {
      const patientId = localStorage.getItem('patientId');
      await axios.post('http://localhost:3000/api/fitness/complete', {
        patientId,
        exerciseType,
        score
      });
      alert(`You completed the ${exerciseType}! Score: ${score}`);
    } catch (err) {
      console.error('Error submitting score:', err);
      alert('There was an error submitting your score.');
    }
  };

  const renderSelectedGame = () => {
    switch (selectedGame) {
      case 'jumpingJack':
        return <JumpingJackChallenge onComplete={(score) => handleGameCompletion('jumpingJack', score)} />;
      case 'squatCounter':
        return <SquatCounter onComplete={(score) => handleGameCompletion('squatCounter', score)} />;
      case 'yogaPose':
        return <YogaPoseTrainer onComplete={(score) => handleGameCompletion('yogaPose', score)} />;
      case 'plankChallenge':
        return <PlankChallenge onComplete={(score) => handleGameCompletion('plankChallenge', score)} />;
      default:
        return <p>Please select a game to start playing.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Fitness Games</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => setSelectedGame('jumpingJack')}
        >
          Jumping Jack Challenge
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={() => setSelectedGame('squatCounter')}
        >
          Squat Counter
        </button>
        <button
          className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
          onClick={() => setSelectedGame('yogaPose')}
        >
          Yoga Pose Trainer
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={() => setSelectedGame('plankChallenge')}
        >
          Plank Challenge
        </button>
      </div>
      <div id="gameContainer" className="border-2 border-gray-300 p-4 rounded">
        {renderSelectedGame()}
      </div>
    </div>
  );
}

export default FitnessGames;
