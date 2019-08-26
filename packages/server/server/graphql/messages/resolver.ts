import { IResolvers } from "apollo-server-express";
import { Message, User } from "../types";

const messages: Message[] = [];
const userMessage: { u_id: string; m_id: string }[] = [];

const resolver: IResolvers = {
  Query: {
    getMessages: () => messages
  }
};

export default resolver;
