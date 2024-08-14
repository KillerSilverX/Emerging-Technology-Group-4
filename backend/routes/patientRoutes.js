// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const rewardController = require('../controllers/rewardController');
const fitnessController = require('../controllers/fitnessController');


router.post('/patients', patientController.register);
router.post('/patients/login', patientController.login);
router.get('/patients', patientController.getAllPatients);
router.post('/patients/alerts', patientController.createEmergencyAlert);
router.post('/daily-info', patientController.addDailyInfo);
router.get('/rewards/:patientId', rewardController.getRewardsAndGoals);
router.post('/fitness/complete', fitnessController.completeExercise);


module.exports = router;
