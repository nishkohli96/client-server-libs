import { categories } from '@/data';

export const categoryResolver = {
  Query: {
    getCategories: () => categories,
  }
};
