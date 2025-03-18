import { products } from '@/data';

export const productResolver = {
  Query: {
    getProducts: () => products,
  }
};
