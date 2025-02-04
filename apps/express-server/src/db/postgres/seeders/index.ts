/**
 * Consider making a dedicated seeder repo for managing
 * models, seeders and migrations using sequelize.
 *
 * https://sequelize.org/docs/v6/other-topics/migrations/
 *
 * Current implementation will cause error if I uncomment
 * truncate code, due to foreign key constraint
 */

import { connectToDB, disconnectDB } from '../config';
import { CarBrandModel, CarModel } from '../models';
import carBrands from './data/car-brands.json';
import cars from './data/car-models.json';

async function seedData() {
  try {
    /* Connect to the database */
    await connectToDB();

    /* Truncate existing data from tables */
    // await CarModel.truncate();
    console.log('Cleared data from cars table');
    // await CarBrandModel.truncate();
    console.log('Cleared data from car_brands table');

    /* Insert seeder data into tables */
    await CarBrandModel.bulkCreate(carBrands);
    console.log('Inserted data in car_brands table');
    await CarModel.bulkCreate(cars);
    console.log('Inserted data in cars table');

    /* Disconnect from the database */
    await disconnectDB();
    process.exit(0);
  } catch(error) {
    console.error(error);
    process.exit(1);
  }
}

seedData();
