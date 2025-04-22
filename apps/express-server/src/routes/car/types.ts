import { type Request } from 'express';
import { type CarModelCreationAttributes } from '@/db/postgres/models';

/**
 * An explicit type can also be created for AddCar req body. But using or
 * modifying CarModel and CarModelCreationAttributes types defined on the model
 * itself is sufficient.
 */
export type AddCarRequest = Request<object, object, CarModelCreationAttributes>;

export type CarDetails = {
  carId: string;
};

export type GetCarDetailsRequest = Request<CarDetails>;

export type UpdateCarDetailsRequest = Request<
  CarDetails,
  object,
  CarModelCreationAttributes
>;
