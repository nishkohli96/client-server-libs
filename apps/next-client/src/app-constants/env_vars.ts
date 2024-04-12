const env = process.env;

export const ENV_VARS = Object.freeze({ dataCMS_apiKey: env.DATO_API_TOKEN ?? '' });
