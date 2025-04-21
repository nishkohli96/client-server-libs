import type { Response } from 'express';
import { stripeSDK } from '@/constants';
import { sendErrorResponse } from '@/utils';
import type * as StripeCheckoutTypedefs from './types';

class StripeCheckoutService {
  async createSession(
    res: Response,
    body: StripeCheckoutTypedefs.CreateCheckoutSessionBody
  ) {
    try {
      const checkoutSession = await stripeSDK.checkout.sessions.create(body);
      return res.redirect(checkoutSession.url ?? '');
    } catch (error) {
      return sendErrorResponse(res, error, 'Error creating new customer');
    }
  }

  /**
   * Generate payment link for a product whose prices are
   * fetched from the server, and send url link to frontend.
   */
  async buyProduct(
    res: Response,
    params: StripeCheckoutTypedefs.BuyProductById
  ) {
    try {
      const { productId } = params;
      const prices = await stripeSDK.prices.list({
        product: productId,
        active: true,
        limit: 1
      });
      if (!prices.data.length) {
        return res.status(404).json({ error: 'No price found for product.' });
      }
      const paymentLink = await stripeSDK.paymentLinks.create({
        line_items: [
          {
            price: prices.data[0].id,
            quantity: 1
          }
        ]
      });
      res.json({ url: paymentLink.url });
    } catch (error) {
      return sendErrorResponse(res, error, 'Error creating new customer');
    }
  }
}

const stripeCheckoutService = new StripeCheckoutService();
export default stripeCheckoutService;
