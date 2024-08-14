const mongoose = require('mongoose');

const VitalSignsSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  nurseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Nurse', required: true },
  temperature: { type: Number, required: true },
  heartRate: { type: Number, required: true },
  bloodPressure: { type: String, required: true },
  respiratoryRate: { type: Number, required: true },
  visitDate: { type: Date, default: Date.now },
  conditions: [{ type: String }],
});

module.exports = mongoose.model('VitalSigns', VitalSignsSchema);
