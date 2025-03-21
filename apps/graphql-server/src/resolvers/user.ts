import { Types } from 'mongoose';
import { users } from '@/data';
import {
  AdminSchema,
  CustomerSchema,
  QueryResolvers,
  MutationResolvers,
  UserRole
} from '@/types';

type UserQueryResolver = Pick<
  QueryResolvers,
  'getUsers' | 'getUserById'
>;
type UserMutation = Pick<MutationResolvers, 'createUser'>;

const userQuery: UserQueryResolver = {
  getUsers: () => {
    return users;
  },
  getUserById(_, args) {
    return users.find(user => user.id === args.id);
  }
};

const userMutation: UserMutation = {
  createUser(_, args) {
    const { type, name, email, manager, address } = args.userInfo;

    if (type !== UserRole.Admin && type !== UserRole.Customer) {
      throw new Error(`Invalid type: ${type}. Must be "${UserRole.Admin}" or "${UserRole.Customer}".`);
    }
    const newUserId = new Types.ObjectId().toString();
    if (type === UserRole.Admin) {
      if (address || address === null) {
        throw new Error('Admins cannot have an \'address\' field.');
      }
      const newAdmin = {
        id: newUserId,
        name,
        email,
        manager,
      };
      users.push(newAdmin);
      return newAdmin;
    }

    if (type === UserRole.Customer) {
      if (!address) {
        throw new Error('Customer must have an \'address\' field.');
      }
      if (manager || manager === null) {
        throw new Error('Customers cannot have a \'manager\' field.');
      }
      const newCustomer = {
        id: newUserId,
        name,
        email,
        address,
      };
      users.push(newCustomer);
      return newCustomer;
    }
    throw new Error('Invalid input data.');
  },
};

export const userResolver = {
  Query: userQuery,
  Mutation: userMutation,
  AdminOrCustomerSchema: {
    __resolveType(obj: AdminSchema | CustomerSchema) {
      if ('address' in obj) {
        return 'CustomerSchema';
      }
      if ('managerId' in obj) {
        return 'AdminSchema';
      }
      return null;
    },
  },
};
