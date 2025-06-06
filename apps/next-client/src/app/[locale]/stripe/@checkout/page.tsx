import type Stripe from 'stripe';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { ExpressServerEndpoints } from '@csl/react-express';
import { expressApi } from '@/axios';
import { CheckoutButton } from './components';

const stripeRoutes = ExpressServerEndpoints.stripe;

async function fetchStripeProduct(productId: string) {
  const response = await expressApi.get<Stripe.Product>(
    `${stripeRoutes.rootPath}${stripeRoutes.subRoutes.products.rootPath}/${stripeRoutes.subRoutes.products.subRoutes.get}/${productId}`
  );
  return response.data;
}

export default async function CheckoutPage() {
  const productId = 'prod_S8O1JRI9XYpysx';
  const productData = await fetchStripeProduct(productId);
  console.log('productData: ', productData);

  /**
   * Need to find a way to get product image dimensions, either
   * by a custom API or by using some library like sharp.
   */
  return (
    <Card sx={{ width: { xs: 200, md: 400 } }}>
      <CardMedia
        sx={{
          width: { xs: 200, md: 400 },
          height: { xs: 200, md: 400 }
        }}
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
        <CheckoutButton productId={productId} />
      </CardActions>
    </Card>
  );
}
