'use client';

import Typography from '@mui/material/Typography';

export default function PokemonError() {
  return (
    <main>
      <Typography variant="body1" color="error">
        {'Failed to fetch data'}
      </Typography>
    </main>
  );
}
