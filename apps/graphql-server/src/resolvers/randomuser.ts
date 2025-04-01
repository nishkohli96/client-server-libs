import { type GraphQLQueryResolver } from '@/types';

type RandomUserQueryResolver = Pick<
  GraphQLQueryResolver,
	'getRandomUsers'
>;

const randomUserQuery: RandomUserQueryResolver = {
  getRandomUsers: async(_, args, { dataSources }) => {
    const { numRecords } = args;
    return await dataSources.randomUserAPI.getRandomUsers(numRecords);
  },
};

export const randomUserResolver = {
  Query: randomUserQuery,
};
