import { AirportModel } from '@csl/mongo-models';
import airportsList from '@/data/airport.json';

export const seedAirports = async () => {
  console.log('Truncating Aiports Collection...');
  await AirportModel.deleteMany({});
  await AirportModel.insertMany(airportsList);
  console.log(`Airports collection - Inserted ${airportsList.length} records!`);
};
