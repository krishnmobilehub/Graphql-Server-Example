const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    isUsernameAvailable(username: String!): Boolean
    initiatePhoneNumberVerification(phoneNumber: String!,code: String!): Boolean!
    user(id: ID!): User
  }

  type Mutation {
    createUser(username: String!, password: String!, phoneNumber: String!,verificationCode: String!): String!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    phoneNumber: String!
    verificationCode: String!,
    createdAt: String!
    updatedAt: String!
  }

`;

module.exports = typeDefs;
