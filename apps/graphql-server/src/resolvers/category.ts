import { categories } from '@/data';
import { QueryResolvers } from '@/types';

type CategoryQueryResolver = Pick<QueryResolvers, 'getCategories'>;

const categoryQuery: CategoryQueryResolver = {
  getCategories: () => categories,
};

export const categoryResolver = {
  Query: categoryQuery
};
