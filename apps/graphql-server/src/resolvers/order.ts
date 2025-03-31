import { v6 as UUIDv6 } from 'uuid';
import { orders, users, products } from '@/data';
import {
  type QueryGetOrderByIdArgs,
  type QueryGetCustomerOrdersArgs,
  type Order,
  type CreditCardSchema,
  type PayPalSchema,
  type MutationResolvers,
  OrderStatus
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

const orderMutation: Pick<MutationResolvers, 'placeOrder'> = {
  placeOrder: (_, args) => {
    const { orderDetails } = args;
    const { amount, paymentMethod, customerId, productIds } = orderDetails;
    const order = {
      id: UUIDv6(),
      createdAt: new Date().toISOString(),
      totalAmount: amount,
      customerId,
      productIds,
      payment: paymentMethod.card ?? paymentMethod.paypal,
      status: OrderStatus.Created
    };
    orders.push(order);
    return true;
  },
};

export const orderResolver = {
  Query: orderQuery,
  Mutation: orderMutation,
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
