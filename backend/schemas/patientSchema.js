const { gql } = require('apollo-server-express');

module.exports = gql`
  type Patient {
    id: ID!
    name: String!
    age: Int!
    condition: String!
    nurseId: ID!
  }

  input PatientInput {
    name: String!
    age: Int!
    condition: String!
    nurseId: ID!
  }

  type Query {
    patients: [Patient!]!
    patient(id: ID!): Patient
  }

  type Mutation {
    createPatient(input: PatientInput!): Patient!
    updatePatient(id: ID!, input: PatientInput!): Patient!
    deletePatient(id: ID!): Patient!
  }
`;
