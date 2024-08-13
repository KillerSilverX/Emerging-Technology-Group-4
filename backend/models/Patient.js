const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  condition: { type: String, required: true },
  nurseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Nurse' }
});

module.exports = mongoose.model('Patient', PatientSchema);
