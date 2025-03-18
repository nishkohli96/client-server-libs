import { users } from '@/data';
import { QueryResolvers } from '@/types';

type UserQueryResolver = Pick<
  QueryResolvers,
  'getUsers' | 'getUserById'
>;

const userQuery: UserQueryResolver = {
  getUsers: () => users,
  getUserById(parent, args) {
    return users.find(user => user.id === args.id);
  }
};

export const userResolver = {
  Query: userQuery
};
