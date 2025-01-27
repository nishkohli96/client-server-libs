import { Sequelize } from 'sequelize';
import chalk from 'chalk';
import { ENV_VARS, isProductionEnv } from '@/app-constants';
import { winstonLogger } from '@/middleware';

/**
 * default logging mechanism is console.log. It can be
 * turned off by passing "false" in the option below, or
 * provide a custom logger like winston.
 */
export const sequelize = new Sequelize(ENV_VARS.postgresUrl, {
  logging: msg => winstonLogger.info(msg)
});

export async function connectToDB() {
  try {
    await sequelize.authenticate();
    console.log(chalk.green('Connection has been established successfully.'));

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

/* Alter tables should not be allowed in "production" env. */
export const shouldAlterTable = !isProductionEnv;
