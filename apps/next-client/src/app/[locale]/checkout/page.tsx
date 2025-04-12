import { ExpressServerEndpoints } from '@csl/react-express';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { expressApi } from '@/axios/expressApi';

const stripeRoutes = ExpressServerEndpoints.stripe;

async function fetchStripeProduct(productId: string) {
  return await expressApi.get(
    `${stripeRoutes.rootPath}/${stripeRoutes.subRoutes.products.subRoutes.get}/${productId}`
  );
}

export default async function CheckoutPage() {
  const productData = await fetchStripeProduct('prod_S54uWNLClRAzNa');
  console.log('productData: ', productData);
  return (
    <form action="/create-checkout-session" method="POST">
      <Button variant="outlined" color="secondary" type="submit">
        Proceed to Buy
      </Button>
    </form>
  );
}
