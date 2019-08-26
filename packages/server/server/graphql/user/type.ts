import { gql } from "apollo-server-express";
export default gql`
  type User {
    id: String
    name: String!
    messages: [Message]
  }
  type Message {
    id: Int
    text: String!
  }
`;
