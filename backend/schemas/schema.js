const { makeExecutableSchema } = require('@graphql-tools/schema');
const { merge } = require('lodash');
const nurseSchema = require('./nurseSchema');
const patientSchema = require('./patientSchema');
const nurseResolver = require('../resolvers/nurseResolver');
const patientResolver = require('../resolvers/patientResolver');

const schema = makeExecutableSchema({
  typeDefs: [nurseSchema, patientSchema],
  resolvers: merge(nurseResolver, patientResolver),
});

module.exports = schema;
