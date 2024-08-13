const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const patient = await Patient.findOne({ email });
    if (!patient || !(await patient.comparePassword(password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Additional functions for patient-specific actions.
