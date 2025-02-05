import { Sequelize } from 'sequelize';
import chalk from 'chalk';
import { ENV_VARS, isProductionEnv } from '@/app-constants';
import { winstonLogger } from '@/middleware';

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
    await postgreSequelize.authenticate();
    console.log(chalk.green('Connection has been established successfully.'));

    if (ENV_VARS.env === 'production') {
      await postgreSequelize.sync();
      console.log('Production: Run migrations for schema updates.');
    } else {
      await postgreSequelize.sync({ alter: true });
      console.log(`${ENV_VARS.env}: Database schema synchronized with alter mode.`);
    }

    /**
     * sequelize.close() -> will close the connection to the DB.
	 * You will need to create a new Sequelize instance to
	 * access your database again.
     */
  } catch (error) {
    console.log(chalk.red('⚠ Error connecting to the Database ⚠'));
    console.log(error);
    process.exit(1);
  }
}

export async function disconnectPostgresDB() {
  try {
    await postgreSequelize.close();
    console.log(chalk.green('Database connection closed successfully.'));
  } catch (error) {
    console.log(chalk.red('⚠ Error disconnecting from Database ⚠'));
    console.log(error);
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
