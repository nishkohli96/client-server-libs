import { Request } from 'express';

export type AddCarBrand = {
  name: string;
  country: string;
}

export type AddCarModelRequest = Request<object, object, AddCarBrand>;

export type CarBrandById = {
  brandId: string;
}

export type RequestCarBrandById = Request<CarBrandById>
