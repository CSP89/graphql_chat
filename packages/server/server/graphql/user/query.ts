import { gql } from "apollo-server-express";
export default gql`
  type Query {
    users: [User!]
    user(id: String!): User!
  }
`;
