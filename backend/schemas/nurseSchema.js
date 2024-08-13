const { gql } = require('apollo-server-express');

module.exports = gql`
  type Nurse {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Token {
    token: String!
  }

  input NurseInput {
    name: String!
    email: String!
    password: String!
  }

  type Query {
    nurses: [Nurse!]!
    nurse(id: ID!): Nurse
  }

  type Mutation {
    registerNurse(input: NurseInput!): Nurse!
    loginNurse(email: String!, password: String!): Token!
  }
`;
