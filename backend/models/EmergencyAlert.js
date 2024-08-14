const mongoose = require('mongoose');

const EmergencyAlertSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  alertMessage: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EmergencyAlert', EmergencyAlertSchema);
