const express = require('express');
const router = express.Router();
const nurseController = require('../controllers/nurseController');

router.post('/nurses', nurseController.register);
router.post('/nurses/login', nurseController.login);

// Additional nurse-specific routes

module.exports = router;
