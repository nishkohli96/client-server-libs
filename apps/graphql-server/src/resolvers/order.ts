import { orders, users, products } from '@/data';
import {
  QueryGetOrderByIdArgs,
  QueryGetCustomerOrdersArgs,
  Order,
  CreditCardSchema,
  PayPalSchema
} from '@/types';

const orderQuery = {
  getOrders: () => orders,
  getOrderById: (_, args: QueryGetOrderByIdArgs) => {
    return orders.find(order => order.id === args.orderId);
  },
  getCustomerOrders: (_, args: QueryGetCustomerOrdersArgs) => {
    return orders.filter(order => order.customerId === args.customerId);
  }
};

export const orderResolver = {
  Query: orderQuery,
  OrderSchema: {
    customer: (parent: Order) => {
      return users.find(user => user.id === parent.customerId);
    },
    products: (parent: Order) => {
      return products.filter(product => parent.productIds.includes(product.id));
    }
  },
  PaymentMethod: {
    __resolveType(obj: CreditCardSchema | PayPalSchema) {
      if ('cardNumber' in obj) {
        return 'CreditCardSchema';
      }
      if ('email' in obj) {
        return 'PayPalSchema';
      }
      return null;
    },
  },
};
