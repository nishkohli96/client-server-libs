import { Suspense, useMemo } from 'react';
import { useAppSelector, ThemeSelector } from 'redux-store';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import { Loading } from '@csl/shared-fe';
import AppTheme from 'assets/styles/theme';
import Routing from 'routes';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  const mode = useAppSelector(ThemeSelector);
  const theme = useMemo(() => createTheme(AppTheme(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
