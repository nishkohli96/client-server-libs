import { orders } from '@/data';
import { QueryGetOrderByIdArgs, QueryGetCustomerOrdersArgs } from '@/types';

export const orderResolver = {
  Query: {
    getOrders: () => orders,
    getOrderById: (_, args: QueryGetOrderByIdArgs) => {
      return orders.find(order => order.id === args.orderId);
    },
    getCustomerOrders: (_, args: QueryGetCustomerOrdersArgs) => {
      return orders.find(order => order.customerId === args.customerId);
    }
  }
};
