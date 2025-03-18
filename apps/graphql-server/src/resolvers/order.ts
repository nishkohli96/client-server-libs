import { orders, users, products } from '@/data';
import {
  QueryGetOrderByIdArgs,
  QueryGetCustomerOrdersArgs,
  Order
} from '@/types';

const orderQuery = {
  getOrders: () => orders,
  getOrderById: (_, args: QueryGetOrderByIdArgs) => {
    return orders.find(order => order.id === args.orderId);
  },
  getCustomerOrders: (_, args: QueryGetCustomerOrdersArgs) => {
    return orders.find(order => order.customerId === args.customerId);
  }
};

export const orderResolver = {
  Query: orderQuery,
  Order: {
    customer: (parent: Order) => {
      return users.find(user => user.id === parent.customerId);
    },
    products: (parent: Order) => {
      return products.filter(product => parent.productIds.includes(product.id));
    }
  }
};
