const env = process.env;

export const ENV_VARS = Object.freeze({
  dataCMS_apiKey: env.REACT_APP_DATO_API_TOKEN ?? '',
  serverURL: 'http://localhost:8000/api'
});
