import { initializeApp } from 'firebase/app';
import { ENV_VARS } from '.';

export const firebaseConfig = {
  apiKey: ENV_VARS.firebase.apiKey,
  authDomain: ENV_VARS.firebase.authDomain,
  projectId: ENV_VARS.firebase.projectId,
  storageBucket: ENV_VARS.firebase.storageBucket,
  messagingSenderId: ENV_VARS.firebase.messagingSenderId,
  appId: ENV_VARS.firebase.appId,
  measurementId: ENV_VARS.firebase.measurementId,
  vapidKey: ENV_VARS.firebase.vapidKey
};

export const firebaseApp = initializeApp(firebaseConfig);
