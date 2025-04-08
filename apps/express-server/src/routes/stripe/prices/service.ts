import { type Response } from 'express';
import { stripeSDK } from '@/constants';
import { sendErrorResponse } from '@/utils';
import type * as StripePricesTypedefs from './types';

class StripePricesService {
  /**
   * https://docs.stripe.com/api/prices/create?lang=node
   *
   * It is recommended to add "price_" prefix for the id field.
   */
  async createPrice(res: Response, body: StripePricesTypedefs.CreatePriceBody) {
    try {
      const price = await stripeSDK.prices.create(body);
      return res.status(200).json(price);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error creating new price');
    }
  }

  /**
   * https://docs.stripe.com/api/prices/retrieve?lang=node
   */
  async getPrice(res: Response, body: StripePricesTypedefs.GetPriceById) {
    try {
      const price = await stripeSDK.prices.retrieve(body.priceId);
      return res.status(200).json(price);
    } catch (error) {
      return sendErrorResponse(res, error, 'Error getting price');
    }
  }
}

const stripePricesService = new StripePricesService();
export default stripePricesService;
