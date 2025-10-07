importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyA3jbGjEVSEpcIyDmAKAc8TlJiJ31d0uBo',
  authDomain: 'my-sample-fbase.firebaseapp.com',
  projectId: 'my-sample-fbase',
  storageBucket: 'my-sample-fbase.firebasestorage.app',
  messagingSenderId: '1017317949905',
  appId: '1:1017317949905:web:27f15e680cb31aa80ee0f0',
	measurementId: 'G-YXEERTJW16',
  vapidKey: 'BBZtxJYA5Vt4MqyLdA2u3FTbwd3qNHH1Sod4yS_qSK2mEZkgkAXNosifSe2JpmvP6L_gwk5H52LkXzlPBG35LoA'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log('Received background message: ', payload);
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title, { body, icon });
	// const notificationTitle = payload.notification.title;
  // const notificationOptions = {
  //   body: payload.notification.body,
  //   icon: '/logo192.png',
  // };

  // self.registration.showNotification(notificationTitle, notificationOptions);
});
