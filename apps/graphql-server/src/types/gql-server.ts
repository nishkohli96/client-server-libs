import type RandomUserAPI from '@/api/randomuser';
import {
  type RandomUser,
  type QueryResolvers as BaseQueryResolver,
  type MutationResolvers as BaseMutationResolver,
} from '@/types';

export type GraphQLServerContext = {
  dataSources: {
    randomUserAPI: RandomUserAPI;
  };
};

/**
 * Similarly define typed resolvers for both resolver types and use them,
 * instead of directly importing from "types/graphql.ts"
 */
export type GraphQLQueryResolver = BaseQueryResolver<GraphQLServerContext>;

export type GraphQLMutationResolver = BaseMutationResolver<GraphQLServerContext>;

export type RandomUserAPIResponse = {
	results: RandomUser[];
	info: object;
};
