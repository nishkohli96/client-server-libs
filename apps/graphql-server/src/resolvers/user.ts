import { users } from '@/data';

export const userResolver = {
  Query: {
    getUsers: () => users,
  }
};
