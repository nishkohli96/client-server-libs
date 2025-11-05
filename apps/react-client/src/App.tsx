import { Suspense, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { toast, ToastContainer } from 'react-toastify';
import { Loading, useOnlineStatus, OfflineFallback } from '@csl/shared-fe';
import { useSocketConnection } from 'hooks';
import { AppThemeProvider } from 'theme';
import Routing from 'routes';
import { requestFCMToken, onMessageListener } from './firebase';

const App = () => {
  /**
   * Foreground messages → handled by onMessageListener() in your app.
   * Background messages → handled in your firebase-messaging-sw.js file
   *   via onBackgroundMessage.
   */
  useEffect(() => {
    // 1️⃣ Request Notification Permission + get FCM Token
    requestFCMToken()
      .then(token => {
        if (token) {
          console.log('✅ FCM token:', token);
          // You can send this token to your backend if needed
        }
      })
      .catch(err => console.error('🔥 Error retrieving token:', err));

    // 2️⃣ Listen for foreground messages
    onMessageListener()
      .then(payload => {
        console.log('💬 Received foreground message:', payload);
        const notificationTitle
          = payload?.notification?.title || 'Notification';
        const notificationBody = payload?.notification?.body || '';

        toast.info(
          <div>
            <strong>
              {notificationTitle}
            </strong>
            <div>
              {notificationBody}
            </div>
          </div>,
          {
            position: 'top-right',
            autoClose: 4000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          }
        );
      })
      .catch(err =>
        console.error('Error in foreground message listener:', err));
  }, []);

  useSocketConnection();
  const isOnline = useOnlineStatus();
  return (
    <AppThemeProvider>
      <CssBaseline />
      <ToastContainer
        autoClose={3000}
        limit={1}
        closeButton
        style={{ fontSize: '1rem' }}
      />
      <Suspense fallback={<Loading />}>
        {isOnline ? <Routing /> : <OfflineFallback />}
      </Suspense>
    </AppThemeProvider>
  );
};

export default App;
