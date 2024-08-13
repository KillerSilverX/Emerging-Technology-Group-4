const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/patients', patientController.register);
router.post('/patients/login', patientController.login);

// Additional patient-specific routes

module.exports = router;
