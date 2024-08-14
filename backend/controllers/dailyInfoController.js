// controllers/dailyInfoController.js
const Reward = require('../models/Reward');

exports.addDailyInfo = async (req, res) => {
  try {
    const { patientId, pulseRate, bloodPressure, weight, temperature, respiratoryRate } = req.body;

    let pointsEarned = 0;
    if (pulseRate) pointsEarned += 5;
    if (bloodPressure) pointsEarned += 5;
    if (weight) pointsEarned += 5;
    if (temperature) pointsEarned += 5;
    if (respiratoryRate) pointsEarned += 5;

    const reward = await Reward.findOne({ patientId });
    if (!reward) {
      return res.status(404).json({ error: 'Reward record not found for this patient.' });
    }

    await reward.addPoints(pointsEarned);

    res.status(200).json({ message: 'Daily information saved, points added!', pointsEarned });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
