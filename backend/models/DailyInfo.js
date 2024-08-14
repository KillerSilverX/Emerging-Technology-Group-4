// models/DailyInfo.js
const mongoose = require('mongoose');

const DailyInfoSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  pulseRate: { type: Number, required: true },
  bloodPressure: { type: String, required: true },
  weight: { type: Number, required: true },
  temperature: { type: Number, required: true },
  respiratoryRate: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DailyInfo', DailyInfoSchema);
