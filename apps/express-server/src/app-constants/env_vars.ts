/**
 * Define all environment variables in this file and then
 * export across other modules.
 */

const env = process.env;

export const ENV_VARS = Object.freeze({
  env: env.NODE_ENV ?? 'development',
  port: env.PORT ?? 8000,
  domain: env.DOMAIN ?? 'http://localhost:8000',
  mongoDB: {
    url: process.env.DB_URL ?? 'mongodb://localhost:27017',
    dbName: process.env.DB_NAME ?? 'SeederDB'
  },
  stytch: {
    projectId: env.STYTCH_PROJECT_ID ?? '',
    orgId: env.STYTCH_ORG_ID ?? '',
    secret: env.STYTCH_SECRET ?? '',
    testEmail: env.STYTCH_TEST_EMAIL ?? 'hello@abc.com'
  },
  postgresUrl: env.POSTGRES_URL ?? 'postgres://root:password@localhost:5432/test',
  mySQLUrl: env.MYSQL_URL ?? 'mysql://root:password@localhost:3306/mydatabase'
});

export const isProductionEnv = ENV_VARS.env === 'production';
