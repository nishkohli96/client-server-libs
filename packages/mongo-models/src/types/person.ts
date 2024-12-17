import { Person } from '@/models/Person';

export type NewPerson = Omit<
  Person,
  | '_id'
  | 'createdAt'
  | 'updatedAt'
  | 'fullName'
  | 'fullAddress'
>;
