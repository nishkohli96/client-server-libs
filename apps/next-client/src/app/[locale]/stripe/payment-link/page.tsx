/**
 * https://docs.stripe.com/payment-links/share
 * https://docs.stripe.com/payment-links/url-parameters
 */
import Grid from '@mui/material/Grid2';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PaymentLinkPage() {
  const paymentLink = 'test_3cs9BH3921B87pScMM';
  const trackingInfo = '?utm_source=next-client&utm_medium=payment_button';
  const productPurchaseLink = `https://buy.stripe.com/${paymentLink}${trackingInfo}`;
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="h4" color="success">
          Payment Button
        </Typography>
        <Button
          variant="outlined"
          color="info"
          href={productPurchaseLink}
          sx={{ my: '20px' }}
        >
          Redirect to stripe payment
        </Button>
        <Alert severity="info">
          Alternatively, you can also download the QR code of the payment link
          and attach in your webpage.
        </Alert>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Typography variant="h4" color="success">
          Checkout Success
        </Typography>
      </Grid>
    </Grid>
  );
}
