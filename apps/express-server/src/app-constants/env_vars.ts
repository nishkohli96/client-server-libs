/**
 * Define all environment variables in this file and then
 * export across other modules.
 */

function defEnvVariable(varName: string, defaultValue?: string): string {
  const value = process.env[varName]?.trim();
  if (value) {
    return value;
  }
  if (defaultValue !== undefined) {
    return defaultValue;
  }
  throw new Error(`Missing required environment variable: ${varName}`);
}

export const ENV_VARS = Object.freeze({
  env: defEnvVariable('NODE_ENV', 'development'),
  port: defEnvVariable('PORT', '8000'),
  get domain() {
    return defEnvVariable('DOMAIN', `http://localhost:${this.port}`);
  },
  mongoDB: {
    url: defEnvVariable('DB_URL', 'mongodb://localhost:27017'),
    dbName: defEnvVariable('DB_NAME', 'SeederDB')
  },
  stytch: {
    projectId: defEnvVariable('STYTCH_PROJECT_ID'),
    orgId: defEnvVariable('STYTCH_ORG_ID'),
    secret: defEnvVariable('STYTCH_SECRET'),
    testEmail: defEnvVariable('STYTCH_TEST_EMAIL', 'hello@abc.com')
  },
  postgresUrl: defEnvVariable(
    'POSTGRES_URL',
    'postgres://root:password@localhost:5432/test'
  ),
  mySQLUrl: defEnvVariable(
    'MYSQL_URL',
    'mysql://root:password@localhost:3306/mydatabase'
  ),
  redis: {
    user: defEnvVariable('REDIS_USER', 'default'),
    password: defEnvVariable('REDIS_PASSWORD'),
    host: defEnvVariable('REDIS_HOST', '127.0.0.1'),
    port: Number(defEnvVariable('REDIS_PORT', '6379'))
  },
  sentryDSN: defEnvVariable('SENTRY_DSN'),
  mixPanelToken: defEnvVariable('MIXPANEL_TOKEN'),
  aws: {
    accessKey: defEnvVariable('AWS_ACCESS_KEY_ID'),
    accessKeySecret: defEnvVariable('AWS_SECRET_ACCESS_KEY'),
    elastiCacheRedis: defEnvVariable('AWS_ELASTICACHE_REDIS'),
    s3BucketName: defEnvVariable('AWS_S3_BUCKET_NAME'),
    sqsUrl: defEnvVariable('AWS_SQS_URL'),
    sqsFifoUrl: defEnvVariable('AWS_SQS_FIFO_URL'),
    snsTopicArn: defEnvVariable('AWS_SNS_TOPIC_ARN')
  }
});

export const isProductionEnv = ENV_VARS.env === 'production';
