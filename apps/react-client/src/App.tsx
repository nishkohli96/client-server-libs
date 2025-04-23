import { Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import { Loading, useOnlineStatus, OfflineFallback } from '@csl/shared-fe';
import { useSocketConnection } from 'hooks';
import { AppThemeProvider } from 'theme';
import Routing from 'routes';

const App = () => {
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
