import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%'
    }}
  >
    <CircularProgress size="large"/>
  </div>
);

export default Loading;
