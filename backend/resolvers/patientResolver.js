const Patient = require('../models/Patient');
const jwt = require('jsonwebtoken');

module.exports = {
  Query: {
    patients: async () => await Patient.find(),
    patient: async (_, { id }) => await Patient.findById(id),
  },
  Mutation: {
    registerPatient: async (_, { input }) => {
      const patient = new Patient(input);
      await patient.save();
      return patient;
    },
    loginPatient: async (_, { email, password }) => {
      const patient = await Patient.findOne({ email });
      if (!patient || !(await patient.comparePassword(password))) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      return { token };
    },
  },
};
