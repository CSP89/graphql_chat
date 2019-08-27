import uuid from "uuid";
import { PubSub, IResolverOptions } from "apollo-server-express";

import { Message } from "../graphql/types";
import { subscribe } from "graphql";

class MessageService {
  private static instace: MessageService;

  private messages: { [id: string]: Message } = {};
  private pubSub = new PubSub();

  constructor() {
    if (MessageService.instace !== undefined) {
      return MessageService.instace;
    }
    MessageService.instace = this;
  }

  getMessages = () => this.messages;

  addMessage = (userId: string, text: string) => {
    console.log(userId, text);
    const id = uuid();
    const message = { id, text, userId, date: new Date() };
    this.messages[id] = message;
    console.log("addMessage");
    this.pubSub.publish("messageAdded", { message });
    return message;
  };

  messageAdded: IResolverOptions = {
    subscribe: () => this.pubSub.asyncIterator(["messageAdded"])
  };

  updateMessage = (message: Message) => {
    this.pubSub.publish("messageUpdated", { message });
    return (this.messages[message.id] = message);
  };

  removeMessage = (messageId: string) => {
    this.pubSub.publish("messageRemoved", { id: messageId });
    return delete this.messages[messageId];
  };
}

export default MessageService;
