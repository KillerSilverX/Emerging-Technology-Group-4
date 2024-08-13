const Nurse = require('../models/Nurse');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const nurse = new Nurse(req.body);
    await nurse.save();
    res.status(201).json(nurse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const nurse = await Nurse.findOne({ email });
    if (!nurse || !(await nurse.comparePassword(password))) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: nurse._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Additional functions for entering vital signs, etc.
