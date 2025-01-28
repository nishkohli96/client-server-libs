import { Request } from 'express';

export type AddCar = {
  name: string;
  brand_id: number;
  colors: string[];
}

export type AddCarRequest = Request<object, object, AddCar>;

export type CarDetails = {
  carId: string;
}

export type GetCarDetailsRequest = Request<CarDetails>;

export type UpdateCarDetailsRequest = Request<CarDetails, object, AddCar>;
