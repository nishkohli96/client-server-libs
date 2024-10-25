import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { PersonModel, Person } from '@/models/Person';

export const seedPeople = async () => {
  console.log('Truncating People Collection...');
  await PersonModel.deleteMany({});

  const peopleList: Person[] = [];
  try {
    const filePath = path.join(__dirname, '../data/people.csv');
    console.log('filePath: ', filePath);
    fs.createReadStream(filePath)
      .pipe(parse({ delimiter: ',', columns: true, relax_quotes: true }))
      .on('data', function (row: Person) {
        peopleList.push(row);
      })
      .on('error', function (error: unknown) {
        console.log('err ', error);
      })
      .on('end', async function () {
        console.log('peopleList: ', peopleList);
        await PersonModel.insertMany(peopleList);
        console.log(
          `People collection - Inserted ${peopleList.length} records!`
        );
      });
  } catch (err) {
    console.log(err);
  }
};
