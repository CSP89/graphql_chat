import { makeExecutableSchema } from "apollo-server-express";

import query from "./query";
import mutation from "./mutation";
import type from "./type";
import subscription from "./subscribtion";
import resolver from "./resolver";

export default makeExecutableSchema({
  typeDefs: [query, mutation, type, subscription],
  resolvers: resolver
});
