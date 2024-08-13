const Patient = require('../models/Patient');

module.exports = {
  Query: {
    patients: async () => await Patient.find(),
    patient: async (_, { id }) => await Patient.findById(id),
  },
  Mutation: {
    createPatient: async (_, { input }) => {
      const patient = new Patient(input);
      await patient.save();
      return patient;
    },
    updatePatient: async (_, { id, input }) => {
      return await Patient.findByIdAndUpdate(id, input, { new: true });
    },
    deletePatient: async (_, { id }) => {
      return await Patient.findByIdAndRemove(id);
    },
  },
};
