// models/Reward.js
const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  points: { type: Number, default: 0 },
  badges: [{ type: String }],
  goals: [
    {
      name: { type: String, required: true },
      pointsRequired: { type: Number, required: true },
      achieved: { type: Boolean, default: false }
    }
  ]
});

// models/Reward.js
RewardSchema.methods.addPoints = async function(points) {
  // Añadir puntos al total del paciente
  this.points += points;

  // Revisar si algún objetivo (meta) se ha cumplido
  this.goals.forEach(goal => {
    if (!goal.achieved && this.points >= goal.pointsRequired) {
      goal.achieved = true;
      this.badges.push(`Achieved: ${goal.name}`);
    }
  });

  // Guardar los cambios en la base de datos
  await this.save();
};


module.exports = mongoose.model('Reward', RewardSchema);
