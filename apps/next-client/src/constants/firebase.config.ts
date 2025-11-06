import { ENV_VARS } from './environment';

export const firebaseConfig = {
  appId: ENV_VARS.firebase.appId,
  apiKey: ENV_VARS.firebase.apiKey,
  authDomain: ENV_VARS.firebase.authDomain,
  projectId: ENV_VARS.firebase.projectId,
  storageBucket: ENV_VARS.firebase.storageBucket,
  messagingSenderId: ENV_VARS.firebase.messagingSenderId,
  measurementId: ENV_VARS.firebase.measurementId
};
