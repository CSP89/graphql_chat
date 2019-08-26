import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  mergeSchemas,
  gql
} from "apollo-server-express";

import query from "./query";
import type from "./type";

export default makeExecutableSchema({
  typeDefs: [type, query]
});
