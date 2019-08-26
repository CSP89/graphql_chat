import { IResolvers } from "apollo-server-express";
import { Message } from "../types";

const messages: Message[] = [];

const resolver: IResolvers = {
  Query: {
    messages: () => messages
  }
};

export default resolver;
