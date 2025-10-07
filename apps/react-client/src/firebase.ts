import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, type MessagePayload } from 'firebase/messaging';
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

export const getBrowser = () => {
  const ua = navigator.userAgent;
  if ((/chrome|crios|crmo/i).test(ua)) {
    return 'chrome';
  }
  if ((/firefox|fxios/i).test(ua)) {
    return 'firefox';
  }
  if ((/safari/i).test(ua) && !(/chrome|crios|crmo|android/i).test(ua)) {
    return 'safari';
  }
  if ((/edg/i).test(ua)) {
    return 'edge';
  }
  return 'other';
};

// Function to request permission & get token
export const requestFCMToken = async () => {
  const browser = getBrowser();
  if (browser === 'safari') {
    console.warn('FCM not supported in Safari.');
    return null;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: firebaseConfig.vapidKey,
        serviceWorkerRegistration: await navigator.serviceWorker.register(
          '/firebase-messaging-sw.js'
        )
      });
      console.log('FCM Token:', token);
      localStorage.setItem('fcm_token', token);
      return token;
    } else {
      console.warn('Notification permission not granted.');
    }
  } catch (err) {
    console.error('Error getting FCM token:', err);
  }
};

// Listen for foreground messages
export const onMessageListener = (): Promise<MessagePayload> =>
  new Promise(resolve => {
    onMessage(messaging, payload => {
      resolve(payload);
    });
  });
