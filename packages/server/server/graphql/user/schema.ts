import { makeExecutableSchema } from "apollo-server-express";

import query from "./query";
import mutation from "./mutation";
import type from "./type";
import resolver from "./resolver";

export default makeExecutableSchema({
  typeDefs: [query, mutation, type],
  resolvers: resolver
});
