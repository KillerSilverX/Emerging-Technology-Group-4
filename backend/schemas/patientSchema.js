const { gql } = require('apollo-server-express');

module.exports = gql`
  type Patient {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Token {
    token: String!
  }

  input PatientInput {
    name: String!
    email: String!
    password: String!
  }

  type Query {
    patients: [Patient!]!
    patient(id: ID!): Patient
  }

  type Mutation {
    registerPatient(input: PatientInput!): Patient!
    loginPatient(email: String!, password: String!): Token!
  }
`;
