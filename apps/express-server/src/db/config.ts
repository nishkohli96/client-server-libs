import { Sequelize } from 'sequelize';
import chalk from 'chalk';
import { ENV_VARS } from 'app-constants';
import { winstonLogger } from 'middleware';

export async function connectToDB() {
  try {
    const sequelize = new Sequelize(ENV_VARS.postgresUrl, {
      /**
       * default logging mechanism is console.log. It can be
	   * turned off by passing "false" in the option below, or
	   * provide a custom logger like winston.
       */
      logging: msg => winstonLogger.info(msg)
    });
    await sequelize.authenticate();
    console.log(chalk.green('Connection has been established successfully.'));

    /**
     * sequelize.close()
     *
     * will close the connection to the DB. You will need to create
     * a new Sequelize instance to access your database again.
     */
  } catch (error) {
    console.log(chalk.red('⚠ Error connecting to the Database ⚠'));
    console.log(error);
    process.exit(1);
  }
}
