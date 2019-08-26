import uuid from "uuid";

import { User, Message } from "../graphql/types";

class UserService {
  private static instace: UserService;

  private users: { [id: string]: User | undefined } = {};

  constructor() {
    if (UserService.instace !== undefined) {
      return UserService.instace;
    }
  }

  addUser = (name: string) => {
    const id = uuid();
    this.users[id] = {
      id,
      name
    };
  };

  addMessageToUser = (userId: string, message: Message) => {
    message.userId = userId;
    return (
      this.users[userId] &&
      message.id &&
      (this.users[userId].messages = {
        ...this.users[userId].messages,
        [message.id]: message
      })
    );
  };

  getUsers = () => {
    return this.users;
  };

  getUserById = (id: string) => {
    return this.users[id];
  };

  removeUserById = (id: string) => {
    return delete this.users[id];
  };

  removeMessageFromUserById = (userId: string, messageId: string) => {
    return (
      this.users[userId] &&
      this.users[userId].messages &&
      this.users[userId].messages[messageId] &&
      delete this.users[userId].messages[messageId]
    );
  };
}

export default UserService;
