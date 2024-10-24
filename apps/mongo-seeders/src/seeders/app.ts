import airportsList from '@/data/airport.json';
import { AppModel } from '@/models/App';

export const seedApps = async () => {
  console.log('Truncating Apps Collection...');
  await AppModel.deleteMany({});
  await AppModel.insertMany(airportsList);
  console.log(`Apps collection - Inserted ${airportsList.length} records!`);
};
