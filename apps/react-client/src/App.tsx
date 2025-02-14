import { Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import { Loading } from '@csl/shared-fe';
import { useSocketConnection } from 'hooks';
import { AppThemeProvider } from 'theme';
import Routing from 'routes';
import 'react-toastify/dist/ReactToastify.min.css';

const App = () => {
  useSocketConnection();
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
        <Routing />
      </Suspense>
    </AppThemeProvider>
  );
};

export default App;
