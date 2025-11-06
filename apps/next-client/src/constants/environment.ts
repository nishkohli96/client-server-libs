export const ENV_VARS = Object.freeze({
  appURL: process.env.APP_URL ?? 'http://localhost:3001',
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
  auth: {
    nextAuthSecret: process.env.NEXT_AUTH_SECRET ?? '',
    googleId: process.env.AUTH_GOOGLE_ID ?? '',
    googleSecret: process.env.AUTH_GOOGLE_SECRET ?? ''
  },
  firebase: {
    appId: process.env.FIREBASE_APP_ID ?? '',
    apiKey: process.env.FIREBASE_API_KEY ?? '',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN ?? '',
    projectId: process.env.FIREBASE_PROJECT_ID ?? '',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET ?? '',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ?? '',
    measurementId: process.env.FIREBASE_MEASUREMENT_ID ?? '',
    vapidKey: process.env.FIREBASE_VAPID_KEY ?? ''
  }
});
