import { orders } from '@/data';
import { QueryGetOrderByIdArgs, QueryGetCustomerOrdersArgs } from '@/types';

export const orderResolver = {
  Query: {
    getOrders: () => orders,
    getOrderById: (parent, args: QueryGetOrderByIdArgs, contextValue, info) => {
      return orders.find(order => order.id === args.orderId);
    },
    getCustomerOrders: (
      parent,
      args: QueryGetCustomerOrdersArgs,
      contextValue,
      info
    ) => {
      return orders.find(order => order.customerId === args.customerId);
    }
  }
};
