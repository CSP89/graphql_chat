import { IResolvers } from "apollo-server-express";
import { Message } from "../types";
import MessageService from "../../service/messageService";

const messages: Message[] = [];
const messageService = new MessageService();

const resolver: IResolvers = {
  Query: {
    messages: () => messages
  },
  Subscription: {
    messageAdded: {
      subscribe: messageService.messageAdded
    }
  }
};

export default resolver;
