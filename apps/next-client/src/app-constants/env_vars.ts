export const ENV_VARS = Object.freeze({
  expressServerURL: process.env.EXPRESS_SERVER_URL ?? 'http://localhost:8000',
  datoCMS: {
    key_server: process.env.DATO_API_TOKEN ?? '',
    key_client: process.env.NEXT_PUBLIC_DATO_API_TOKEN ?? ''
  },
  mongo: {
    url: process.env.MONGODB_URL ?? '',
    dbName: process.env.MONGODB_NAME ?? ''
  },
  sentry: {
    orgName: process.env.SENTRY_ORG ?? '',
    projectName: process.env.SENTRY_PROJECT_NEXT ?? '',
    serverDSN: process.env.SENTRY_SERVER_DSN ?? '',
    edgeDSN: process.env.SENTRY_EDGE_DSN ?? '',
    clientDSN: process.env.NEXT_PUBLIC_SENTRY_CLIENT_DSN ?? ''
  },
  mixPanelToken: process.env.NEXT_PUBLIC_MIXPANEL_TOKEN ?? '',
});
