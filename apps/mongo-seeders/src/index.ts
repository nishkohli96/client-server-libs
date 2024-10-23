import 'dotenv/config';
import { connect, disconnect } from 'mongoose';
import { seedAirports, seedPeople } from './seeders';

const dbUrl = process.env.DB_URL ?? 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME ?? 'SeederDB';

async function populateData() {
  try {
    console.log('Connecting to DB...');
    await connect(`${dbUrl}/${dbName}`);
    console.log('DB Connected!');

    console.log('Inserting Records...');
    await seedAirports();
    await seedPeople();
    console.log('Records Inserted');

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
