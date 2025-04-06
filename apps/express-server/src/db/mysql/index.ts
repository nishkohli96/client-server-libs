import os from 'os';
import { Sequelize } from 'sequelize';
import { ENV_VARS, isProductionEnv } from '@/constants';
import { winstonLogger } from '@/middleware';

const hostName = os.hostname();

/**
 * default logging mechanism is console.log. It can be
 * turned off by passing "false" in the option below, or
 * provide a custom logger like winston.
 */
export const mySQLSequelize = new Sequelize(ENV_VARS.mySQLUrl, {
  logging: msg => winstonLogger.info(msg),
  pool: {
    /* Maximum number of connections in the pool */
    max: 10,
    /* Minimum number of connections in the pool */
    min: 2,
    /* Max time (in ms) to wait for a connection before throwing an error */
    acquire: 30000,
    /* Max time (in ms) a connection can be idle before being released */
    idle: 10000
  }
});

export async function connectMySQLDB() {
  try {
    await mySQLSequelize.authenticate();
    winstonLogger.info(
      `[ ⚡️ ${hostName} ⚡️ ] - Connected to MySQL DB`
    );

    /**
     * sequelize.close() -> will close the connection to the DB.
	   * You will need to create a new Sequelize instance to
	   * access your database again.
     */
  } catch (error) {
    winstonLogger.error('⚠ Error connecting to MySQL Database ⚠', error);
    process.exit(1);
  }
}

export async function disconnectMySQLDB() {
  try {
    await mySQLSequelize.close();
    winstonLogger.info(
      `[ ⚡️ ${hostName} ⚡️ ] - MySQL Database connection closed successfully`
    );
  } catch (error) {
    winstonLogger.error('⚠ Error disconnecting from MySQL Database ⚠', error);
    process.exit(1);
  }
}

export const shouldAlterTable = !isProductionEnv;

export const postgreQueryInterface = mySQLSequelize.getQueryInterface();
