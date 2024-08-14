// src/components/FitnessGames.jsx
import React, { useState } from "react";
import axios from "axios";
import JumpingJackChallenge from "./games/JumpingJackChallenge";
import SquatCounter from "./games/SquatCounter";
import YogaPoseTrainer from "./games/YogaPoseTrainer";
import PlankChallenge from "./games/PlankChallenge";

function FitnessGames() {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameCompletion = async (exerciseType, score) => {
    try {
      const patientId = localStorage.getItem("patientId");
      await axios.post("http://localhost:3000/api/fitness/complete", {
        patientId,
        exerciseType,
        score,
      });
      alert(`You completed the ${exerciseType}! Score: ${score}`);
    } catch (err) {
      console.error("Error submitting score:", err);
      alert("There was an error submitting your score.");
    }
  };

  const renderSelectedGame = () => {
    switch (selectedGame) {
      case "jumpingJack":
        return (
          <JumpingJackChallenge
            onComplete={(score) => handleGameCompletion("jumpingJack", score)}
          />
        );
      case "squatCounter":
        return (
          <SquatCounter
            onComplete={(score) => handleGameCompletion("squatCounter", score)}
          />
        );
      case "yogaPose":
        return (
          <YogaPoseTrainer
            onComplete={(score) => handleGameCompletion("yogaPose", score)}
          />
        );
      case "plankChallenge":
        return (
          <PlankChallenge
            onComplete={(score) =>
              handleGameCompletion("plankChallenge", score)
            }
          />
        );
      default:
        return <p>Please select a game to start playing.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold text-gray-800 mb-8">
          Fitness Games
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <button
            className="bg-blue-500 text-white py-3 px-4 rounded-lg shadow-lg text-lg font-medium hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => setSelectedGame("jumpingJack")}
          >
            Jumping Jack Challenge
          </button>
          <button
            className="bg-green-500 text-white py-3 px-4 rounded-lg shadow-lg text-lg font-medium hover:bg-green-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => setSelectedGame("squatCounter")}
          >
            Squat Counter
          </button>
          <button
            className="bg-purple-500 text-white py-3 px-4 rounded-lg shadow-lg text-lg font-medium hover:bg-purple-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            onClick={() => setSelectedGame("yogaPose")}
          >
            Yoga Pose Trainer
          </button>
          <button
            className="bg-red-500 text-white py-3 px-4 rounded-lg shadow-lg text-lg font-medium hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={() => setSelectedGame("plankChallenge")}
          >
            Plank Challenge
          </button>
        </div>
        <div
          id="gameContainer"
          className="bg-white p-8 rounded-lg shadow-lg border border-gray-300"
        >
          {renderSelectedGame()}
        </div>
      </div>
    </div>
  );
}

export default FitnessGames;
