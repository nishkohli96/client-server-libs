import { users } from '@/data';
import { AdminSchema, CustomerSchema, QueryResolvers } from '@/types';

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
  Query: userQuery,
  // AdminOrCustomerSchema: {
  //   __resolveType(obj: AdminSchema | CustomerSchema) {
  //     if ('address' in obj) {
  //       return 'CustomerSchema'; // If `address` exists, it's a Customer
  //     }
  //     if ('manager' in obj) {
  //       return 'AdminSchema'; // If `manager` exists, it's an Admin
  //     }
  //     return null;
  //   },
  // },
};
