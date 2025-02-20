const env = process.env;

const ENV_VARS = Object.freeze({
  dataCMS_apiKey: env.REACT_APP_DATO_API_TOKEN ?? '',
  serverURL: env.EXPRESS_SERVER_URL ?? 'http://localhost:8000',
  sentry: {
    dsn: env.REACT_APP_SENTRY_DSN ?? ''
  }
});

export default ENV_VARS;
