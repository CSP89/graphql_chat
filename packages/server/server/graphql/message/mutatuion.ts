import { gql } from "apollo-server-express";
export default gql`
  type Mutation {
    addMessage(userId: String, text: String): Message
  }
`;
