// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import NurseDashboard from "./components/NurseDashboard";
import PatientDashboard from "./components/PatientDashboard";
import FitnessGames from "./components/FitnessGames";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/dashboard" element={<PatientDashboard />} />
            <Route path="/nurse-dashboard" element={<NurseDashboard />} />
            <Route path="/fitness-games" element={<FitnessGames />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
