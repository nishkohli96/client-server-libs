import { useNavigate } from 'react-router-dom';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AdbIcon from '@mui/icons-material/Adb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getToken } from 'firebase/messaging';
import { isSafari } from '@csl/shared-fe';
import { firebaseConfig, firebaseMessaging } from 'app-constants';
import ThemeChangeButton from './ThemeChangeButton';

const AppBar = () => {
  const navigate = useNavigate();

  const handleEnableNotifications = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(firebaseMessaging, {
        vapidKey: firebaseConfig.vapidKey,
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
