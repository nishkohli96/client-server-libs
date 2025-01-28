import { Request } from 'express';

export type AddCar = {
  name: string;
  brand_id: number;
  colors: string[];
}

export type AddCarRequest = Request<object, object, AddCar>;
