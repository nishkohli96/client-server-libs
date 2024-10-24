import peopleList from '@/data/people.json';
import { PersonModel } from '@/models/Person';

export const seedPeople = async () => {
  console.log('Truncating People Collection...');
  await PersonModel.deleteMany({});
  await PersonModel.insertMany(peopleList);
  console.log(`People collection - Inserted ${peopleList.length} records!`);
};
