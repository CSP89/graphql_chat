import { GraphQLScalarType } from "graphql";

import { gql } from "apollo-server-express";

export const DateScalar: GraphQLScalarType = new GraphQLScalarType({
  name: "Date",
  description: "Date",
  serialize(value: string) {
    return new Date(value);
  },
  parseValue(value: Date) {
    return value.toISOString();
  }
});

export const documentNode = gql`
  scalar Date
`;
