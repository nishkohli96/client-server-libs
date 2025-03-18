import { AdminOrCustomerSchema, Countries } from '@/types';

export const users: AdminOrCustomerSchema[] = [
  {
    id: '65f1a3b5e89f1c00123abcd1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    address: {
      houseNo: '12A',
      street: 'Baker Street',
      landmark: 'Near Central Park',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: Countries.India
    }
  },
  {
    id: '65f1a3b5e89f1c00123abcd2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    address: {
      houseNo: '45B',
      street: 'Orchard Road',
      landmark: 'Near Marina Bay',
      city: 'Singapore',
      state: null,
      country: Countries.Singapore
    }
  },
  {
    id: '65f1a3b5e89f1c00123abcd3',
    name: 'Charlie Adams',
    email: 'charlie@example.com',
    manager: '65f1a3b5e89f1c00123abcd4'
  },
  {
    id: '65f1a3b5e89f1c00123abcd4',
    name: 'Diana Lewis',
    email: 'diana@example.com',
    manager: null
  }
];
