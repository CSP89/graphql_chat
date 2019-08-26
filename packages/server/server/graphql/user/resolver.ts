import { IResolvers } from "apollo-server-express";
import UserService from "../../service/userService";

const userService = new UserService();

const resolver: IResolvers = {
  Query: {
    users: () => Object.values(userService.getUsers())
  },
  Mutation: {
    addUser: (root, { name }) => userService.addUser(name)
  },
  Subscription: {
    userAdded: {
      subscribe: userService.userAdded
    }
  }
};

export default resolver;
