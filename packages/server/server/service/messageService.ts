import uuid from "uuid";

import { Message } from "../graphql/types";
import UserService from "./userService";

class MessageService {
  private static instace: MessageService;

  private userService = new UserService();
  private messages: { [id: string]: Message } = {};

  constructor() {
    if (MessageService.instace !== undefined) {
      return MessageService.instace;
    }
    MessageService.instace = this;
  }

  addMessage = (userId: string, text: string) => {
    const id = uuid();
    const message = { id, text, userId };
    this.messages[id] = message;
    this.userService.addMessageToUser(userId, message);
    return message;
  };

  updateMessage = (message: Message) => {
    const m = this.messages[message.id];
    Object.keys({ ...message, m }).forEach(key => {
      m[key] = message[key];
    });
  };

  removeMessage = (messageId: string) => {
    const message = this.messages[messageId];
    return (
      message.userId &&
      this.userService.removeMessageFromUserById(message.userId, messageId) &&
      delete this.messages[messageId]
    );
  };
}

export default UserService;
