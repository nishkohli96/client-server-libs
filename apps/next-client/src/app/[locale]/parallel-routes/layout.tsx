import type { Metadata } from 'next';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

type LayoutProps = {
  children: React.ReactNode;
  analytics: React.ReactNode;
  sales: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Parallel Routes'
};

export default function ParallelPagesLayout({
  children,
  analytics,
  sales
}: LayoutProps) {
  return (
    <Grid
      container
      style={{
        background: '#3d3d3d',
        padding: '10px',
        borderRadius: 2
      }}
    >
      <Typography>Parallel Routes Layout</Typography>
      <Grid size={12}>
        {children}
      </Grid>
      <Grid size={6}>
        {analytics}
      </Grid>
      <Grid size={6}>
        {sales}
      </Grid>
    </Grid>
  );
}
