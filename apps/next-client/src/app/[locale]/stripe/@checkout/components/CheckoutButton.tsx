'use client';

import Button from '@mui/material/Button';
import { ExpressServerEndpoints as ese } from '@csl/react-express';
import { expressApi } from '@/axios';

const stripeRoutes = ese.stripe;
const checkoutRoute = stripeRoutes.subRoutes.checkout;

type CheckoutButtonProps = {
  productId: string;
};

async function createCheckoutSession(productId: string) {
  const checkoutUrl = `${stripeRoutes.rootPath}${checkoutRoute.rootPath}/${checkoutRoute.subRoutes.buyProduct}/${productId}`;
  console.log('checkoutUrl: ', checkoutUrl);
  const response = await expressApi.get<{ url: string }>(checkoutUrl);
  const { url } = response.data;
  /* Redirect to Stripe checkout page */
  window.location.href = url;
}

export default function CheckoutButton({ productId }: CheckoutButtonProps) {
  return (
    <Button
      size="small"
      variant="outlined"
      color="secondary"
      onClick={() => createCheckoutSession(productId)}
    >
      Proceed to Buy
    </Button>
  );
}
