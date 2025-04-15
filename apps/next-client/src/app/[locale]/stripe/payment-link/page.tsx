import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PaymentLinkPage() {
  const paymentLink = 'test_3cs9BH3921B87pScMM';
  const productPurchaseLink = `https://buy.stripe.com/${paymentLink}`;
  return (
    <Grid container>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="h4" color="success">
          Payment Button
        </Typography>
        <Button variant="outlined" color="info" href={productPurchaseLink}>
          Redirect to stripe payment
        </Button>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="h4" color="success">
          Checkout Success
        </Typography>
      </Grid>
    </Grid>
  );
}
