import { ApolloServer, mergeSchemas } from "apollo-server-express";

import messageSchema from "./message";
import userSchema from "./user";

export default new ApolloServer({
  schema: mergeSchemas({
    schemas: [messageSchema, userSchema]
  }),
  playground: true
});
