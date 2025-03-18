import { categories, products } from '@/data';
import { QueryGetProductByIdArgs, Product } from '@/types';

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

export const productResolver = {
  Query: productQuery,
  Product: {
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
