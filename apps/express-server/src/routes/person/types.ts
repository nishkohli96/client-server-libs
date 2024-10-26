import { Request } from 'express';
import { RequestQueryParams } from '@/types';

export enum PersonSortingColumns {
  Id = '_id',
  DOB = 'date_of_birth',
  Email = 'email',
  Gender = 'gender',
  Profession = 'profession'
}

export type GetPersonsListQuery = RequestQueryParams<PersonSortingColumns>;

export type GetPersonsListRequest = Request<
  object,
  object,
  object,
  GetPersonsListQuery
>;
