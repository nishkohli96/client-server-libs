import { type Response } from 'express';
import { stripeSDK } from '@/constants';
import { sendErrorResponse } from '@/utils';
import type * as StripeTypedefs from './types';

class StripeService {
  /**
	 * https://docs.stripe.com/api/products/create?lang=node
	 *
	 * - The "id" field is optional. If you do not provide an id,
	 *   Stripe will generate a unique id for you.
	 * - The "metadata" field is optional. You can use it to store
	 *   additional information about the product. The values must
	 *   only be strings.
	 */
  async createProduct(res: Response, body: StripeTypedefs.CreateProductBody) {
    try {
      const product = await stripeSDK.products.create(body);
      return res.status(200).json(product);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error creating new product');
    }
  }
}

const stripeService = new StripeService();
export default stripeService;
