import apn from 'apn';
import path from 'path';

// Replace with your .p12 certificate for Safari Push
const options: apn.ProviderOptions = {
  pfx: path.resolve(__dirname, 'ReelQA.p12'),
  passphrase: '12345',
  production: true, // true for production
};

const apnProvider = new apn.Provider(options);

/**
 * Send Safari push notification
 */
export const sendSafariNotification = async (
  deviceToken: string,
  title: string,
  body: string,
  url: string
) => {
  const note = new apn.Notification();
  note.alert = { title, body };
  note.urlArgs = [url];
  note.topic = 'web.in.appskeeper.reelsfrontqa';
  note.payload = { customData: 'your_custom_data' };
  note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires in 1 hour
  note.priority = 10; // Immediate delivery

  try {
    const result = await apnProvider.send(note, deviceToken);
    console.log('APNs Result:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('APNs Error:', err);
  }
};
