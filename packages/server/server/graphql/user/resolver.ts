import { IResolvers } from "apollo-server-express";
import UserService from "../../service/userService";

const userService = new UserService();

const resolver: IResolvers = {
  Query: {
    users: () => {
      return Object.values(userService.getUsers());
    }
  },
  Mutation: {
    addUser: (root, { name }) => {
      const user = userService.addUser(name);
      console.log(user);
      return user;
    }
  }
};

export default resolver;
