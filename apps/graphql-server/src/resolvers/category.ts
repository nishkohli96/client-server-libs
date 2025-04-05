import { categories } from '@/data';
import { type GraphQLQueryResolver, type GraphQLMutationResolver } from '@/types';

type CategoryQueryResolver = Pick<GraphQLQueryResolver, 'getCategories'>;
type CategoryMutation = Pick<GraphQLMutationResolver, 'createCategory'>;

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
