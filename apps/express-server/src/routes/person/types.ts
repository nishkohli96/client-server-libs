import { Request } from 'express';
import { RequestQueryParams } from '@/types';

export enum PersonSortingColumns {
  FirstName = 'first_name',
  DOB = 'date_of_birth',
  Email = 'email',
  Gender = 'gender',
  Website = 'website',
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
