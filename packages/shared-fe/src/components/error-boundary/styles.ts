export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    color: '#333',
  },
  heading: { fontSize: '2rem', marginBottom: '1rem' },
  message: { marginBottom: '1.5rem' },
  buttons: { display: 'flex', gap: '1rem' },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '4px',
  },
};
