import { ApolloServer, mergeSchemas } from "apollo-server-express";

import messageResolver, { schema as messageSchema } from "./message";
import userResolver, { schema as userSchema } from "./user";

export default new ApolloServer({
  schema: mergeSchemas({
    schemas: [messageSchema, userSchema],
    resolvers: [messageResolver, userResolver]
  }),
  playground: true
});
