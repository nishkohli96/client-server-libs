import { Request } from 'express';
import { Person } from '@csl/mongo-models';
import { RequestQueryParams } from '@/types';

export enum PersonSortingColumns {
  DOB = 'date_of_birth',
  FirstName = 'first_name',
  Email = 'email',
  Gender = 'gender',
  Profession = 'profession',
  Salary = 'salary',
  CreatedAt = 'createdAt'
}

export type GetPersonsListQuery = RequestQueryParams<PersonSortingColumns>;

export type GetPersonsListRequest = Request<
  object,
  object,
  object,
  GetPersonsListQuery
>;
