import { gql } from "apollo-server-express";
export default gql`
  type Mutation {
    addUser(name: String): User
  }
`;
