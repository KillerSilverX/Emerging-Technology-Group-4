// controllers/rewardController.js
const Reward = require('../models/Reward');


exports.getRewardsAndGoals = async (req, res) => {
  try {
    const { patientId } = req.params;
    const reward = await Reward.findOne({ patientId });

    if (!reward) {
      return res.status(404).json({ error: 'No rewards found for this patient.' });
    }

    const goals = reward.goals.map(goal => ({
      name: goal.name,
      pointsRequired: goal.pointsRequired,
      achieved: goal.achieved,
      pointsRemaining: goal.pointsRequired - reward.points > 0 ? goal.pointsRequired - reward.points : 0
    }));

    res.status(200).json({
      points: reward.points,
      badges: reward.badges,
      goals
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.completeExercise = async (req, res) => {
    try {
      const { patientId, exerciseType } = req.body;
  
      let pointsEarned = 0;
      switch (exerciseType) {
        case 'jumpingJack':
          pointsEarned = 10;
          break;
        case 'squatCounter':
          pointsEarned = 10;
          break;
        case 'yogaPose':
          pointsEarned = 15;
          break;
        case 'plankChallenge':
          pointsEarned = 20;
          break;
        default:
          pointsEarned = 5;
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
