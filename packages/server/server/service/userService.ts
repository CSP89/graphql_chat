import uuid from "uuid";
import { PubSub } from "apollo-server-express";

import { User } from "../graphql/types";

class UserService {
  private static instace: UserService;

  private users: { [id: string]: User | undefined } = {};
  private pubSub = new PubSub();

  constructor() {
    if (UserService.instace !== undefined) {
      return UserService.instace;
    }
  }

  addUser = (name: string) => {
    const id = uuid();
    const user = {
      id,
      name
    };
    this.users[id] = user;
    this.pubSub.publish("userAdded", { userAdded: user });
    return this.users[id];
  };

  userAdded = () => this.pubSub.asyncIterator(["userAdded"]);

  getUsers = () => {
    return this.users;
  };

  getUserById = (id: string) => {
    return this.users[id];
  };

  removeUserById = (id: string) => {
    this.pubSub.publish("userRemoved", { id });
    return delete this.users[id];
  };
}

export default UserService;
