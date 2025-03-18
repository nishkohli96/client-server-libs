import { products } from '@/data';
import { QueryGetProductByIdArgs } from '@/types';

export const productResolver = {
  Query: {
    getProducts: () => products,
    getProductById(parent, args: QueryGetProductByIdArgs, contextValue, info) {
      return products.find(product => product.id === args.productId);
    }
  }
};
