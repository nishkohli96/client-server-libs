const env = process.env;

const ENV_VARS = Object.freeze({
  dataCMS_apiKey: env.REACT_APP_DATO_API_TOKEN ?? '',
  serverURL: env.EXPRESS_SERVER_URL ?? 'http://localhost:8000',
  sentry: {
    dsn: env.REACT_APP_SENTRY_DSN ?? ''
  },
  mixPanelToken: env.REACT_APP_MIXPANEL_TOKEN ?? '',
  uploadCareKey: env.REACT_APP_UPLOADERCARE_KEY ?? '',
  firebase: {
    apiKey: env.REACT_APP_FIREBASE_API_KEY,
    authDomain: env.REACT_APP_FIREBASE_DOMAIN,
    projectId: env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: env.REACT_APP_FIREBASE_BUCKET,
    messagingSenderId: env.REACT_APP_FIREBASE_SENDER_ID,
    appId: env.REACT_APP_FIREBASE_APP_ID,
    vapidKey: env.REACT_APP_FIREBASE_WEBPUSH_VAPID
  },
});

export default ENV_VARS;
