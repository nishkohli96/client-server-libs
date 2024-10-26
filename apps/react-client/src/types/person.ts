import { Person } from '@csl/mongo-models';

export type PersonDetails = Omit<
  Person,
  '_id' | 'first_name' | 'last_name' | 'address'
> & {
  _id: string;
  fullName: string;
  address: string;
};

export type PersonDetailsRow = Omit<PersonDetails, 'createdAt' | 'updatedAt' | '_id'> & {
  actions: string;
}
