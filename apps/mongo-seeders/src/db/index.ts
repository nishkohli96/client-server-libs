import { connect, disconnect } from 'mongoose';

const dbUrl = process.env.DB_URL ?? 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME ?? 'Seeder-DB';

async function populateData() {
  try {
    console.log('Connecting to DB...');
    await connect(`${dbUrl}:${dbName}`);
    console.log('DB Connected!');
  } catch(err) {
    console.log('Error Seeding Data..');
    console.log(err);
    await disconnect();
    process.exit(0);
  }
}

populateData();
