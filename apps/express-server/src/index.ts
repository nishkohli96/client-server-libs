import 'dotenv/config';
import os from 'os';
import { createServer } from 'node:http';
import { connect } from 'mongoose';
import { ENV_VARS } from '@/app-constants';
import { connectToDB } from '@/db/config';
import { winstonLogger } from '@/middleware';
import app from './app';

const hostName = os.hostname();
const port = ENV_VARS.port;
const dbConnectionString = `${ENV_VARS.mongoDB.url}/${ENV_VARS.mongoDB.dbName}`;

async function bootstrap() {
  try {
    await connectToDB();
    await connect(dbConnectionString);
    winstonLogger.info(
      `[ ⚡️ ${hostName} ⚡️ ] - Connected to MongoDB`
    );
    const server = createServer(app);
    server.listen(port, () => {
      winstonLogger.info(
        `[ ⚡️ ${hostName} ⚡️ ] - Server running on port ${port}`
      );
    });
  } catch (err) {
    console.log('err: ', err);
    process.exit(1);
  }
}

bootstrap();
