'use client';

import Button from '@mui/material/Button';
import type Stripe from 'stripe';

type CheckoutButtonProps = {
  product: Stripe.Product;
};

function createCheckoutSession(product: Stripe.Product) {
  console.log('product: ', product);
}

export default function CheckoutButton({ product }: CheckoutButtonProps) {
  return (
    <Button
      size="small"
      variant="outlined"
      color="secondary"
      onClick={() => createCheckoutSession(product)}
    >
      Proceed to Buy
    </Button>
  );
}
