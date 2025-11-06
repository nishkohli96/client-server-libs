import { getToken, onMessage, type MessagePayload } from 'firebase/messaging';
import { getBrowserName } from '@csl/shared-fe';
import { firebaseConfig, firebaseMessaging } from 'app-constants';

// Extend the Window interface to include 'safari'
declare global {
  interface Window {
    safari?: {
      pushNotification?: {
        permission: (webPushId: string) => {
          permission: string;
          deviceToken?: string;
        };
        requestPermission: (
          webServiceURL: string,
          webPushId: string,
          /* eslint-ignore @typescript-eslint/no-explicit-any */
          userInfo: any,
          callback: (permission: {
            deviceToken?: string;
            permission: string;
          }) => void
        ) => void;
      };
    };
  }
}

export type NotificationToken = {
  type: 'FCM' | 'Safari';
  token: string | null;
};

// Function to request permission & get token
export const requestFCMToken = async (): Promise<NotificationToken> => {
  const browser = getBrowserName();

  /* --- Safari --- */
  if (
    browser === 'safari'
    && 'safari' in window
    && typeof window.safari === 'object'
    && 'pushNotification' in window.safari
  ) {
    const permissionData = window?.safari?.pushNotification?.permission(
      'web.com.yourdomain.notifications'
    );
    if(!permissionData) {
      console.warn('Safari notifications denied');
      return { type: 'Safari', token: null };
    }
    if (permissionData.permission === 'default') {
      return new Promise(resolve => {
        window?.safari?.pushNotification?.requestPermission(
          'https://yourdomain.com/safari-push',
          'web.com.yourdomain.notifications',
          {},
          permission => {
            resolve({ type: 'Safari', token: permission.deviceToken || null });
          }
        );
      });
    } else if (permissionData.permission === 'granted') {
      return { type: 'Safari', token: permissionData.deviceToken || null };
    }
  }

  /* --- Other browsers --- */
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(firebaseMessaging, {
        vapidKey: firebaseConfig.vapidKey,
        serviceWorkerRegistration: await navigator.serviceWorker.register(
          '/firebase-messaging-sw.js'
        )
      });
      localStorage.setItem('fcm_token', token);
      return { type: 'FCM', token };
    } else {
      console.warn('Notification permission not granted.');
      return { type: 'FCM', token: null };
    }
  } catch (err) {
    console.error('Error getting FCM token:', err);
    return { type: 'FCM', token: null };
  }
};

/* Listen for foreground messages */
export const onMessageListener = (): Promise<MessagePayload> =>
  new Promise(resolve => {
    onMessage(firebaseMessaging, payload => {
      resolve(payload);
    });
  });
