import { IResolvers, IResolverOptions } from "apollo-server-express";
import { Message } from "../types";
import MessageService from "../../service/messageService";
import { DateScalar } from "../utils/scalar/date";

const messages: Message[] = [];
const messageService = new MessageService();

const resolver: IResolvers = {
  Query: {
    messages: () => Object.values(messageService.getMessages())
  },
  Mutation: {
    addMessage: (root, data, test) => {
      const { userId, text } = data;
      console.log(root, data, test);
      return messageService.addMessage(userId, text);
    }
  },
  Subscription: {
    messageAdded: messageService.messageAdded
  },
  Date: DateScalar
};

export default resolver;
