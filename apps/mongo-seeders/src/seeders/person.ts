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
    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(parse({ delimiter: ',', columns: true, relax_quotes: true }))
        .on('data', (row: Person) => {
          peopleList.push(row);
        })
        .on('error', (error: unknown) => {
          console.error('Error reading CSV:', error);
          reject(error);
        })
        .on('end', async () => {
          console.log(
            `Finished reading CSV. Found ${peopleList.length} records.`
          );
          try {
            await PersonModel.insertMany(peopleList);
            console.log(
              `Inserted ${peopleList.length} records into People collection!`
            );
            resolve();
          } catch (insertErr) {
            console.error('Error inserting records:', insertErr);
            reject(insertErr);
          }
        });
    });
  } catch (err) {
    console.log(err);
  }
};
