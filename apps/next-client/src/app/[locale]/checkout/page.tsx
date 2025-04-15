import Stripe from 'stripe';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ExpressServerEndpoints } from '@csl/react-express';
import { expressApi } from '@/axios/expressApi';

const stripeRoutes = ExpressServerEndpoints.stripe;

async function fetchStripeProduct(productId: string) {
  const response = await expressApi.get<Stripe.Product>(
    `${stripeRoutes.rootPath}${stripeRoutes.subRoutes.products.rootPath}/${stripeRoutes.subRoutes.products.subRoutes.get}/${productId}`
  );
  return response.data;
}

async function createCheckoutSession(product: Stripe.Product) {
	console.log('product: ', product);
}

export default async function CheckoutPage() {
  const productData = await fetchStripeProduct('prod_S54uWNLClRAzNa');
  return (
      <Card sx={{ width: 200 }}>
        <CardMedia
          sx={{ width: 200, height: 300 }}
          image={productData.images[0]}
          title={productData.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {productData.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {productData.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => createCheckoutSession(productData)}
          >
            Proceed to Buy
          </Button>
        </CardActions>
      </Card>
  );
}
