import { IResolvers, IResolverOptions } from "apollo-server-express";
import { Message } from "../types";
import MessageService from "../../service/messageService";

const messages: Message[] = [];
const messageService = new MessageService();

const resolver: IResolvers = {
  Query: {
    messages: () => Object.values(messageService.getMessages())
  },
  Mutation: {
    addMessage: (root, { userId, text }) =>
      messageService.addMessage(userId, text)
  },
  Subscription: {
    messageAdded: messageService.messageAdded
  }
};

export default resolver;
