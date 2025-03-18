import { orders } from '@/data';

export const orderResolver = {
  Query: {
    getOrders: () => orders,
    getOrderById: (parent, args, contextValue, info) => {
    }
  }
};
