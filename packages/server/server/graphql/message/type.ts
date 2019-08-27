import { gql } from "apollo-server-express";
export default gql`
  type Message {
    id: String
    text: String!
    userId: String!
    date: Date
  }
`;
