import { categories, products } from '@/data';
import { QueryResolvers, QueryGetProductByIdArgs, Product } from '@/types';

type ProductQueryResolver = Pick<
  QueryResolvers,
  'getProducts' | 'getProductById'
>;

// const productQuery: ProductQueryResolver = {
//   getProducts: () => products,
//   getProductById(_, args: QueryGetProductByIdArgs) {
//     return products.find(product => product.id === args.productId);
//   }
// }

export const productResolver = {
  Query: {
    getProducts: () => products,
    getProductById(_, args: QueryGetProductByIdArgs) {
      return products.find(product => product.id === args.productId);
    },
  },
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
