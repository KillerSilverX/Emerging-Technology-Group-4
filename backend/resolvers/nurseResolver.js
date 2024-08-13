const Nurse = require('../models/Nurse');
const jwt = require('jsonwebtoken');

module.exports = {
  Query: {
    nurses: async () => await Nurse.find(),
    nurse: async (_, { id }) => await Nurse.findById(id),
  },
  Mutation: {
    registerNurse: async (_, { input }) => {
      const nurse = new Nurse(input);
      await nurse.save();
      return nurse;
    },
    loginNurse: async (_, { email, password }) => {
      const nurse = await Nurse.findOne({ email });
      if (!nurse || !(await nurse.comparePassword(password))) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ id: nurse._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      return { token };
    },
  },
};
