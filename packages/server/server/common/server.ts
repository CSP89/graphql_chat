import express, { Application } from "express";
import path from "path";
import bodyParser from "body-parser";
import http from "http";
import os from "os";
import cookieParser from "cookie-parser";

import { ApolloServer } from "apollo-server-express";

import l from "./logger";

export default class ExpressServer {
  server: ApolloServer;

  app = express();

  constructor(server: ApolloServer) {
    this.server = server;
    const { app } = this;
    const root = path.normalize(__dirname + "/../..");
    server.applyMiddleware({ app });
    app.set("appPath", root + "client");
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || "100kb" }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || "100kb"
      })
    );
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));
  }

  listen(p: string | number = process.env.PORT): Application {
    const { app, server } = this;
    const welcome = port => () =>
      l.info(
        `up and running in ${process.env.NODE_ENV ||
          "development"} @: ${os.hostname()} on port: ${port}}`
      );
    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);
    httpServer.listen(p, welcome(p));
    return app;
  }
}
