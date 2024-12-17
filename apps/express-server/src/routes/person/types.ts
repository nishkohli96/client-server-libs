import { Request } from 'express';
import { Person, NewPerson } from '@csl/mongo-models';
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

export type PersonById = Pick<Person, '_id'>;

export type AddPersonRequest = Request<object, object, NewPerson>;

export type EditPersonRequest = Request<PersonById, object, NewPerson>;

export type DeletePersonRequest = Request<PersonById>;
