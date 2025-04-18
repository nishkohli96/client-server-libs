import { type Product } from '@/types';

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with Bluetooth connectivity.',
    price: 29.99,
    categoryId: 'cat-001'
  },
  {
    id: 'prod-002',
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with blue switches.',
    price: 89.99,
    categoryId: 'cat-001'
  },
  {
    id: 'prod-003',
    name: 'Noise Cancelling Headphones',
    description: 'Over-ear headphones with active noise cancellation.',
    price: 199.99,
    categoryId: 'cat-001'
  },
  {
    id: 'prod-004',
    name: 'Coffee Mug',
    description: 'Ceramic coffee mug with heat-resistant handle.',
    price: 9.99,
    categoryId: 'cat-002'
  }
];
