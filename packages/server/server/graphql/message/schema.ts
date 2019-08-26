import { makeExecutableSchema } from "apollo-server-express";

import query from "./query";
import type from "./type";
import subscribtion from "./subscribtion";
import resolver from "./resolver";

export default makeExecutableSchema({
  typeDefs: [type, query, subscribtion],
  resolvers: resolver
});
