import { IResolvers } from "apollo-server-express";
import { User } from "../types";

const users: User[] = [];

const resolver: IResolvers = {
  Query: {
    users: () => users
  }
};

export default resolver;
