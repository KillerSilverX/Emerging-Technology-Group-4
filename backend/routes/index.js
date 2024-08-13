const express = require('express');
const router = express.Router();
const nurseController = require('../controllers/nurseController');
const patientController = require('../controllers/patientController');

// Define routes here
router.post('/nurses', nurseController.register);
router.post('/nurses/login', nurseController.login);
router.get('/patients', patientController.getAll);
router.post('/patients', patientController.create);

module.exports = router;
