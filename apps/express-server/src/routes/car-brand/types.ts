import { Request } from 'express';

export type AddCarBrand = {
  name: string;
  country: string;
}

export type AddCarModelRequest = Request<object, object, AddCarBrand>;
