import { useNavigate } from 'react-router-dom';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AdbIcon from '@mui/icons-material/Adb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { ENV_VARS } from 'app-constants';
import { isSafari } from 'utils';
import ThemeChangeButton from './ThemeChangeButton';

const firebaseConfig = {
  apiKey: ENV_VARS.firebase.apiKey,
  authDomain: ENV_VARS.firebase.authDomain,
  projectId: ENV_VARS.firebase.projectId,
  storageBucket: ENV_VARS.firebase.storageBucket,
  messagingSenderId: ENV_VARS.firebase.messagingSenderId,
  appId: ENV_VARS.firebase.appId,
  measurementId: ENV_VARS.firebase.measurementId,
  vapidKey: ENV_VARS.firebase.vapidKey
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const AppBar = () => {
  const navigate = useNavigate();

  const handleEnableNotifications = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: ENV_VARS.firebase.vapidKey,
      });
      console.log('FCM Token:', token);
      localStorage.setItem('fcm_token', token);
      return token;
    } else {
      console.warn('Notification permission not granted.');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position="static">
        <Toolbar>
          <IconButton
            aria-label="App Icon"
            onClick={() => navigate('/')}
            sx={{ display: 'flex', mr: 1 }}
          >
            <AdbIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            React Client
          </Typography>
          {isSafari() && (
            <IconButton
              aria-label="Enable Notifications"
              color="inherit"
              onClick={handleEnableNotifications}
              sx={{ mr: 1 }}
            >
              <NotificationsIcon />
            </IconButton>
          )}
          <ThemeChangeButton />
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};

export default AppBar;
