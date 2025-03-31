import { categories } from '@/data';
import { type QueryResolvers, type MutationResolvers } from '@/types';

type CategoryQueryResolver = Pick<QueryResolvers, 'getCategories'>;
type CategoryMutation = Pick<MutationResolvers, 'createCategory'>;

const categoryQuery: CategoryQueryResolver = {
  getCategories: () => categories,
};

function generateCategoryId() {
  return `cat-0${Math.floor(Math.random() * 100)}`;
}

const categoryMutation: CategoryMutation = {
  createCategory: (_, args) => {
    const newCategory = {
      id: generateCategoryId(),
      name: args.categoryName
    };
    categories.push(newCategory);
    return newCategory;
  }
};

export const categoryResolver = {
  Query: categoryQuery,
  Mutation: categoryMutation
};
