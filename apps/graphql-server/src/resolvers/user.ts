import { users } from '@/data';
import { QueryGetUserByIdArgs } from '@/types';

export const userResolver = {
  Query: {
    getUsers: () => users,
    getUserById(parent, args: QueryGetUserByIdArgs, contextValue, info) {
      return users.find(user => user.id === args.id);
    }
  }
};
