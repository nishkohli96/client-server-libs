import { type Person } from '@csl/mongo-models';

export type PersonDetails = Omit<
  Person,
  '_id'
> & {
  _id: string;
  fullName: string;
};

export type PersonDetailsRow = Omit<
  PersonDetails,
  'createdAt' | 'updatedAt' | 'address'
> & {
  fullAddress?: string;
  actions: string;
};

export type PersonListApiData = {
  nbPages: number;
  nbRecords: number;
  records: PersonDetails[];
  recorsPerPage: number;
};
