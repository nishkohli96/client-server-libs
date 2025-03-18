import { categories, products } from '@/data';
import {
  Product,
  QueryGetProductByIdArgs,
  MutationResolvers,
} from '@/types';

type ProductMutation = Pick<MutationResolvers, 'createProduct'>;

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
      price
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
     */
    category: (parent: Product) => {
      return categories.find(c => c.id === parent.categoryId);
    },
  },
};
