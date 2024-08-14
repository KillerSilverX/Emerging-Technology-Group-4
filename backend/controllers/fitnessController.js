// controllers/fitnessController.js
const Reward = require('../models/Reward');

exports.completeExercise = async (req, res) => {
  try {
    const { patientId, exerciseType, score } = req.body;

    let pointsEarned = 0;
    switch (exerciseType) {
      case 'jumpingJack':
        pointsEarned = Math.min(score, 20); // Máximo de 20 puntos
        break;
      case 'squatCounter':
        pointsEarned = Math.min(score, 20);
        break;
      case 'yogaPose':
        pointsEarned = Math.min(score * 2, 30); // 2 puntos por segundo, máximo 30 puntos
        break;
      case 'plankChallenge':
        pointsEarned = Math.min(score * 1, 30); // 1 punto por segundo, máximo 30 puntos
        break;
      default:
        pointsEarned = 5; // Valor predeterminado
    }

    const reward = await Reward.findOne({ patientId });
    if (!reward) {
      return res.status(404).json({ error: 'Reward record not found for this patient.' });
    }

    await reward.addPoints(pointsEarned);
    res.status(200).json({ message: 'Exercise completed, points added!', pointsEarned });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
