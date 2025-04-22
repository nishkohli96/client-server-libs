import { type Person } from '@csl/mongo-models';

export type PersonDetails = Omit<Person, '_id'> & {
  _id: string;
  fullName: string;
  fullAddress?: string;
};

export type PersonDetailsRow = Omit<
  PersonDetails,
  'createdAt' | 'updatedAt' | 'address'
> & {
  fullAddress?: string;
  actions: string;
};
