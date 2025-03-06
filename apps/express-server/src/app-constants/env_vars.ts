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
  mySQLUrl: env.MYSQL_URL ?? 'mysql://root:password@localhost:3306/mydatabase',
  redis: {
    user: env.REDIS_USER ?? 'default',
    password: env.REDIS_PASSWORD,
    host: env.REDIS_HOST ?? '127.0.0.1',
    port: Number(env.REDIS_PORT) ?? 6379
  },
  sentryDSN: env.SENTRY_DSN ?? '',
  mixPanelToken: env.MIXPANEL_TOKEN ?? '',
  aws: {
    accessKey: env.AWS_ACCESS_KEY_ID ?? '',
    accessKeySecret: env.AWS_SECRET_ACCESS_KEY ?? '',
    elastiCacheRedis: env.AWS_ELASTICACHE_REDIS ?? '',
  }
});

export const isProductionEnv = ENV_VARS.env === 'production';
