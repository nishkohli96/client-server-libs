import { Person } from '@/models/Person';

export type PersonInfo = Omit<Person, '_id'>;

export type NewPerson = Omit<
  Person,
  | '_id'
  | 'createdAt'
  | 'updatedAt'
  | 'fullName'
  | 'fullAddress'
>;
