import { type Order, OrderStatus, PaymentOption } from '@/types';

export const orders: Order[] = [
  {
    id: '3f1a8b20-5e9c-4a8f-bf3d-92a7c6a5d6b7',
    customerId: '65f1a3b5e89f1c00123abcd1',
    productIds: [
      'prod-001',
      'prod-003'
    ],
    totalAmount: 229.98,
    status: OrderStatus.Created,
    payment: {
      type: PaymentOption.Card,
      cardNumber: '4111111111111111',
      expiryDate: '12/26'
    },
    createdAt: '2024-03-08T10:00:00Z'
  },
  {
    id: 'c1d2e3f4-5678-9abc-def0-123456789abc',
    customerId: '65f1a3b5e89f1c00123abcd2',
    productIds: [
      'prod-002',
    ],
    totalAmount: 89.99,
    status: OrderStatus.Shipped,
    payment: {
      type: PaymentOption.Paypal,
      email: 'bob-paypal@example.com'
    },
    createdAt: '2024-03-07T15:30:00Z'
  },
  {
    id: 'a5b6c7d8-e9f0-1234-5678-abcdefabcdef',
    customerId: '65f1a3b5e89f1c00123abcd1',
    productIds: [
      'prod-004'
    ],
    totalAmount: 9.99,
    status: OrderStatus.Delivered,
    payment: {
      type: PaymentOption.Card,
      cardNumber: '5555555555554444',
      expiryDate: '06/27'
    },
    createdAt: '2024-03-06T08:45:00Z'
  },
  {
    id: '7890abcd-1234-5678-9ef0-abcdef123456',
    customerId: '65f1a3b5e89f1c00123abcd2',
    productIds: [
      'prod-001',
      'prod-002',
      'prod-003'
    ],
    totalAmount: 319.97,
    status: OrderStatus.Cancelled,
    payment: {
      type: PaymentOption.Paypal,
      email: 'bob-paypal@example.com'
    },
    createdAt: '2024-03-05T12:20:00Z'
  }
];
