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
export const postgreSequelize = new Sequelize(ENV_VARS.postgresUrl, {
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

export async function connectPostgresDB() {
  try {
    /**
     * SELECT 1+1 AS result is the default test query in Sequelize
     * to verify database connection, when calling sequelize.authenticate().
     * It can't be disabled though.
     */
    await postgreSequelize.authenticate();
    winstonLogger.info(`[ ⚡️ ${hostName} ⚡️ ] - Connected to Postgres`);

    /**
     * sequelize.close() -> will close the connection to the DB.
     * You will need to create a new Sequelize instance to
     * access your database again.
     */
  } catch (error) {
    winstonLogger.error('⚠ Error connecting to Postgres Database ⚠', error);
    // process.exit(1);
  }
}

export async function disconnectPostgresDB() {
  try {
    await postgreSequelize.close();
    winstonLogger.info(
      `[ ⚡️ ${hostName} ⚡️ ] - Postgres Database connection closed successfully`
    );
  } catch (error) {
    winstonLogger.error(
      '⚠ Error disconnecting from Postgres Database ⚠',
      error
    );
    process.exit(1);
  }
}

/* Alter tables should not be allowed in "production" env. */
export const shouldAlterTable = !isProductionEnv;

/**
 * This can be used for running migrations & seeders.
 *
 * https://sequelize.org/docs/v6/other-topics/query-interface/
 */
export const postgreQueryInterface = postgreSequelize.getQueryInterface();
