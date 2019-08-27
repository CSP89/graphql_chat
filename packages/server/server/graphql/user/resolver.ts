import { IResolvers } from "apollo-server-express";
import UserService from "../../service/userService";

const userService = new UserService();

const resolver: IResolvers = {
  Query: {
    users: () => Object.values(userService.getUsers()),
    user: (root, { id }) => userService.getUserById(id)
  },
  Mutation: {
    addUser: (root, { name }) => userService.addUser(name)
  },
  Subscription: {
    userAdded: userService.userAdded
  }
};

export default resolver;
