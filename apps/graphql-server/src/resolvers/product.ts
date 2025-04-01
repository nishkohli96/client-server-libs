import { categories, products } from '@/data';
import {
  type Product,
  type QueryGetProductByIdArgs,
  type GraphQLMutationResolver,
  type ProductSchema,
} from '@/types';

type ProductMutation = Pick<GraphQLMutationResolver, 'createProduct'>;

/**
 * I used the typing in users query, but not in this case, as
 * there would be a type mismatch in the products array and the
 * result expected by GraphQL schema.
 *
 * Either I can modify the products array to return the correct response
 * or let GraphQL handle Product.category Resolver which is preferred as:
 * ✔ Efficient & Optimized: Only resolves category when explicitly queried.
 * ✔ Works dynamically: If category is removed or changed, the resolver handles it.
 */
const productQuery = {
  getProducts: () => products,
  getProductById(_, args: QueryGetProductByIdArgs) {
    return products.find(product => product.id === args.productId);
  }
};

function generateProductId() {
  return `prod-0${Math.floor(Math.random() * 100)}`;
}

const productMutation: ProductMutation = {
  createProduct(_, args) {
    const {
      name,
      description,
      price,
      categoryId,
    } = args.productInput;
    const productCategory = categories.find(category => category.id === categoryId);
    if(!productCategory) {
      throw new Error('Invalid Product Category');
    }
    const productDetails = {
      id: generateProductId(),
      name,
      description,
      price,
    };
    products.push({
      ...productDetails,
      categoryId
    });
    return {
      ...productDetails,
      category: productCategory
    };
  }
};

export const productResolver = {
  Query: productQuery,
  Mutation: productMutation,
  ProductSchema: {
    /**
     * Product.category resolver uses parent to fetch the category,
     * the key "Product" must match the schema name, else it would
     * result in an error.
     * Also, the "parent" arg in this case, actually yields the whole
     * Product object that matches the filtered result.
     *
     * PS: For the mutation, if I'm directly returning the category,
     * this resolver function was still being computed by GraphQL.
     * Hence I needed to add a secondary condition in it to prevent
     * "Cannot return null for non-nullable field ProductSchema.category"
     * error.
     */
    category: (parent: Product | ProductSchema) => {
      if('category' in parent) {
        return parent.category;
      }
      return categories.find(c => c.id === parent.categoryId);
    },
  },
};
