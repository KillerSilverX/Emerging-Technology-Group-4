const express = require('express');
const router = express.Router();
const nurseRoutes = require('./nurseRoutes');
const patientRoutes = require('./patientRoutes');

router.use(nurseRoutes);
router.use(patientRoutes);

module.exports = router;
