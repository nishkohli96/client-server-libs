import airportsList from '@/data/airport.json';
import { AirportModel } from '@/models/Airport';

export const seedAirports = async () => {
  console.log('Truncating Aiports Collection...');
  await AirportModel.deleteMany({});
  await AirportModel.insertMany(airportsList);
  console.log(`Airports collection - Inserted ${airportsList.length} records!`);
};
