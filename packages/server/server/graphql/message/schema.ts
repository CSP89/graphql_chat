import { makeExecutableSchema } from "apollo-server-express";

import query from "./query";
import type from "./type";
import resolver from "./resolver";

export default makeExecutableSchema({
  typeDefs: [type, query],
  resolvers: resolver
});
