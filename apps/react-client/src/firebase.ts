import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { ENV_VARS } from 'app-constants';

const firebaseConfig = {
  apiKey: ENV_VARS.firebase.apiKey,
  authDomain: ENV_VARS.firebase.authDomain,
  projectId: ENV_VARS.firebase.projectId,
  storageBucket: ENV_VARS.firebase.storageBucket,
  messagingSenderId: ENV_VARS.firebase.messagingSenderId,
  appId: ENV_VARS.firebase.appId,
  measurementId: ENV_VARS.firebase.measurementId,
  vapidKey: ENV_VARS.firebase.vapidKey,
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// Function to request permission & get token
export const requestFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'YOUR_PUBLIC_VAPID_KEY',
        serviceWorkerRegistration: await navigator.serviceWorker.register(
          '/firebase-messaging-sw.js'
        )
      });
      console.log('FCM Token:', token);
      return token;
    } else {
      console.warn('Notification permission not granted.');
    }
  } catch (err) {
    console.error('Error getting FCM token:', err);
  }
};

// Listen for foreground messages
export const onMessageListener = () =>
  new Promise(resolve => {
    onMessage(messaging, payload => {
      resolve(payload);
    });
  });
