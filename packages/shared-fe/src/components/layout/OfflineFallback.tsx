import { type CSSProperties } from 'react';
import { useOnlineStatus } from '@/hooks';

const styles: { container: CSSProperties } = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px'
  }
};

export default function OfflineFallback() {
  const isOnline = useOnlineStatus();
  if (isOnline) {
    return <></>;
  }
  return (
    <div style={styles.container}>
      <h1>🚫 No Internet Connection</h1>
      <p>Please check your internet and try again.</p>
    </div>
  );
}
