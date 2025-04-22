import { type OrderStatus, type PaymentMethod } from '@/types';

export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
};

export type Order = {
  id: string;
  customerId: string;
  productIds: string[];
  totalAmount: number;
  status: OrderStatus;
  payment: PaymentMethod;
  createdAt: Date | string;
};
