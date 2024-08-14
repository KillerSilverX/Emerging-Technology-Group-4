// routes/nurse.js
const express = require('express');
const router = express.Router();
const vitalSignsController = require('../controllers/vitalSignsController');
const nurseController = require('../controllers/nurseController');

router.post('/nurses', nurseController.register);
router.post('/nurses/login', nurseController.login);

// Rutas de signos vitales
router.post('/vitals', vitalSignsController.addVitalSigns);
router.get('/vitals/:patientId', vitalSignsController.getVitalSignsByPatient);

module.exports = router;