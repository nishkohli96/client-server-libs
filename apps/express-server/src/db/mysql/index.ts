import { Sequelize } from 'sequelize';
import chalk from 'chalk';
import { ENV_VARS, isProductionEnv } from '@/app-constants';
import { winstonLogger } from '@/middleware';

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
    console.log(chalk.green('Connected to MySQL DB.'));

    if (ENV_VARS.env === 'production') {
      await mySQLSequelize.sync();
      console.log('Production: Run migrations for schema updates.');
    } else {
      await mySQLSequelize.sync({ alter: true });
      console.log(`${ENV_VARS.env}: MySQL Database schema synchronized with alter mode.`);
    }

    /**
     * sequelize.close() -> will close the connection to the DB.
	 * You will need to create a new Sequelize instance to
	 * access your database again.
     */
  } catch (error) {
    console.log(chalk.red('⚠ Error connecting to MySQL Database ⚠'));
    console.log(error);
    process.exit(1);
  }
}

export async function disconnectMySQLDB() {
  try {
    await mySQLSequelize.close();
    console.log(chalk.green('MySQL Database connection closed successfully.'));
  } catch (error) {
    console.log(chalk.red('⚠ Error disconnecting from MySQL Database ⚠'));
    console.log(error);
    process.exit(1);
  }
}

export const shouldAlterTable = !isProductionEnv;

export const postgreQueryInterface = mySQLSequelize.getQueryInterface();
