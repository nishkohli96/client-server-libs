import admin from 'firebase-admin';
import { type Message } from 'firebase-admin/lib/messaging';
import path from 'path';

const serviceAccount = path.resolve(__dirname, 'service-account.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

/* Send notification to FCM token(s) */
export const sendFCMNotification = async (
  token: string,
  title: string,
  body: string,
  data: Record<string, string> = {}
) => {

  const message = {
    notification: { title, body },
    tokens: [token], // send to all saved tokens
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);
    console.log('response: ', response);
    // res.json({ successCount: response.successCount, failureCount: response.failureCount });
  } catch (err) {
    console.error('Error sending message:', err);
    // res.status(500).json({ error: err.message });
  }
  // const message: Message = {
  //   notification: { title, body },
  //   data,
  //   token,
  // };

  // try {
  //   const response = await admin.messaging().send(message);
  //   console.log('FCM Response:', response);
  // } catch (err) {
  //   console.error('FCM Error:', err);
  // }
};
