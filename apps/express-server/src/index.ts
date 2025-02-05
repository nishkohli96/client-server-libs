import 'dotenv/config';
import os from 'os';
import { createServer } from 'node:http';
import { connect, disconnect } from 'mongoose';
import { ENV_VARS } from '@/app-constants';
import { connectPostgresDB, disconnectPostgresDB } from '@/db/postgres';
import { connectMySQLDB, disconnectMySQLDB } from '@/db/mysql';
import { winstonLogger } from '@/middleware';
import app from './app';

const hostName = os.hostname();
const port = ENV_VARS.port;
const dbConnectionString = `${ENV_VARS.mongoDB.url}/${ENV_VARS.mongoDB.dbName}`;

async function bootstrap() {
  try {
    await connectPostgresDB();
    winstonLogger.info(
      `[ ⚡️ ${hostName} ⚡️ ] - Connected to Postgres`
    );
    await connectMySQLDB();
    winstonLogger.info(
      `[ ⚡️ ${hostName} ⚡️ ] - Connected to MySQL`
    );
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

/* Gracefully handle SIGTERM or SIGINT */
async function handleExit(signal: string) {
  console.log(`Received ${signal}`);
  try {
    await disconnectPostgresDB();
    await disconnectMySQLDB();
    await disconnect();
  } catch (error) {
    console.error('Error while disconnecting from the database:', error);
  } finally {
    process.exit(0);
  }
}

process.on('SIGTERM', () => handleExit('SIGTERM'));
process.on('SIGINT', () => handleExit('SIGINT'));


bootstrap();
