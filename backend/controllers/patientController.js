// controllers/patientController.js
const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');
const EmergencyAlert = require('../models/EmergencyAlert');
const DailyInfo = require('../models/DailyInfo');
const Reward = require('../models/Reward');

const globalGoals = [
  { name: 'First Steps', pointsRequired: 10, achieved: false },
  { name: 'Getting Started', pointsRequired: 25, achieved: false },
  { name: 'On the Way', pointsRequired: 50, achieved: false },
  { name: 'Halfway There', pointsRequired: 100, achieved: false },
  { name: 'Strong Progress', pointsRequired: 200, achieved: false },
  { name: 'Dedicated', pointsRequired: 500, achieved: false },
  { name: 'Champion', pointsRequired: 1000, achieved: false },
];

exports.register = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();

    const reward = new Reward({
      patientId: patient._id,
      goals: globalGoals.map(goal => ({ ...goal })),
    });
    await reward.save();

    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });
    if (!patient || !(await patient.comparePassword(password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.status(200).json({ token, patientId: patient._id  });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().select('name _id'); // Get Name and ID
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createEmergencyAlert = async (req, res) => {
  try {
    const { patientId, alertMessage } = req.body;
    const alert = new EmergencyAlert({ patientId, alertMessage });
    await alert.save();
    res.status(201).json({ message: 'Emergency alert sent successfully!', alert });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addDailyInfo = async (req, res) => {
  try {
    const { patientId, pulseRate, bloodPressure, weight, temperature, respiratoryRate } = req.body;
    const dailyInfo = new DailyInfo({ patientId, pulseRate, bloodPressure, weight, temperature, respiratoryRate });
    await dailyInfo.save();

    // Actualizar sistema de recompensas
    let reward = await Reward.findOne({ patientId });
    if (!reward) {
      reward = new Reward({ patientId, goals: globalGoals.map(goal => ({ ...goal })) });
    }
    await reward.addPoints(10); // Añadir puntos y verificar metas

    res.status(201).json({ message: 'Daily information saved successfully!', dailyInfo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getRewards = async (req, res) => {
  try {
    const { patientId } = req.params;
    const reward = await Reward.findOne({ patientId });
    res.status(200).json(reward);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
