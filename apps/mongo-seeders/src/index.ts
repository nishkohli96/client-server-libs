import 'dotenv/config';
import { connect, disconnect } from 'mongoose';
import { seedAirports, clearMigrationRecords, seedPeople } from './seeders';

const dbUrl = process.env.DB_URL ?? 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME ?? 'SeederDB';

async function populateData() {
  try {
    console.log('Connecting to DB...');
    await connect(`${dbUrl}/${dbName}`);
    console.log('DB Connected!');

    clearMigrationRecords();
    console.log('Inserting Records...');
    await seedAirports();
    await seedPeople();
    console.log('Seeding Completed!');

    await disconnect();
    console.log('Disconnected from DB');
    process.exit(0);
  } catch(err) {
    console.log('Error Seeding Data..');
    console.log(err);
    process.exit(0);
  }
}

populateData();
