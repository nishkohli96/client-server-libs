export const ENV_VARS = Object.freeze({
  datoCMS: {
    key_server: process.env.DATO_API_TOKEN ?? '',
    key_client: process.env.NEXT_PUBLIC_DATO_API_TOKEN ?? ''
  }
});
