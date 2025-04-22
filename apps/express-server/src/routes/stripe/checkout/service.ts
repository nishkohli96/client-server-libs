import type { Response } from 'express';
import { stripeSDK } from '@/constants';
import { sendErrorResponse } from '@/utils';
import type * as StripeCheckoutTypedefs from './types';

class StripeCheckoutService {
  /**
   * https://docs.stripe.com/api/checkout/sessions/create?lang=node
   *
   * Within this api you can also define the success_url and cancel_url
   * in the req body as well. Refer the below link for the code:
   * https://docs.stripe.com/checkout/quickstart?client=next#init-stripe
   *
   * Similarly, you can also auto or manually expire checkout sessions:
   * https://docs.stripe.com/payments/checkout/managing-limited-inventory
   *
   * Stripe automatically generates Invoices if you're using Stripe Checkout
   * const session = await stripe.checkout.sessions.retrieve('cs_test_...');
   * const invoiceId = session.invoice;
   * const invoice = await stripe.invoices.retrieve('in_123');
   * console.log('PDF URL:', invoice.invoice_pdf);
   */
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
   * Prefer using the "createSession" function above to use
   * checkout sessions, esp when user is logged in.
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
