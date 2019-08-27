import { makeExecutableSchema } from "apollo-server-express";

import query from "./query";
import type from "./type";
import mutation from "./mutatuion";
import subscribtion from "./subscribtion";
import resolver from "./resolver";

export default makeExecutableSchema({
  typeDefs: [type, query, mutation, subscribtion],
  resolvers: resolver
});
