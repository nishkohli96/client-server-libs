const env = process.env;

const ENV_VARS = Object.freeze({
  dataCMS_apiKey: env.REACT_APP_DATO_API_TOKEN ?? '',
  serverURL: env.EXPRESS_SERVER_URL ?? 'http://localhost:8000',
  sentry: {
    dsn: env.REACT_APP_SENTRY_DSN ?? ''
  },
  mixPanelToken: env.REACT_APP_MIXPANEL_TOKEN ?? '',
  firebase: {
    appId: env.REACT_APP_FIREBASE_APP_ID as string,
    apiKey: env.REACT_APP_FIREBASE_API_KEY as string,
    authDomain: env.REACT_APP_FIREBASE_AUTH_DOMAIN as string,
    projectId: env.REACT_APP_FIREBASE_PROJECT_ID as string,
    storageBucket: env.REACT_APP_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID as string,
    measurementId: env.REACT_APP_FIREBASE_MEASUREMENT_ID as string,
    vapidKey: env.REACT_APP_FIREBASE_VAPID_KEY as string
  },
});

export default ENV_VARS;
