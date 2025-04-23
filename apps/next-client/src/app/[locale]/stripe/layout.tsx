import Grid from '@mui/material/Grid';

export default function StripeRootLayout({
  children,
  checkout,
  paymentLink
}: {
  children: React.ReactNode;
  checkout: React.ReactNode;
  paymentLink: React.ReactNode;
}) {
  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        {children}
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        {checkout}
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        {paymentLink}
      </Grid>
    </Grid>
  );
}
