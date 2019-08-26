import { ApolloServer } from "apollo-server-express";
import fs from "fs";

import messagesResolver from "./messages/resolver";

export default new ApolloServer({
  typeDefs: fs.readFileSync(__dirname + "/schema.gql").toString(),
  resolvers: [messagesResolver],
  playground: true
});
